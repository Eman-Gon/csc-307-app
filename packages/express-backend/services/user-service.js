//user-service.js
import User from "../models/user.js"; 

export const findAllUsers = async () => {
  return await User.find();
};


export const findUsersByNameAndJob = async (name, job) => {
  return await User.find({ name, job });
};


export const findUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};


export const findUserByIdAndDelete = async (id) => {
  return await User.findByIdAndDelete(id);
};
