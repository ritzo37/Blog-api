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

async function helper(comments) {
  if (!comments.length) return [];
  const newArr = await Promise.all(
    comments.map(async (currComment) => {
      let replies = await db.getReplies(currComment.cid);
      let upvotes = await db.getUpvotes(currComment.cid);
      let downvotes = await db.getDownvotes(currComment.cid);
      replies = await helper(replies);
      currComment = {
        ...currComment,
        replies,
        upvotes,
        downvotes,
      };
      return currComment;
    })
  );
  return newArr;
}

async function getComments(req, res) {
  try {
    const postId = parseInt(req.params.postId);
    const pageNumber = parseInt(req.params.pageNumber);
    const data = await db.getComments(postId);
    const numberOfComments = data.length;
    let maxPageNumber = Math.ceil(numberOfComments / 5);
    if (pageNumber > maxPageNumber) {
      return res.status(404).json({ message: "Not found!" });
    }
    const newData = await helper(data);
    let startingIndex = (pageNumber - 1) * 5;
    let endingIndex = startingIndex + 5;
    let dataToSend = newData.slice(startingIndex, endingIndex);
    res.json(dataToSend);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something bad happened please try agian!" });
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
async function getTotal(req, res) {
  const postId = parseInt(req.params.postId);
  try {
    const data = await db.getComments(postId);
    res.json(data.length);
  } catch {
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
  getTotal,
};
