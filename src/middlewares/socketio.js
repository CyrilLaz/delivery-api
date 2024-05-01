const { CORS_ORIGIN } = require("../constants/connect-config.js");
const { Chat } = require("../models/Chat.js");

const SocketIO = require("socket.io").Server;
module.exports.io = (server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });
  /**
   *@type {import("../../types.js").TController
   */
  return (req, res, next) => {
    function socketInit() {
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
    req.socketInit = socketInit;
    next();
  };
};
