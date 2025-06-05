import express from 'express';
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// ✅ REGISTER Route
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    // Optional: check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({ name, email, pass });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error while registering user" });
  }
});

// ✅ LOGIN Route
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const result = await userModel.findOne({ email, pass });

  if (!result) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  return res.json(result);
});

// ✅ Get full user by email
userRouter.get("/:id", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email });
  return res.json(result);
});

// ✅ Get only name by email
userRouter.get("/:id/name", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email }, { _id: 0, name: 1 });
  return res.json(result);
});

export default userRouter;
