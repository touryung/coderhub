const Router = require("koa-router");

const { verifyUser, cryptoPwd } = require("../middlewares/user.middleware");
const { createUser, getAvatarInfo } = require("../controllers/user.controller");

const userRouter = new Router({ prefix: "/user" });

userRouter.post("/", verifyUser, cryptoPwd, createUser);
userRouter.get("/:userId/avatar", getAvatarInfo);

module.exports = userRouter;
