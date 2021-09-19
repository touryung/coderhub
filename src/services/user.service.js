const connection = require("../app/db");

class UserService {
  /**
   * 创建用户
   * @param {*} user
   * @returns
   */
  async createUser(username, password) {
    const statement = `INSERT INTO user (username, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [username, password]);
    return result[0];
  }

  /**
   * 根据用户名查询数据库
   * @param {*} username
   * @returns
   */
  async getUserByName(username) {
    const statement = `SELECT * FROM user WHERE username = ?;`;
    const result = await connection.execute(statement, [username]);
    return result[0];
  }

  /**
   * 修改头像 url
   * @param {*} avatarUrl
   * @param {*} userId
   * @returns
   */
  async updateAvatarUrl(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [avatarUrl, userId]);
    return result[0];
  }
}

module.exports = new UserService();
