const express = require("express");
const commentRouter = express.Router();

commentRouter.get("/", (req, res) => {});
commentRouter.get("/:commentId", (req, res) => {});
module.exports = commentRouter;
