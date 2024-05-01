const { signUp, signIn } = require("../controllers/user");
const { passportAuth } = require("../middlewares/authUser");
const { socketInit } = require("../middlewares/socketio");
const { advRouter } = require("./advertisements");
const rootRouter = require("express").Router();

rootRouter.use(passportAuth.initialize());
rootRouter.use(passportAuth.session());

// socket connection init
rootRouter.use(socketInit);

rootRouter.post("/signup", signUp);
rootRouter.post(
  "/signin",
  passportAuth.authenticate("local"),
  socketInit,
  signIn
);
rootRouter.use("/advertisements", advRouter);

module.exports = { rootRouter };
