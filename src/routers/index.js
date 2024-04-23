const { signUp } = require("../controllers/user");

const rootRouter = require("express").Router();

rootRouter.post("/signup", signUp);

module.exports = { rootRouter };
