const Router = require("koa-router");

const { verifyAuth } = require("../middlewares/auth.middleware");
const {
  avatarHandler,
  pictureHandler,
  pictureResize,
} = require("../middlewares/upload.middleware");
const {
  saveAvatarInfo,
  saveFileInfo,
} = require("../controllers/upload.controller");

const uploadRouter = new Router({ prefix: "/upload" });

uploadRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);
uploadRouter.post(
  "/picture",
  verifyAuth,
  pictureHandler,
  pictureResize,
  saveFileInfo
);

module.exports = uploadRouter;
