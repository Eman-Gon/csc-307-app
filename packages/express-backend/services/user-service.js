// user-servicesVersion.js
import User from "../models/user.js"; // Import the User model

export const findUsersByNameAndJob = async (name, job) => {
  return await User.find({ name: name, job: job });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByName = async (name) => {
  return await User.find({ name: name });
};

export const addUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save(); // Save the new user to the database
};

export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};