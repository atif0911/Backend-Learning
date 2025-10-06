const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY =process.env.SECRET_KEY;

const handleSignupUserController = async (req, res) => {
  const body = req.body;
  try {
    if (!body?.FirstName || !body?.Email || !body?.Password) {
      return res
        .status(500)
        .json({ Message: "All fields required", status: false });
    }

    const saltcount = 10;
    const hashedPassword = await bcrypt.hash(body.Password, saltcount);

    const signUp = await User.insertOne({ ...body, Password: hashedPassword });

    if (signUp) {
      return res.status(201).json({
        Message: "user created successfully",
        status: true,
        id: signUp?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.Message, status: false });
  }
};

const handleSigninUserController = async (req, res) => {
  const body = req.body;
  try {
    if (!body?.Email || !body?.Password) {
      return res
        .status(500)
        .json({ Message: "Email and password  required", status: false });
    }

    const user = await User.findOne({ Email: body.Email });

    if (!user) {
      return res.status(400).json({
        Message: "user Doest not exist",
        status: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      body.Password,
      user.Password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        Message: "password Doest not match",
        status: false,
      });
    }

    const token = jwt.sign({ email: user?.Email, id: user?._id }, SECRET_KEY);

    return res
      .status(200)
      .json({
        Message: "USer logged in successfully",
        success: true,
        token: token,
      });
  } catch (error) {
    return res.status(500).json({ Message: error.Message, status: false });
  }
};

module.exports = { handleSignupUserController, handleSigninUserController };
