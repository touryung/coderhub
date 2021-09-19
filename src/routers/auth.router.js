const Router = require("koa-router");

const { login } = require("../controllers/auth.controller");
const { verifyLogin } = require("../middlewares/auth.middleware");

const authRouter = new Router();

authRouter.post("/login", verifyLogin, login);

module.exports = authRouter;
