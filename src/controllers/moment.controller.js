const fs = require("fs");
const path = require("path");
const { PICTURE_PATH } = require("../constants/file-paths");
const momentService = require("../services/moment.service");

class MomentController {
  /**
   * 创建动态
   * @param {*} ctx
   * @param {*} next
   */
  async createMoment(ctx, next) {
    const userId = ctx.user.id;
    const { content } = ctx.request.body;
    const result = await momentService.createMoment(userId, content);
    ctx.body = result;
  }

  /**
   * 获取单一动态
   * @param {*} ctx
   * @param {*} next
   */
  async getMoment(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  /**
   * 获取动态列表
   * @param {*} ctx
   * @param {*} next
   */
  async getMomentList(ctx, next) {
    const { offset, limit } = ctx.query;
    const result = await momentService.getMomentList(offset, limit);
    ctx.body = result;
  }

  /**
   * 更新动态
   * @param {*} ctx
   * @param {*} next
   */
  async updateMoment(ctx, next) {
    const { content } = ctx.request.body;
    const { momentId } = ctx.params;
    const result = await momentService.updateMoment(content, momentId);
    ctx.body = result;
  }

  /**
   * 删除动态
   * @param {*} ctx
   * @param {*} next
   */
  async deleteMoment(ctx, next) {
    const { momentId } = ctx.params;
    await momentService.deleteMomentById(momentId);
    ctx.body = { status: "200", message: "删除动态成功" };
  }

  /**
   * 添加标签
   */
  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;

    for (const label of labels) {
      const isRelationExist = await momentService.hasLabel(momentId, label.id);

      if (!isRelationExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }

    ctx.body = { status: 200, message: "动态的标签添加成功" };
  }

  // 获取文件信息
  async getFileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await momentService.getFileInfo(filename);

    const ext = path.extname(filename);
    const { type } = ctx.query;
    if (["small", "middle", "large"].includes(type)) {
      filename = `${filename.replace(ext, "")}-${type}${ext}`;
    }

    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
