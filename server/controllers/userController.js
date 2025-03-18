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
    // Find all users with role "venue" and exclude password field
    const venues = await User.find({ role: "venue" }).select("-password");

    if (!venues || venues.length === 0) {
      throw createError(404, "No venues found");
    }

    res.status(200).json({
      message: "Venues retrieved successfully",
      count: venues.length,
      data: venues,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all artists
 * @route   GET /api/users/artists
 * @access  Public (guest)
 */

export const getAllArtists = async (req, res, next) => {
  try {
    // Find all users with role "artist" and exclude password field
    const artists = await User.find({ role: "artist" }).select("-password");

    if (!artists || artists.length === 0) {
      throw createError(404, "No artists found");
    }

    res.status(200).json({
      message: "Artists retrieved successfully",
      count: artists.length,
      data: artists,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get specific artist/venue
 * @route   GET /api/users/:id
 * @access  Public (guest)
 */

export const getIndividualArtistOrVenue = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find user by ID and exclude password
    const user = await User.findById(id).select("-password").populate({
      path: "favourites",
      select: "-password", // Exclude password from populated favourites
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid user ID format"));
    }
    next(error);
  }
};

//! Update own profile and delete media links and images -------------------------->

/**
 * @desc    Update artist/venue profile
 * @route   PATCH /api/users/:id/update-profile
 * @access  Private (logged in user)
 */

export const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // From checkToken middleware

    // Check if user is updating their own profile
    if (id !== userId) {
      throw createError(403, "You can only update your own profile");
    }

    // Get update data from request body
    const {
      name,
      description,
      type,
      additionalInfo,
      profilePicture,
      media,
      images,
      socialLinks,
      availability,
    } = req.body;

    // Find user and update with new data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
          type,
          additionalInfo,
          profilePicture,
          media,
          images,
          socialLinks,
          availability,
        }, // $set updates the specified fields
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete individual media link
 * @route   DELETE /api/users/:id/delete-media/:mediaId
 * @access  Private (logged in user)
 */

export const deleteSingleMedia = async (req, res, next) => {
  try {
    const { id, mediaId } = req.params;
    const userId = req.user.id; // From checkToken middleware

    // Check if user is deleting from their own profile
    if (id !== userId) {
      throw createError(403, "You can only delete media from your own profile");
    }

    // Find user and remove the specific media item
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $pull: { media: { _id: mediaId } }, // $pull removes the specified value
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Media deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
};

/**
 * @desc    Delete individual image
 * @route   DELETE /api/users/:id/delete-image/:imageId
 * @access  Private (logged in user)
 */

export const deleteSingleImage = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;
    const userId = req.user.id; // From checkToken middleware

    // Check if user is deleting from their own profile
    if (id !== userId) {
      throw createError(
        403,
        "You can only delete images from your own profile"
      );
    }

    // Find user and remove the specific image
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $pull: { images: imageId }, // $pull removes the specified value
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Image deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
};

//! Favourites ---------------------------------------------------------------------->

/**
 * @desc    Add artist/venue to favourites
 * @route   POST /api/users/favourites
 * @access  Private (logged in user)
 */

export const addFavourite = async (req, res, next) => {
  try {
    const userId = req.user.id; // From checkToken middleware
    const { favouriteId } = req.body; // ID of user to be favourited

    // Check if trying to favourite self
    if (userId === favouriteId) {
      throw createError(400, "You cannot add yourself to favourites");
    }

    // Check if user to be favourited exists
    const favouriteUser = await User.findById(favouriteId);
    if (!favouriteUser) {
      throw createError(404, "User to be favourited not found");
    }

    // Add to favourites array if not already there
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favourites: favouriteId }, // $addToSet prevents duplicates
      },
      { new: true, runValidators: true }
    )
      .select("-password")
      .populate({
        path: "favourites",
        select: "-password", // Exclude password from populated favourites
      });

    res.status(200).json({
      message: "Added to favourites successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
};

/**
 * @desc    Remove artist/venue from favourites
 * @route   DELETE /api/users/favourites/:id
 * @access  Private (logged in user)
 */

export const removeFavourite = async (req, res, next) => {
  try {
    const userId = req.user.id; // From checkToken middleware
    const { id: favouriteId } = req.params; // ID of user to be removed from favourites

    // Check if user to be unfavorited exists
    const favouriteUser = await User.findById(favouriteId);
    if (!favouriteUser) {
      throw createError(404, "User to be unfavorited not found");
    }

    // Find user and remove from favourites array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favourites: favouriteId }, // $pull removes the specified value
      },
      { new: true, runValidators: true }
    )
      .select("-password")
      .populate({
        path: "favourites",
        select: "-password", // Exclude password from populated favourites
      });

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Removed from favourites successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
};

/**
 * @desc    Get all favourited artists/venues
 * @route   GET /api/users/favourites
 * @access  Private (logged in user)
 */

export const getAllFavourites = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("favourites").populate({
      path: "favourites",
      select: "-password -bookingsReceived -bookingsSent", // Only exclude sensitive data
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Favourites retrieved successfully",
      count: user.favourites.length,
      data: user.favourites,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
};

//! Bookings for display in user dashboard ------------------------------------------->

/**
 * @desc    Get all received & sent bookings of a user
 * @route   GET /api/users/:id/bookings
 * @access  Private (logged in user)
 */

export const getAllReceivedAndSentBookings = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("bookingsReceived bookingsSent")
      .populate([
        {
          path: "bookingsReceived",
          match: { isCancelledOrDeclined: false },
          populate: {
            path: "initiatedBy receivedBy",
            select: "-password -bookingsReceived -bookingsSent",
          },
        },
        {
          path: "bookingsSent",
          match: { isCancelledOrDeclined: false },
          populate: {
            path: "initiatedBy receivedBy",
            select: "-password -bookingsReceived -bookingsSent",
          },
        },
      ]);

    if (!user) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Sent and received bookings retrieved successfully",
      data: {
        received: {
          count: user.bookingsReceived.length,
          bookings: user.bookingsReceived,
        },
        sent: {
          count: user.bookingsSent.length,
          bookings: user.bookingsSent,
        },
      },
    });
  } catch (error) {
    if (error.kind === "ObjectID") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
};

/**
 * @desc    Get only received bookings of a user
 * @route   GET /api/users/:id/bookings/received
 * @access  Private (logged in user)
 */

export const getAllReceivedBookings = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("bookingsReceived")
      .populate({
        path: "bookingsReceived",
        match: { isCancelledOrDeclined: false },
        populate: {
          path: "initiatedBy receivedBy",
          select: "-password -bookingsReceived -bookingsSent",
        },
      });

    if (!user) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Received bookings retrieved successfully",
      count: user.bookingsReceived.length,
      data: user.bookingsReceived,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
};

/**
 * @desc    Get only sent bookings of a user
 * @route   GET /api/users/:id/bookings/sent
 * @access  Private (logged in user)
 */

export const getAllSentBookings = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("bookingsSent")
      .populate({
        path: "bookingsSent",
        match: { isCancelledOrDeclined: false },
        populate: {
          path: "initiatedBy receivedBy",
          select: "-password -bookingsReceived -bookingsSent",
        },
      });

    if (!user) {
      throw createError(404, "User not found");
    }

    res.status(200).json({
      message: "Sent bookings retrieved successfully",
      count: user.bookingsSent.length,
      data: user.bookingsSent,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid ID format"));
    }
    next(error);
  }
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
