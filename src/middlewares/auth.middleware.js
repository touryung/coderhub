const jwt = require("jsonwebtoken");

const {
  NAME_OR_PASSWORD_REQUIRED,
  USER_NOT_EXISTS,
  PASSWORD_INCORRECT,
  UNAUTHORIZED,
  UNPERMISSION,
} = require("../constants/error-types");
const { getUserByName } = require("../services/user.service");
const pwd2md5 = require("../utils/crypto-pwd");
const { JWT_PUBLIC_KEY } = require("../app/config");
const { checkResource } = require("../services/auth.service");

/**
 * 验证用户名和密码
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyLogin = async (ctx, next) => {
  console.log("用户登录 - 验证输入");
  const { username, password } = ctx.request.body;

  // 1. 判断用户名密码是否为空
  if (!username || !password) {
    const error = new Error(NAME_OR_PASSWORD_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await getUserByName(username);
  const user = result[0];

  // 判断用户名是否存在
  if (!user) {
    const error = new Error(USER_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断密码是否正确
  if (pwd2md5(password) !== user.password) {
    const error = new Error(PASSWORD_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

/**
 * 授权验证
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyAuth = async (ctx, next) => {
  console.log("登录验证 - 验证token授权");

  // 获取 token
  const authorization = ctx.headers.authorization;
  const token = authorization?.split(" ")[1];

  // 验证 token
  try {
    const result = jwt.verify(token, JWT_PUBLIC_KEY, { algorithms: ["RS256"] });
    ctx.user = result;

    await next();
  } catch {
    const error = new Error(UNAUTHORIZED);
    ctx.app.emit("error", error, ctx);
  }
};

/**
 * 验证权限 - 闭包实现通用性
 * @param {*} tableName
 * @returns
 */
const verifyPermission = (tableName) => async (ctx, next) => {
  console.log("权限验证 - 验证是否有权限修改/删除");

  const resourceId = ctx.params[`${tableName}Id`];
  const { id } = ctx.user;

  const isPermission = await checkResource(tableName, resourceId, id);
  if (!isPermission) {
    const error = new Error(UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
