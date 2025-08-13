const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const commentController = require("../controller/commentsController");
const middlewares = require("../middlewares.js");
commentRouter.post(
  "/",
  middlewares.isAuthenticated,
  commentController.addComment
);

commentRouter.delete("/:commentId", commentController.deleteComment);
commentRouter.put("/:commentId/upvote", commentController.upvoteComment);
commentRouter.put("/:commentId/downvote", commentController.downvoteComment);
module.exports = commentRouter;
