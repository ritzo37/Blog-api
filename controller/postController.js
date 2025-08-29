const db = require("../prismaQuery");

async function addPost(req, res) {
  const { title, content } = req.body;
  const userId = res.locals.userId;
  try {
    await db.addPost(content, title, userId);
    res.status(200).json({
      message: "Posted!!",
    });
  } catch (err) {
    res.status(503).json({
      message: "Plese try again !",
    });
  }
}

async function getPosts(req, res) {
  try {
    const data = await db.getPosts();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something bad happened please try again!",
    });
  }
}

async function deletePost(req, res) {
  const postId = parseInt(req.params.postId);
  try {
    await db.deletePost(postId);
    res.status(200).json({
      message: "Successfully deleted the post!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something bad happened please try again!",
    });
  }
}

async function getPost(req, res) {
  const postId = parseInt(req.params.postId);
  try {
    const data = await db.getPost(postId);
    res.json(data);
  } catch {
    res
      .status(500)
      .json({ message: "Something bad happened please try agian!" });
  }
}

async function updatePost(req, res) {
  const postId = parseInt(req.params.postId);
  const { title, content } = req.body;
  try {
    await db.updatePost(postId, content, title);
    res.json({
      message: "Sucessfully updated the post",
    });
  } catch {
    res.status(500).json({
      message: "Something bad happened please try again",
    });
  }
}

async function getAuthorPosts(req, res) {
  const authorId = res.locals.userId;
  try {
    const data = await db.getPostsByAuthorId(authorId);
    res.json(data);
  } catch {
    res.status(500).json({
      message: "Something bad happened please try again !",
    });
  }
}

module.exports = {
  addPost,
  getPosts,
  deletePost,
  getPost,
  updatePost,
  getAuthorPosts,
};
