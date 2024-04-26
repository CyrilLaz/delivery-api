const { signUp, signIn } = require("../controllers/user");
const { passportAuth } = require("../middlewares/authUser");
const { advRouter } = require("./advertisements");
const rootRouter = require("express").Router();

rootRouter.use(passportAuth.initialize());
rootRouter.use(passportAuth.session());

rootRouter.post("/signup", signUp);
rootRouter.post("/signin", passportAuth.authenticate("local"), signIn);
rootRouter.use("/advertisements", advRouter);

module.exports = { rootRouter };
