const { Schema, SchemaTypes, model } = require("mongoose");
const { EventEmitter } = require("events");
const chatEvents = new EventEmitter();

const messageScheme = Schema({
  author: { type: SchemaTypes.ObjectId, ref: "UserModule", required: true },
  sentAt: { type: Date, required: true, default: Date.now },
  text: { type: String, required: true },
  readAt: { type: Date },
});

messageScheme.statics = {
  async read(id) {
    try {
      const message = await this.findById(id);
      message.readAt = Date.now();
      await message.save();
    } catch (error) {
      throw error;
    }
  },
};

const chatScheme = Schema(
  {
    users: {
      type: [
        { type: SchemaTypes.ObjectId, ref: "UserModule" },
        { type: SchemaTypes.ObjectId, ref: "UserModule" },
      ],
      required: true,
    },
    messages: { type: [messageScheme], default: [] },
  },
  { timestamps: { updatedAt: false } }
);
chatScheme.statics = {
  async find(users) {
    try {
      const chat = await this.findOne({
        users: { $all: users },
      });
      return chat;
    } catch (error) {
      throw error;
    }
  },
  async sendMessage(data) {
    const { author, receiver, text } = data;
    const message = { author, text };
    try {
      let chat = await this.find([author, receiver]);
      if (!chat) {
        chat = new this({ users: [author, receiver] });
      }
      chat.messages.push(message);
      await chat.save();
      chatEvents.emit("message", { chatId: chat.id, message });
    } catch (error) {
      throw error;
    }
  },
  subscribe(cb) {
    chatEvents.on("message", cb);
  },
  async getHistory(id) {
    try {
      const chat = await this.findById(id);
      return chat.messages;
    } catch (error) {
      throw error;
    }
  },
};

const Chat = model("Chat", chatScheme);

module.exports = { Chat };
