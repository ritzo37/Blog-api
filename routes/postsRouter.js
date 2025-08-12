const express = require("express");
const postsRouter = express.Router({ mergeParams: true });
const middlewares = require("../middlewares");
const postController = require("../controller/postController");

postsRouter.post(
  "/",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  postController.handleAddPost
);

postsRouter.get("/", (req, res) => {});
postsRouter.get("/:postId", (req, res) => {});
postsRouter.put("/:postId", (req, res) => {});
postsRouter.delete("/:postId", (req, res) => {});

module.exports = postsRouter;
