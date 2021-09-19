const uploadService = require("../services/upload.service");
const userService = require("../services/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class UploadController {
  // 保存头像信息
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    await uploadService.createAvatar(filename, mimetype, size, id);

    // 将头像 url 保存到 user 表
    const avatarUrl = `http://${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
    await userService.updateAvatarUrl(avatarUrl, id);

    ctx.body = {
      status: 200,
      msg: "上传头像成功",
    };
  }

  // 保存配图信息
  async saveFileInfo(ctx, next) {
    const { files } = ctx.req;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    for (const file of files) {
      const { filename, mimetype, size } = file;
      await uploadService.createFile(filename, mimetype, size, id, momentId);
    }

    ctx.body = {
      status: 200,
      msg: "上传配图成功",
    };
  }
}

module.exports = new UploadController();
