import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public (guest)
 */

export const register = async (req, res, next) => {
  try {
  } catch (error) {}
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
  } catch (error) {}
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
  } catch (error) {}
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
  } catch (error) {}
};

/**
 * @desc    Change password
 * @route   PATCH /api/auth/change-password
 * @access  Private (logged in user)
 */

export const changePassword = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Delete user account and all related data
 * @route   DELETE /api/auth/delete-account
 * @access  Private (logged in user)
 */

export const deleteAccount = async (req, res, next) => {
  try {
  } catch (error) {}
};
