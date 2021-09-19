const connection = require("../app/db");

class AuthService {
  /**
   * 动态操作权限
   * @param {*} momentId
   * @param {*} userId
   * @returns
   */
  async checkResource(tableName, resourceId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? && user_id = ?;`;
    const result = await connection.execute(statement, [resourceId, userId]);
    return result[0].length ? true : false;
  }
}

module.exports = new AuthService();
