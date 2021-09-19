const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission,
} = require("../middlewares/auth.middleware");
const { verifyLabelExists } = require("../middlewares/label.middleware");
const {
  createMoment,
  getMoment,
  getMomentList,
  updateMoment,
  deleteMoment,
  addLabels,
  getFileInfo,
} = require("../controllers/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, createMoment);
momentRouter.get("/:momentId", getMoment);
momentRouter.get("/", getMomentList);
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyPermission("moment"),
  updateMoment
);
momentRouter.delete(
  "/:momentId",
  verifyAuth,
  verifyPermission("moment"),
  deleteMoment
);

momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission("moment"),
  verifyLabelExists,
  addLabels
);

momentRouter.get("/images/:filename", getFileInfo);

module.exports = momentRouter;
