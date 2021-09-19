const connection = require("../app/db");

class CommentService {
  /**
   * 在 momentId 动态下 userId 评论了 content
   * @param {*} content
   * @param {*} momentId
   * @param {*} userId
   * @returns
   */
  async createComment(content, momentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    return result[0];
  }

  /**
   * 在 momentId 动态下 userId 回复了 commentId 内容为 content
   * @param {*} content
   * @param {*} momentId
   * @param {*} userId
   * @param {*} commentId
   * @returns
   */
  async replyComment(content, momentId, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [
      content,
      momentId,
      userId,
      commentId,
    ]);
    return result[0];
  }

  /**
   * 更新 commentId 评论为 content
   * @param {*} content
   * @param {*} commentId
   * @returns
   */
  async updateComment(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, commentId]);
    return result[0];
  }

  /**
   * 删除评论 commentId
   * @param {*} commentId
   * @returns
   */
  async deleteComment(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const result = await connection.execute(statement, [commentId]);
    return result[0];
  }

  /**
   * 根据 momentId 获取评论列表
   * @param {*} momentId
   * @returns
   */
  async getCommentList(momentId) {
    const statement = `
      SELECT 
        c.id, c.content, c.createAt createTime, c.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.username, 'avatarUrl', u.avatar_url) user
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id 
      WHERE c.moment_id = ?
    `;
    const result = await connection.execute(statement, [momentId]);
    return result[0].length ? result[0] : null;
  }
}

module.exports = new CommentService();
