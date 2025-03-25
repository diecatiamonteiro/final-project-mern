import mongoose from "mongoose";
import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import axios from "axios";
import transporter from "../utils/emailConfig.js";
import { verificationEmail } from "../utils/emailTemplates.js";
import {
  tokenizeCookie,
  generateVerificationToken,
} from "../utils/authUtils.js";
import { deleteFromCloudinary } from "../utils/cloudinaryUtils.js";

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
      return next(createError(400, "All fields are required"));
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return next(createError(400, "Invalid email format"));
    }

    // Validate password strength
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return next(
        createError(
          400,
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }

    // Sanitize inputs
    const sanitizedFirstName = validator.escape(firstName);
    const sanitizedLastName = validator.escape(lastName);
    const sanitizedEmail = validator.normalizeEmail(email);

    // Check if user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return next(createError(400, "User already exists"));
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with sanitized inputs
    const newUser = new User({
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      password: hashedPassword,
      role,
      isConfirmed: false,
    });
    const savedUser = await newUser.save();

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&userId=${savedUser._id}`;

    // Send verification email using imported transporter and template
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Verify your email",
      html: verificationEmail(verificationLink),
    });

    res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
      data: savedUser,
    });
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
    const { token, userId } = req.query;

    if (!token || !userId) {
      return next(createError(400, "Missing verification information"));
    }

    // Verify the token
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next(createError(400, "Invalid or expired verification link"));
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { isConfirmed: true },
      { new: true }
    );

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({
      message: "Email verified successfully. You can now log in.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public (guest)
 */

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return next(createError(400, "Invalid email format"));
    }

    // Sanitize email
    const sanitizedEmail = validator.normalizeEmail(email);

    // Check if user exists (using sanitized email)
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      // Using a generic message for security
      return next(createError(401, "Invalid credentials"));
    }

    // Check email verification status
    if (!user.isConfirmed) {
      return next(
        createError(401, "Please verify your email before logging in")
      );
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Using a generic message for security
      return next(createError(401, "Invalid credentials"));
    }

    // Set token as a cookie after successful login
    await tokenizeCookie(user, res);

    // Don't send password in response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "Login successful",
      data: userWithoutPassword,
    });
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
    const { token } = req.body;

    if (!token) {
      return next(createError(400, "Access token is required"));
    }

    // Fetch user info from Google using the access token
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    let { email } = response.data;
    email = validator.normalizeEmail(email);

    if (!email) {
      return next(
        createError(400, "Failed to retrieve user email from Google")
      );
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return next(
        createError(
          401,
          "This account does not exist in our database. Please register."
        )
      );
    }

    // Set JWT token as cookie
    await tokenizeCookie(user, res);

    res.status(200).json({
      message: "Successfully logged in with Google",
      data: user,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
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
      sameSite: "none",
      secure: true,
    });
    res.send({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Logout error: ", error);
    return next(createError(500, "Something went wrong during logout"));
  }
};

/**
 * @desc    Get user auth data
 * @route   GET /api/auth/user-data
 * @access  Private (logged in user)
 */

export const getUserData = async (req, res, next) => {
  try {
    // Get user ID from checkToken middleware
    const userId = req.user.id;

    // Find user and exclude password from response
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({
      message: "User data retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
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
        return next(createError(400, "Invalid email format"));
      }
      // Check if email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return next(createError(400, "Email already in use"));
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { firstName, lastName, email } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found"));
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
      return next(createError(400, "All fields are required"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(createError(401, "Invalid current password"));
    }

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
    const userId = req.user.id;

    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get user data first (for Cloudinary cleanup)
      const user = await User.findById(userId);
      if (!user) {
        return next(createError(404, "User not found"));
      }

      // Delete Cloudinary images
      if (user.profilePicture && !user.profilePicture.includes("default")) {
        await deleteFromCloudinary(user.profilePicture);
      }
      if (user.images?.length > 0) {
        for (const image of user.images) {
          await deleteFromCloudinary(image);
        }
      }

      // Delete bookings with transaction
      await Booking.deleteMany(
        {
          $or: [{ initiatedBy: userId }, { receivedBy: userId }],
        },
        { session }
      );

      // Remove from favorites lists with transaction
      await User.updateMany(
        { favourites: userId },
        { $pull: { favourites: userId } },
        { session }
      );

      // Delete user with transaction
      await User.findByIdAndDelete(userId).session(session);

      // If everything succeeded, commit the transaction
      await session.commitTransaction();

      // Clear auth cookie
      res.clearCookie("jwtToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
      // If anything failed, rollback all database changes
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    next(error);
  }
};
