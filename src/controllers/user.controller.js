const fs = require("fs");
const userService = require("../services/user.service");
const uploadService = require("../services/upload.service");
const { AVATAR_PATH } = require("../constants/file-paths");

class UserController {
  // 创建用户
  async createUser(ctx, next) {
    // 获取请求参数
    const { username, password } = ctx.request.body;
    // 数据库查询数据
    const result = await userService.createUser(username, password);
    // 返回数据
    ctx.body = result;
  }

  // 获取用户头像信息
  async getAvatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await uploadService.getAvatarByUserId(userId);

    // 文件服务
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
