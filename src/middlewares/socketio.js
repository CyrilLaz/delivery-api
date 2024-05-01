/**
 *@typedef {import("../../types.js").TController TController
 */
const { CORS_ORIGIN } = require("../constants/connect-config.js");
const { Chat } = require("../models/Chat.js");

const SocketIO = require("socket.io").Server;


module.exports = {
  socketInitFun: undefined,
  /**
   *@type TController
   */
  socketInit: (req, res, next) => {
    if (req.isAuthenticated()) {
      this.socketInitFun();
    }
    next();
  },
  io: (server) => {
    const io = new SocketIO(server, {
      cors: {
        origin: CORS_ORIGIN,
        methods: ["GET", "POST"],
      },
    });
    /**
     *@type TController
     */
    return (req, res, next) => {
      function initialize() {
        const author = req.user;
        io.once("connection", (socket) => {
          const { id } = socket;

          Chat.subscribe(({ chatId, message }) => {
            socket.emit("newMessage", chatId, message);
          });
          socket.on("getHistory", async (receiverId) => {
            try {
              const chat = await Chat.find([req.user, receiverId]);
              socket.emit("chatHistory", chat?.messages);
            } catch (error) {
              socket.emit("error", error);
            }
          });
          socket.on("sendMessage", async (receiver, text) => {
            await Chat.sendMessage({ author, receiver, text });
          });
          socket.on("error", console.error);
        });
      }
      this.socketInitFun = initialize;
      req.socketInit = this.socketInitFun;
      next();
    };
  },
};
