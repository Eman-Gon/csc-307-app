import User from "../models/user.js"; // Ensure this path is correct based on your project structure

// Fetch all users
export const findAllUsers = async () => {
  return await User.find({});
};

// Fetch users by name and job
export const findUsersByNameAndJob = async (name, job) => {
  return await User.find({ name: name, job: job });
};

// Fetch user by ID
export const findUserById = async (id) => {
  return await User.findById(id);
};

// Create a new user
export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Delete a user by ID
export const findUserByIdAndDelete = async (id) => {
  return await User.findByIdAndDelete(id);
};
