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

async function checkUpvote(commentId, userId) {
  const data = await prisma.upvotes.findMany({
    where: {
      AND: [{ cid: commentId }, { userId: userId }],
    },
  });
  return data;
}

async function checkDownvote(commentId, userId) {
  const data = await prisma.downvotes.findMany({
    where: {
      AND: [{ cid: commentId }, { userId: userId }],
    },
  });
  return data;
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
  const data = await prisma.post.findUnique({
    where: {
      postId: postId,
    },
    include: {
      author: true,
      comments: {
        include: {
          downvotes: true,
          upvotes: true,
          replies: true,
        },
      },
    },
  });
  return data;
}

async function getPostsByAuthorId(authorId) {
  const data = await prisma.post.findMany({
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });
  return data;
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

async function upvoteComment(commentId, userId) {
  await prisma.upvotes.create({
    data: {
      cid: commentId,
      userId: userId,
    },
  });
}

async function downvoteComment(commentId, userId) {
  await prisma.downvotes.create({
    data: {
      cid: commentId,
      userId: userId,
    },
  });
}

async function getComments(postId) {
  return await prisma.comments.findMany({
    where: {
      postId: postId,
      parentCid: null,
    },
    include: {
      user: true,
    },
  });
}
async function getReplies(commentId) {
  return await prisma.comments.findMany({
    where: {
      parentCid: commentId,
    },
    include: {
      user: true,
    },
  });
}

async function addReply(cid, content, userId, postId) {
  await prisma.comments.create({
    data: {
      userId,
      content,
      parentCid: cid,
      postId,
    },
  });
}

async function getPostWithAuthorIdAndPostId(authorId, postId) {
  const data = await prisma.post.findUnique({
    where: {
      authorId,
      postId,
    },
  });
  return data;
}
async function getUpvotes(cid) {
  return await prisma.upvotes.findMany({
    where: {
      cid,
    },
  });
}
async function getDownvotes(cid) {
  return await prisma.downvotes.findMany({
    where: {
      cid,
    },
  });
}

async function getUserWithUserId(userId) {
  return await prisma.users.findUnique({
    where: {
      id: userId,
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
  checkUpvote,
  checkDownvote,
  getComments,
  addReply,
  getPostsByAuthorId,
  getPostWithAuthorIdAndPostId,
  getReplies,
  getUpvotes,
  getDownvotes,
  getUserWithUserId,
};
