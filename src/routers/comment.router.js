const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middlewares/auth.middleware");
const {
  createComment,
  replyComment,
  updateComment,
  deleteComment,
  getCommentList,
} = require("../controllers/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

commentRouter.post("/", verifyAuth, createComment);
commentRouter.post("/:commentId/reply", verifyAuth, replyComment);

commentRouter.patch(
  "/:commentId",
  verifyAuth,
  verifyPermission("comment"),
  updateComment
);
commentRouter.delete(
  "/:commentId",
  verifyAuth,
  verifyPermission("comment"),
  deleteComment
);

commentRouter.get("/", getCommentList);

module.exports = commentRouter;
