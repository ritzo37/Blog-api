const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const commentController = require("../controller/commentsController");

const middlewares = require("../middlewares.js");
commentRouter.post(
  "/",
  middlewares.isAuthenticated,
  commentController.addComment
);

commentRouter.delete(
  "/:commentId",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  middlewares.postAuthorCheck,
  commentController.deleteComment
);

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

commentRouter.delete(
  "/:commentId/reply/:replyId",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  middlewares.postAuthorCheck,
  commentController.deleteComment
);

module.exports = commentRouter;
