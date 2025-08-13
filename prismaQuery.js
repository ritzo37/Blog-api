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

async function deleteComment(commentId) {
  await prisma.comments.delete({
    where: {
      cid: commentId,
    },
  });
}

async function getPosts() {
  const data = await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
    },
  });
  return data;
}

async function deletePost(postId) {
  await prisma.post.delete({
    where: {
      postId,
    },
  });
}

async function getPost(postId) {
  const post = await prisma.post.findUnique({
    where: {
      postId,
    },
  });
  return post;
}

async function updatePost(postId, content, title) {
  await prisma.post.update({
    where: {
      postId,
    },
    data: {
      content,
      title,
    },
  });
}

async function upvoteComment(commentId) {
  await prisma.comments.update({
    where: {
      cid: commentId,
    },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });
}

async function downvoteComment(commentId) {
  await prisma.comments.update({
    where: {
      cid: commentId,
    },
    data: {
      downvotes: {
        decrement: 1,
      },
    },
  });
}
module.exports = {
  addUser,
  getUser,
  addPost,
  addComment,
  deleteComment,
  getPosts,
  deletePost,
  getPost,
  updatePost,
  upvoteComment,
  downvoteComment,
};
