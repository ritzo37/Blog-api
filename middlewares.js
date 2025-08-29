const jwt = require("jsonwebtoken");
const db = require("./prismaQuery");
function isAuthenticated(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({
      message: "You need to be authenticated to do this job!",
    });
  }
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
        const { userId, userRole } = decoded;
        res.locals.userId = userId;
        res.locals.role = userRole;
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

async function postAuthorCheck(req, res, next) {
  const { userId } = res.locals;
  const postId = parseInt(req.params.postId);
  try {
    const data = await db.getPostWithAuthorIdAndPostId(userId, postId);
    if (!data) {
      res.status(403).json({
        message: "You cannot do this sorry !",
      });
    } else {
      next();
    }
  } catch {
    res.status(500).json({
      message: "Something bad happened please try again!",
    });
  }
}

module.exports = {
  isAuthenticated,
  isAuthorized,
  postAuthorCheck,
};
