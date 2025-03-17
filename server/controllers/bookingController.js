import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

/**
 * @desc    Artist request a venue or venue requests an artist
 * @route   POST /api/bookings
 * @access  Private (logged in user)
 */

export const requestArtistOrVenue = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Get a specific booking
 * @route   GET /api/bookings/:id
 * @access  Private (logged in user)
 */

export const getSpecificBooking = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Edit booking date (only enabled until booking accepted)
 * @route   PATCH /api/bookings/:id/edit
 * @access  Private (logged in user)
 */

export const editBookingDate = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Accept booking request and notify other party
 * @route   PATCH /api/bookings/:id/accept
 * @access  Private (logged in user)
 */

export const acceptBooking = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Decline booking request and notify other party
 * @route   PATCH /api/bookings/:id/decline
 * @access  Private (logged in user)
 */

export const declineBooking = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Cancel accepted booking and notify other party
 * @route   PATCH /api/bookings/:id/cancel
 * @access  Private (logged in user)
 */

export const cancelBooking = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Get all accepted bookings
 * @route   GET /api/bookings/accepted
 * @access  Private (logged in user)
 */

export const getAllAcceptedBookings = async (req, res, next) => {
  try {
  } catch (error) {}
};
