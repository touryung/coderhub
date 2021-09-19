const {
  NAME_OR_PASSWORD_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_NOT_EXISTS,
  PASSWORD_INCORRECT,
  UNAUTHORIZED,
  UNPERMISSION,
} = require("../constants/error-types");

const errorHandler = (err, ctx) => {
  let status, message;

  switch (err.message) {
    case NAME_OR_PASSWORD_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空";
      break;
    case USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已经存在";
      break;
    case USER_NOT_EXISTS:
      status = 400;
      message = "用户名不存在";
      break;
    case PASSWORD_INCORRECT:
      status = 400;
      message = "密码不正确";
      break;
    case UNAUTHORIZED:
      status = 401;
      message = "无效的token";
      break;
    case UNPERMISSION:
      status = 401;
      message = "没有操作权限";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = { status, message };
};

module.exports = errorHandler;
