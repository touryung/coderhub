const Router = require("koa-router");
const { verifyAuth } = require("../middlewares/auth.middleware");

const {
  createLabel,
  getLabelList,
} = require("../controllers/label.controller");

const labelRouter = new Router({ prefix: "/label" });

labelRouter.post("/", verifyAuth, createLabel);
labelRouter.get("/", getLabelList);

module.exports = labelRouter;
