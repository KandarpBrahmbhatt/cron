// controllers/user.controller.js
import User from "../models/user.model.js";

// Get all users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Update user
export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

// Delete user
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};