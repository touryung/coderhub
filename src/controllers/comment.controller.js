const commentService = require("../services/comment.service");

class CommentController {
  /**
   * 创建评论
   */
  async createComment(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.createComment(content, momentId, id);
    ctx.body = result;
  }

  /**
   * 回复评论
   * TODO: 回复的评论不在同一个动态的问题
   */
  async replyComment(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;

    const result = await commentService.replyComment(
      content,
      momentId,
      id,
      commentId
    );

    ctx.body = result;
  }

  /**
   * 更新评论
   */
  async updateComment(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await commentService.updateComment(content, commentId);
    ctx.body = result;
  }

  /**
   * 删除评论
   */
  async deleteComment(ctx, next) {
    const { commentId } = ctx.params;
    await commentService.deleteComment(commentId);
    ctx.body = {
      code: "200",
      message: "删除评论成功",
    };
  }

  /**
   * 获取评论列表
   */
  async getCommentList(ctx, next) {
    const { momentId } = ctx.query;
    const result = await commentService.getCommentList(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();
