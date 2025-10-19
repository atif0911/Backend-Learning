const User = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const handleSignUpUserController = async (req, res) => {
  const body = req.body;
  try {
    if (
      !body?.FirstName ||
      !body?.LastName ||
      !body?.Email ||
      !body?.Password
    ) {
      return res.status(500).json({
        Message: "All fields required",
        Success: false,
      });
    }

    const saltcount = 10;
    const hashedPassword = await bcrypt.hash(body.Password, saltcount);

    const signUp = await User.insertOne({
      ...body,
      Password: hashedPassword,
    });

    if (signUp) {
      return res.status(201).json({
        Message: "user created successfully",
        Success: true,
        id: signUp?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.Message, Success: false });
  }
};

const handleSigninUserController = async (req, res) => {
  const body = req.body;
  try {
    if (!body?.Email || !body?.Password) {
      return res.status(500).json({
        Message: "Email and Password Required",
        Success: false,
      });
    }

    const user = await User.findOne({ Email: body.Email });

    if (!user) {
      return res.status(400).json({
        Message: "User does not Exist",
        Success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      body.Password,
      user.Password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        Message: "Password Does not Match.",
        Success: false,
      });
    }

    const token = jwt.sign(
      {
        email: user?.Email,
        id: user?._id,
      },
      SECRET_KEY
    );

    return res.status(200).json({
      Message: "User logged in successfully",
      Success: true,
      Token: token,
    });
  } catch (error) {
    return res.status(500).json({ Message: error.Message, Success: false });
  }
};

module.exports = { handleSignUpUserController, handleSigninUserController };
