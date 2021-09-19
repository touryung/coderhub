const labelService = require("../services/label.service");

class LabelController {
  /**
   * 创建标签
   */
  async createLabel(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelService.createLabel(name);
    ctx.body = result;
  }

  /**
   * 获取标签列表
   */
  async getLabelList(ctx, next) {
    const { offset, limit } = ctx.query;
    const result = await labelService.getLabelList(offset, limit);
    ctx.body = result;
  }
}

module.exports = new LabelController();
