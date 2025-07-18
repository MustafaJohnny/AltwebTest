import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    const all = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    res.status(200).json({
      users: all,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if(!user){
      return next(errorHandler(404,'user not found'))
    }
    const {password,...rest}=user._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error);
  }
};