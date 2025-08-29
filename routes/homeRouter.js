const express = require("express");
const postsRouter = require("./postsRouter");
const homeRouter = express.Router();
const homeController = require("../controller/homeController");
const middlewares = require("../middlewares");
const commentRouter = require("./commentRouter");
const validator = require("../errorValidation");
const authorPostsRouter = require("./authorPostsRouter");

homeRouter.get("/", (req, res) => {
  res.json("Welcome to the app !");
});

homeRouter.use("/author/posts", authorPostsRouter);
homeRouter.use("/posts", postsRouter);
homeRouter.post("/sign-up", ...validator, homeController.handleSignUp);
homeRouter.post("/log-in", homeController.handleLogin);
homeRouter.use(
  "/posts/:postId/comments",
  middlewares.isAuthenticated,
  commentRouter
);
homeRouter.get("/auth-route", middlewares.isAuthenticated, (req, res) => {
  res.status(200).json("Authenication Works!");
});
module.exports = homeRouter;
