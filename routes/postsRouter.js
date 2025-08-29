const express = require("express");
const postsRouter = express.Router({ mergeParams: true });
const postController = require("../controller/postController");

postsRouter.get("/", postController.getPosts);
postsRouter.get("/:postId", postController.getPost);
module.exports = postsRouter;
