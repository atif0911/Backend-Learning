const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../Model/user.model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        Message: "Invalid Token!",
        Success: false,
      });
    }
    const token = authHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, SECRET_KEY);

    if (!verifiedToken) {
      return res.status(401).json({
        Message: "Invalid TOken",
        Success: false,
      });
    }

    const verifiedUser = await User.findOne({
      Email: verifiedToken?.email,
    }).select("-Password");

    if (!verifiedUser) {
      return res.status(401).json({
        Message: "Invalid User",
        Success: false,
      });
    }
    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        Message: "Expired Token",
        Success: false,
      });
    }
    if (error.name == "JsonWebTokenError") {
      return res.status(401).json({
        Message: "Invalid Token Auth failed",
        Success: false,
      });
    } else {
      return res.status(500).json({
        Message: error.Message,
        Success: false,
      });
    }
  }
};

module.exports = authMiddleware;
