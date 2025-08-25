const db = require("../prismaQuery");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

async function handleSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { username, password } = req.body;
  try {
    await db.addUser(username, password);
    res.status(200).json({
      message: "Sucessfully Created The User",
    });
  } catch (err) {
    res.status(409).json({
      message: "There already exists a user with the same name",
    });
  }
}

async function handleLogin(req, res) {
  const { username, password } = req.body;
  const user = await db.getUser(username);
  if (!user) {
    res.status(404).json({
      message: "The user doesn't exist!",
    });
  } else {
    const fetchedPassword = user.password;
    if (fetchedPassword != password) {
      res.status(401).json({
        message: "The password doesn't match",
      });
    } else {
      const userId = user.id;
      const userRole = user.role;
      jwt.sign(
        { username, userId, userRole },
        process.env.SECRET_KEY,
        { algorithm: "HS256" },
        function (err, token) {
          if (err) {
            res.status(500).json({
              message: "Something bad happened please try again :(",
            });
          }
          res.status(200).json({
            message: "Correct info is sent by you !",
            token: token,
          });
        }
      );
    }
  }
}

module.exports = {
  handleSignUp,
  handleLogin,
};
