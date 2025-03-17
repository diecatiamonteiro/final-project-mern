import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

//! Display venues, artists, and their individual profiles ------------------------->

/**
 * @desc    Get all venues
 * @route   GET /api/users/venues
 * @access  Public (guest)
 */

export const getAllVenues = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Get all artists
 * @route   GET /api/users/artists
 * @access  Public (guest)
 */

export const getAllArtists = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Get specific artist/venue
 * @route   GET /api/users/:id
 * @access  Public (guest)
 */

export const getIndividualArtistOrVenue = async (req, res, next) => {
  try {
  } catch (error) {}
};

//! Update own profile and delete media links and images -------------------------->

/**
 * @desc    Update artist/venue profile
 * @route   PATCH /api/users/:id/update-profile
 * @access  Private (logged in user)
 */

export const updateProfile = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Delete individual media link
 * @route   DELETE /api/users/:id/delete-media/:mediaId
 * @access  Private (logged in user)
 */

export const deleteSingleMedia = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Delete individual image
 * @route   DELETE /api/users/:id/delete-image/:imageId
 * @access  Private (logged in user)
 */

export const deleteSingleImage = async (req, res, next) => {
  try {
  } catch (error) {}
};

//! Favourites ---------------------------------------------------------------------->

/**
 * @desc    Add artist/venue to favourites
 * @route   POST /api/users/favourites
 * @access  Private (logged in user)
 */

export const addFavourite = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Remove artist/venue from favourites
 * @route   DELETE /api/users/favourites/:id
 * @access  Private (logged in user)
 */

export const removeFavourite = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Get all favourited artists/venues
 * @route   GET /api/users/favourites
 * @access  Private (logged in user)
 */

export const getAllFavourites = async (req, res, next) => {
  try {
  } catch (error) {}
};

//! Bookings for display in user dashboard ------------------------------------------->

/**
 * @desc    Get all received & sent bookings of a user
 * @route   GET /api/users/:id/bookings
 * @access  Private (logged in user)
 */

export const getAllReceivedAndSentBookings = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Get only received bookings of a user
 * @route   GET /api/users/:id/bookings/received
 * @access  Private (logged in user)
 */

export const getAllReceivedBookings = async (req, res, next) => {
  try {
  } catch (error) {}
};

/**
 * @desc    Get only sent bookings of a user
 * @route   GET /api/users/:id/bookings/sent
 * @access  Private (logged in user)
 */

export const getAllSentBookings = async (req, res, next) => {
  try {
  } catch (error) {}
};

//! Search query for search bar / filtration ------------------------------------------>

/**
 * @desc    Search artists/venues by name, type & location
 * @route   GET /api/users/search?q=searchTerm
 * @access  Private (logged in user)
 */

export const searchForArtistOrVenue = async (req, res, next) => {
  try {
  } catch (error) {}
};
