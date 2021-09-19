const connection = require("../app/db");

class MomentService {
  /**
   * 创建动态
   * @param {*} moment
   * @returns
   */
  async createMoment(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connection.execute(statement, [content, userId]);
    return result[0];
  }

  /**
   * 通过动态 id 获取动态
   * @param {*} id
   * @returns
   */
  async getMomentById(id) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.username, 'avatarUrl', u.avatar_url) author,
        IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
        (SELECT 
          JSON_ARRAYAGG(CONCAT('http://localhost:3000/moment/images/', f.filename)) 
         FROM file f WHERE f.moment_id = m.id
        ) images 
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
    const result = await connection.execute(statement, [id]);
    return result[0][0];
  }

  /**
   * 通过偏移和大小返回动态列表
   * @param {*} offset
   * @param {*} limit
   * @returns
   */
  async getMomentList(offset, limit) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.username) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) lableCount,
        (SELECT 
          JSON_ARRAYAGG(CONCAT('http://localhost:3000/moment/images/', f.filename)) 
         FROM file f WHERE f.moment_id = m.id
        ) images
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ?, ?;
    `;
    const result = await connection.execute(statement, [offset, limit]);
    return result[0];
  }

  /**
   * 通过新 content 和动态 id 更新动态
   * @param {*} content
   * @param {*} momentId
   * @returns
   */
  async updateMoment(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, momentId]);
    return result[0];
  }

  /**
   * 通过动态 id 删除动态
   * @param {*} id
   * @returns
   */
  async deleteMomentById(id) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0][0];
  }

  /**
   * 查询动态是否已有标签
   * @param {*} momentId
   * @param {*} labelId
   * @returns
   */
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? && label_id = ?;`;
    const result = await connection.execute(statement, [momentId, labelId]);
    return result[0].length ? true : false;
  }

  /**
   * 给动态添加标签
   * @param {*} momentId
   * @param {*} labelId
   * @returns
   */
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const result = await connection.execute(statement, [momentId, labelId]);
    return result[0];
  }

  /**
   * 根据文件名查询文件信息
   * @param {*} filename
   * @returns
   */
  async getFileInfo(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const result = await connection.execute(statement, [filename]);
    return result[0][0];
  }
}

module.exports = new MomentService();
