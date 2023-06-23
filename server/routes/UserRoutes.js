import express from "express";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import NewUser from "../mongodb/models/CreateUser.js";
dotenv.config();

const router = express.Router();

router.route("/users").get(async (req, res) => {
  try {
    const users = await NewUser.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching users failed, please try again",
    });
  }
});

router.route("/user/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await NewUser.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Fetching user failed, please try again",
    });
  }
});

router.route("/register").post(async (req, res) => {
  try {
    const { name, cnic, email, password } = req.body;

    const existingUser = await NewUser.findOne({ cnic });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await NewUser.create({
      name,
      cnic,
      email,
      password: hashedPassword,
    });
    const { password: pass, ...userWithoutPassword } = newUser._doc;
    console.log(userWithoutPassword);
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a User, please try again",
      err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Body:", req.body);

    // Find the user
    const user = await NewUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "secret-key", {
      expiresIn: "1h",
    });
    const id = user._id;
    // Fetch the user's posts
    // const posts = await Property.find({ user: user._id });
    const { password: pass, ...userWithoutPassword } = user._doc;
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

export default router;
