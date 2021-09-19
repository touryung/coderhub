const connection = require("../app/db");

class UploadService {
  /**
   * 保存头像信息
   * @param {*} filename
   * @param {*} mimetype
   * @param {*} size
   * @param {*} userId
   * @returns
   */
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result[0];
  }

  /**
   * 通过 userId 获取头像信息
   * @param {*} userId
   * @returns
   */
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const result = await connection.execute(statement, [userId]);
    return result[0][0];
  }

  /**
   * 保存配图信息
   * @param {*} filename
   * @param {*} mimetype
   * @param {*} size
   * @param {*} userId
   * @param {*} momentId
   * @returns
   */
  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId,
    ]);
    return result[0];
  }
}

module.exports = new UploadService();
