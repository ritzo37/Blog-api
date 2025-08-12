const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function addUser(username, password) {
  await prisma.user.create({
    data: {
      name: username,
      password: password,
    },
  });
}

async function getUser(username) {
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });
  return user;
}

async function addPost(content, title, authorId) {
  await prisma.post.create({
    data: {
      content,
      title,
      authorId,
    },
  });
}

async function addComment(postId, userId, content) {
  await prisma.comments.create({
    data: {
      content,
      postId,
      userId,
    },
  });
}

module.exports = {
  addUser,
  getUser,
  addPost,
  addComment,
};
