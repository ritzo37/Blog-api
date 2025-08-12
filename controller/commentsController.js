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
    console.log(err);
    res.status(500).json({
      message: "Something bad happened please try again !",
    });
  }
}
module.exports = {
  addComment,
};
