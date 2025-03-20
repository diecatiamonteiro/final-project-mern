import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import axios from "axios";
import transporter from "../utils/emailConfig.js";
import { verificationEmail } from "../utils/emailTemplates.js";

/**
 * @desc   Generate JWT token and set it as an HTTP-only cookie
 * @param  {Object} user - The authenticated user object
 * @param  {Object} res - Express response object
 */
const tokenizeCookie = async (user, res) => {
  try {
    const { JWT_SECRET, JWT_EXP } = process.env;

    if (!JWT_SECRET || !JWT_EXP) {
      throw new Error("JWT configuration is missing");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXP,
    });

    res.cookie("jwtToken", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (error) {
    throw createError(500, "Error generating authentication token");
  }
};

/**
 * @desc    Generate a JWT token for email verification
 * @returns {String} - JWT token that expires in 24 hours
 */
const generateVerificationToken = () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "24h" });
  } catch (error) {
    throw createError(500, "Error generating verification token");
  }
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

    // Validate email format
    if (!validator.isEmail(email)) {
      throw createError(400, "Invalid email format");
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
      throw createError(
        400,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    // Sanitize inputs
    const sanitizedFirstName = validator.escape(firstName);
    const sanitizedLastName = validator.escape(lastName);
    const sanitizedEmail = validator.normalizeEmail(email);

    // Check if user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      throw createError(400, "User already exists");
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
      throw createError(400, "Missing verification information");
    }

    // Verify the token
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw createError(400, "Invalid or expired verification link");
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { isConfirmed: true },
      { new: true }
    );

    if (!user) {
      throw createError(404, "User not found");
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
      throw createError(400, "Email and password are required");
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      throw createError(400, "Invalid email format");
    }

    // Sanitize email
    const sanitizedEmail = validator.normalizeEmail(email);

    // Check if user exists (using sanitized email)
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      // Using a generic message for security
      throw createError(401, "Invalid credentials");
    }

    // Check email verification status
    if (!user.isConfirmed) {
      throw createError(401, "Please verify your email before logging in");
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Using a generic message for security
      throw createError(401, "Invalid credentials");
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
      throw createError(400, "Access token is required");
    }

    // Fetch user info from Google using the access token
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { email, given_name, family_name } = response.data;

    if (!email) {
      throw createError(400, "Failed to retrieve user email from Google");
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create random password and hash it
      const randomPassword = Math.random().toString(36).slice(-8); // Creates random 8-character string
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      // Create new user if they don't exist
      const newUser = new User({
        email,
        firstName: given_name,
        lastName: family_name,
        password: hashedPassword,
        isConfirmed: true, // Google accounts are pre-verified
        role: req.body.role, // Get role from frontend
      });

      user = await newUser.save();
    }

    // Set JWT token as cookie
    await tokenizeCookie(user, res);

    res.status(200).json({
      message: "Successfully logged in with Google",
      data: user,
    });
  } catch (error) {
    next(createError(500, "Error during Google authentication"));
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
    // Get user ID from checkToken middleware
    const userId = req.user.id;

    // Find user and exclude password from response
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw createError(404, "User not found");
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
