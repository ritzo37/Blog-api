const express = require("express");
const postsRouter = require("./postsRouter");
const homeRouter = express.Router();
const homeController = require("../controller/homeController");
const middlewares = require("../middlewares");
const commentRouter = require("./commentRouter");

homeRouter.get("/", (req, res) => {
  res.json("Welcome to the app !");
});

homeRouter.use("/posts", postsRouter);
homeRouter.post("/sign-up", homeController.handleSignUp);
homeRouter.post("/log-in", homeController.handleLogin);
homeRouter.use("/posts/:postId/comments", commentRouter);
homeRouter.get("/auth-route", middlewares.isAuthenticated, (req, res) => {
  res.status(200).json("Authenication Works!");
});
module.exports = homeRouter;
