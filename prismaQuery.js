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

module.exports = {
  addUser,
  getUser,
};
