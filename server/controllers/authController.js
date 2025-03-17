import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import validator from "validator";

/**
 * @desc   Generate JWT token and set it as an HTTP-only cookie
 * @param  {Object} user - The authenticated user object
 * @param  {Object} res - Express response object
 */
const tokenizeCookie = async (user, res) => {
  const { JWT_SECRET, JWT_EXP } = process.env;
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXP,
  });
  res.cookie("jwtToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true }); // 1-hour expiration
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public (guest)
 */

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password || !role) {
      throw createError(400, "All fields are required");
    }

    // Check if user already exists
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      throw createError(400, "User already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      isConfirmed: false, // Not confirmed until email verification
    });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User successfully registered", data: savedUser });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify registered user's email
 * @route   GET /api/auth/verify-email
 * @access  Public (guest)
 */

export const verifyEmail = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public (guest)
 */

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw createError(401, "Invalid credentials");

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError(401, "Invalid credentials");

    // Set token as a cookie after successful login
    await tokenizeCookie(user, res);

    res
      .status(200)
      .json({ message: "User successfully logged in", data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login a user with google
 * @route   POST /api/auth/login/google
 * @access  Public (guest)
 */

export const googleLogin = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Logout a user
 * @route   GET /api/auth/logout
 * @access  Private (logged in user)
 */

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwtToken", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.send({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Logout error: ", error);
    next(createError(500, "Something went wrong during logout"));
  }
};

/**
 * @desc    Get user auth data
 * @route   GET /api/auth/user-data
 * @access  Private (logged in user)
 */

export const getUserData = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Update user auth data
 * @route   PATCH /api/auth/update-account
 * @access  Private (logged in user)
 */

export const updateAccount = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userId = req.user.id;

    // Validate email if it's being updated
    if (email) {
      if (!validator.isEmail(email)) {
        throw createError(400, "Invalid email format");
      }
      // Check if email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw createError(400, "Email already in use");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { firstName, lastName, email } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Change password
 * @route   PATCH /api/auth/change-password
 * @access  Private (logged in user)
 */

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // From checkToken middleware

    if (!currentPassword || !newPassword) {
      throw createError(400, "All fields are required");
    }

    const user = await User.findById(userId);
    if (!user) throw createError(404, "User not found");

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw createError(401, "Invalid current password");

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user account and all related data
 * @route   DELETE /api/auth/delete-account
 * @access  Private (logged in user)
 */

export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id; // From checkToken middleware

    // Delete all bookings associated with the user
    await Booking.deleteMany({
      $or: [{ initiatedBy: userId }, { receivedBy: userId }],
    });

    // Delete the user account
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw createError(404, "User not found");

    // Clear authentication cookie
    res.clearCookie("jwtToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    next(error);
  }
};
