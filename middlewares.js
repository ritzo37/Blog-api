const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
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
        const { userId, role } = decoded;
        res.locals.userId = userId;
        res.locals.role = role;
        next();
      }
    });
  }
}

function isAuthorized(req, res, next) {
  const { userId, role } = res.locals;
  if (role == "user") {
    res.status(403).json({
      message: "You cannot do this sorry !",
    });
  } else {
    next();
  }
}

module.exports = {
  isAuthenticated,
  isAuthorized,
};
