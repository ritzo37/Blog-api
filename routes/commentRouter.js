const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const commentController = require("../controller/commentsController");

const middlewares = require("../middlewares.js");
commentRouter.post(
  "/",
  middlewares.isAuthenticated,
  commentController.addComment
);

commentRouter.get("/", commentController.getComments);
commentRouter.delete("/:commentId", commentController.deleteComment);
commentRouter.post(
  "/:commentId/upvote",
  middlewares.isAuthenticated,
  commentController.upvoteComment
);
commentRouter.post(
  "/:commentId/downvote",
  middlewares.isAuthenticated,
  commentController.downvoteComment
);

commentRouter.post(
  "/:commentId/reply",
  middlewares.isAuthenticated,
  commentController.addReply
);

commentRouter.get("/:commentId/replies", commentController.getReplies);

module.exports = commentRouter;
