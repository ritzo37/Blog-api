const express = require("express");
const commentRouter = require("./commentRouter");
const postsRouter = express.Router();

postsRouter.get("/", (req, res) => {});
postsRouter.get("/:postId", (req, res) => {});
postsRouter.put("/:postId", (req, res) => {});
postsRouter.delete("/:postId", (req, res) => {});
postsRouter.use("/:postId/comments", commentRouter);

module.exports = postsRouter;
