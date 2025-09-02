const postController = require("../controller/postController");
const express = require("express");
const middlewares = require("../middlewares");
const authorPostsRouter = express.Router({ mergeParams: true });

authorPostsRouter.get(
  "/",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  postController.getAuthorPosts
);

authorPostsRouter.put(
  "/:postId/publishToggle",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  middlewares.postAuthorCheck,
  postController.publishHandler
);

authorPostsRouter.get(
  "/:postId",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  middlewares.postAuthorCheck,
  postController.getAuthorPost
);

authorPostsRouter.put(
  "/:postId",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  middlewares.postAuthorCheck,
  postController.updatePost
);

authorPostsRouter.post(
  "/",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  postController.addPost
);

authorPostsRouter.delete(
  "/:postId",
  middlewares.isAuthenticated,
  middlewares.isAuthorized,
  middlewares.postAuthorCheck,
  postController.deletePost
);
module.exports = authorPostsRouter;
