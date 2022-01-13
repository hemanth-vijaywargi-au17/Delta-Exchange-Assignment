const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { Router } = require("express");
const userRoutes = Router();
const User = require("../models/User");
const TeamMember = require("../models/TeamMember");

// Authenticator MiddleWare Function
function Authenticate(req, res, next) {
  try {
    const DecodedData = verify(req.header("token"), process.env.JWT_SECRET);
    req.email = DecodedData.currentUser;
    next();
  } catch (err) {
    res.json({
      error: true,
      message: "Invalid Token",
      errorObj: err,
    });
  }
}

// Sign Up
userRoutes.post("/signup", async (req, res) => {
  try {
    // Data Received
    const data = req.body;

    // Check if User already exists
    let response = await User.findOne({ email: data.email });
    if (response) {
      res.json({
        error: true,
        message: "User Already Exists",
      });
      return;
    }

    // Create new User
    data.members = [];
    await User.create(data);

    // Send response
    res.status(201).json({
      error: false,
      message: "Sign Up Successfull",
    });
  } catch (err) {
    res.send({
      error: true,
      errorObj: err,
    });
  }
});

// Login
userRoutes.post("/login", async (req, res) => {
  try {
    const data = req.body;

    // validations
    if (!data.email || !data.password) {
      res.json({
        error: true,
        message: "Empty data",
      });
      return;
    }

    let response = await User.findOne({ email: data.email });
    if (!response) {
      res.json({
        error: true,
        message: "User Does Not Exist!",
      });
      return;
    }

    let passwordIsCorrect = await compare(data.password, response.password);
    if (passwordIsCorrect) {
      // Generate a token
      const jwtToken = sign(
        { currentUser: data.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "10d",
        }
      );

      res.json({
        error: false,
        message: "User Logged in Successfully!",
        token: jwtToken,
        user: {
          name: response.name,
          email: response.email,
          _id: response._id,
        },
      });
      return;
    }

    res.json({
      error: true,
      message: "Incorrect Password !",
    });
  } catch (err) {
    res.json({
      error: true,
      errorObj: err,
      message: "Unknown Error",
    });
  }
});

// Get Members
userRoutes.get("/team_members", Authenticate, async (req, res) => {
  let { team_members } = await User.findOne({ email: req.email }).populate(
    "team_members"
  );
  res.json({
    error: false,
    team_members,
  });
});

// Add Member
userRoutes.post("/team_members/add", Authenticate, async (req, res) => {
  let { name, company, status, notes, userId } = req.body;
  let insertedMember = await TeamMember.create({
    name,
    company,
    status,
    notes,
    userId,
  });
  await User.updateOne(
    { email: req.email },
    { $push: { team_members: insertedMember._id } }
  );
  res.json({
    error: false,
    insertedMember,
  });
});

// Remove Member
userRoutes.post("/team_members/remove", Authenticate, async (req, res) => {
  let { memberId, userId } = req.body;
  await User.updateOne({ _id: userId }, { $pull: { team_members: memberId } });
  await TeamMember.deleteOne({ _id: memberId });
  res.json({
    error: false,
  });
});

module.exports = userRoutes;
