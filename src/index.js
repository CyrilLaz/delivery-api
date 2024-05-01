const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const http = require("http");
const cors = require("cors");

const {
  PORT,
  MONGO_URL,
  SESSION_SECRET,
  CORS_ORIGIN,
} = require("./constants/connect-config");
const { rootRouter } = require("./routers");
const { errorHandler } = require("./middlewares/errorHandler");
const { io } = require("./middlewares/socketio");
const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: "GET,PUT,POST,OPTIONS,HEAD,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(io(server));
app.use("/api", rootRouter);
app.use(errorHandler);

(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    server.listen(PORT, () => {
      console.log(`Запущено прилолжение на ${PORT}`);
    });
  } catch (error) {
    throw error;
  }
})();
