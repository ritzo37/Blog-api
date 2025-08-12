const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  const authorizationHeaderVal = authorizationHeader.split(" ");
  const tokenVal = authorizationHeaderVal[1];
  if (!tokenVal) {
    res.status(401).json({
      message: "You need to be authenticated to do this job!",
    });
  } else {
    jwt.verify(tokenVal, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).json({
          message: "Please login !",
        });
      } else {
        next();
      }
    });
  }
}

module.exports = {
  isAuth,
};
