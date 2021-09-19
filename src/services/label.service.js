const connection = require("../app/db");

class LabelService {
  /**
   * 创建标签
   * @param {*} name
   * @returns
   */
  async createLabel(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  /**
   * 查询是否有标签
   * @param {*} name
   * @returns
   */
  async getLabel(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  /**
   * 获取标签列表
   * @param {*} offset
   * @param {*} limit
   * @returns
   */
  async getLabelList(offset, limit) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`;
    const result = await connection.execute(statement, [offset, limit]);
    return result[0];
  }
}

module.exports = new LabelService();
