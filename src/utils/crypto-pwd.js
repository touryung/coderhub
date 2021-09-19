const crypto = require("crypto");

/**
 * 密码转 md5
 * @param {*} password
 * @returns
 */
const pwd2md5 = (password) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};

module.exports = pwd2md5;
