const db = require("../prismaQuery");

async function addComment(req, res) {
  const userId = res.locals.userId;
  const postId = parseInt(req.params.postId);
  const { content } = req.body;
  console.log(postId);
  try {
    await db.addComment(postId, userId, content);
    res.status(200).json({
      message: "Comment posted!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something bad happened please try again !",
    });
  }
}

async function deleteComment(req, res) {
  const commentId = parseInt(req.params.commentId);
  try {
    await db.deleteComment(commentId);
    res.status(200).json({
      message: "Sucessfully deleted the comment!",
    });
  } catch {
    res.status(500).json({
      message: "Something bad happened please try again !",
    });
  }
}

async function upvoteComment(req, res) {
  const commentId = parseInt(req.params.commentId);
  try {
    await db.upvoteComment(commentId);
    res.json({
      message: "Upvoted!",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something bad happened please try again!" });
  }
}

async function downvoteComment(req, res) {
  const commentId = parseInt(req.params.commentId);
  try {
    await db.downvoteComment(commentId);
    res.json({
      message: "Downvoted!",
    });
  } catch {
    res
      .status(500)
      .json({ message: "Something bad happened please try again!" });
  }
}

module.exports = {
  addComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
};
