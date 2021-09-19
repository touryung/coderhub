const { getLabel, createLabel } = require("../services/label.service");

const verifyLabelExists = async (ctx, next) => {
  console.log("动态添加标签 - 验证标签是否存在");
  const { labels } = ctx.request.body;

  const newLabels = [];
  for (const label of labels) {
    const labelResult = await getLabel(label);

    if (labelResult.length) {
      // 查询到标签
      newLabels.push({ id: labelResult[0].id, name: label });
    } else {
      // 新的标签，新建
      const result = await createLabel(label);
      newLabels.push({ id: result.insertId, name: label });
    }
  }

  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
