const db = require("../prismaQuery");
async function addComment(req, res) {
  const userId = res.locals.userId;
  const postId = parseInt(req.params.postId);
  const { content } = req.body;
  try {
    await db.addComment(postId, userId, content);
    return res.status(200).json({
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
  const userId = res.locals.userId;
  try {
    const data = await db.checkUpvote(commentId, userId);
    if (data.length) {
      return res
        .status(409)
        .json({ message: "You have already upvoted this comment!" });
    }
    await db.upvoteComment(commentId, userId);
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
  const userId = res.locals.userId;
  try {
    const data = await db.checkDownvote(commentId, userId);
    if (data.length) {
      return res
        .status(409)
        .json({ message: "You have already downvoted this comment!" });
    }
    await db.downvoteComment(commentId, userId);
    res.json({
      message: "Downvoted!",
    });
  } catch {
    res
      .status(500)
      .json({ message: "Something bad happened please try again!" });
  }
}

async function getComments(req, res) {
  try {
    const data = await db.getComments();
    res.json(data);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something bad happened please try again!" });
  }
}

async function addReply(req, res) {
  try {
    const commentId = parseInt(req.params.commentId);
    const postId = parseInt(req.params.postId);
    const userId = res.locals.userId;
    const content = req.body.content;
    await db.addReply(commentId, content, userId, postId);
    res.json({ message: "You have sucessfully added your comment!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something bad happened please try agian!" });
  }
}

module.exports = {
  addComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
  getComments,
  addReply,
};
