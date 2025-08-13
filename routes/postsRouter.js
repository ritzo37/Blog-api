const express = require("express");
const postsRouter = express.Router({ mergeParams: true });
const middlewares = require("../middlewares");
const postController = require("../controller/postController");

postsRouter.post(
  "/",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  postController.addPost
);

postsRouter.get("/", postController.getPosts);
postsRouter.get("/:postId", postController.getPost);
postsRouter.delete(
  "/:postId",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  postController.deletePost
);

postsRouter.put(
  "/:postId",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  postController.updatePost
);

module.exports = postsRouter;
