const { getUserByName } = require("../services/user.service");
const {
  NAME_OR_PASSWORD_REQUIRED,
  USER_ALREADY_EXISTS,
} = require("../constants/error-types");
const pwd2md5 = require("../utils/crypto-pwd");

/**
 * 验证用户名和密码
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyUser = async (ctx, next) => {
  console.log("用户注册 - 验证输入");
  const { username, password } = ctx.request.body;

  // 1. 判断用户名密码是否为空
  if (!username || !password) {
    const error = new Error(NAME_OR_PASSWORD_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 2. 判断用户名是否存在
  const result = await getUserByName(username);
  if (result.length) {
    const error = new Error(USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

/**
 * 密码加密
 * @param {*} ctx
 * @param {*} next
 */
const cryptoPwd = async (ctx, next) => {
  console.log("用户注册 - 密码加密");
  const { password } = ctx.request.body;
  const pwd = pwd2md5(password);
  ctx.request.body.password = pwd;

  await next();
};

module.exports = {
  verifyUser,
  cryptoPwd,
};
