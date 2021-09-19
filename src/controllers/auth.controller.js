const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../app/config");

class AuthController {
  /**
   * 登录
   * @param {*} ctx
   * @param {*} next
   */
  login(ctx, next) {
    const { id, username } = ctx.user;

    // 生成 token 返回
    const token = jwt.sign({ id, username }, JWT_PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = { id, username, token };
  }
}

module.exports = new AuthController();
