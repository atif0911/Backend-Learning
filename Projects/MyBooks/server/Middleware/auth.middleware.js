const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../Models/user.model");

const authMiddleware = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ Message: "Invalid Toekn!", success: false });
    }

    const token = authHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, SECRET_KEY);

    if (!verifiedToken) {
      return res.status(401).json({ Message: "Invalid Token", success: false });
    }

    const verifiedUser = await User.findOne({
      Email: verifiedToken?.email,
    }).select("-Password"); //get everything except for password

    if (!verifiedUser) {
      return res.status(401).json({ Message: "Invalid User", success: false });
    }

    req.user = verifiedUser;

    next();
    
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res.status(401).json({ Message: "Expired Token", success: false });
    }
    if (err.name == "JsonWebTokenError") {
      return res
        .status(401)
        .json({ Message: "Invalid Token auth failed", success: false });
    } else {
      console.log(err);
      return res.status(500).json({ Message: err.Message, success: false });
    }
  }
};

module.exports = authMiddleware;
