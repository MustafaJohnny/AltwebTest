import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  if (password !== confirmPassword) {
    next(errorHandler(400, "passwords dont match"));
  }

  const user = await User.findOne({ username });
  const Email = await User.findOne({ email });
  if (user) {
    next(errorHandler(400, "Username already exists "));
  }

  if (Email) {
    next(errorHandler(400, "Email already exists "));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username, 
    email,
    password: hashedPassword,
  });
try {
    await newUser.save();
    
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin }, 
      process.env.JWT_SECRET, 
      { expiresIn: "8d" }
    );
    
    const { password: pass, ...rest } = newUser._doc;

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "invalid password or email"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "invalid password or email"));
    }
    const token = jwt.sign({ id: validUser._id ,isAdmin:validUser.isAdmin}, process.env.JWT_SECRET, {
      expiresIn: "8d",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};