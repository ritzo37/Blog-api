const db = require("../prismaQuery");

async function handleAddPost(req, res) {
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

module.exports = {
  handleAddPost,
};
