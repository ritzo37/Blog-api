const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const commentController = require("../controller/commentsController");
const middlewares = require("../middlewares.js");
commentRouter.post(
  "/",
  middlewares.isAuthenticated,
  commentController.addComment
);

commentRouter.get("/:commentId", (req, res) => {});
module.exports = commentRouter;
