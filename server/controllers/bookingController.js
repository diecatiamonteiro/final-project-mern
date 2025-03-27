import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import transporter from "../utils/emailConfig.js";
import {
  bookingRequestEmail,
  bookingAcceptanceEmail,
  bookingDateUpdateEmail,
  bookingDeclineEmail,
  bookingCancelEmail,
} from "../utils/emailTemplates.js";

/**
 * @desc    Artist request a venue or venue requests an artist
 * @route   POST /api/bookings
 * @access  Private (logged in user)
 */

export const requestArtistOrVenue = async (req, res, next) => {
  try {
    const { receivedBy, performanceDate } = req.body;
    const senderId = req.user.id; // From checkToken middleware

    console.log(req.body);

    // Validate input
    if (!receivedBy || !performanceDate) {
      return next(createError(400, "Please provide all required fields"));
    }

    // Check if date is in the future
    const bookingDate = new Date(performanceDate);
    if (bookingDate < new Date()) {
      return next(createError(400, "Performance date must be in the future"));
    }

    // Get both users
    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receivedBy),
    ]);

    // Validate users exist
    if (!sender || !receiver) {
      return next(createError(404, "User not found"));
    }

    // Check if sender and receiver have different roles (artist/venue)
    if (sender.role === receiver.role) {
      return next(
        createError(400, "Artists can only book venues and vice versa")
      );
    }

    // Check if booking already exists for this date and users
    const existingBooking = await Booking.findOne({
      $or: [
        { initiatedBy: senderId, receivedBy },
        { initiatedBy: receivedBy, receivedBy: senderId },
      ],
      performanceDate: bookingDate,
      isCancelledOrDeclined: false,
    });

    if (existingBooking) {
      return next(
        createError(
          400,
          "A booking already exists for this date between these users"
        )
      );
    }

    // Create new booking
    const newBooking = await Booking.create({
      initiatedBy: senderId,
      receivedBy,
      performanceDate: bookingDate,
    });

    // Update users' booking arrays
    await Promise.all([
      User.findByIdAndUpdate(senderId, {
        $push: { bookingsSent: newBooking._id },
      }),
      User.findByIdAndUpdate(receivedBy, {
        $push: { bookingsReceived: newBooking._id },
      }),
    ]);

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiver.email,
      subject: "New Booking Request - The Greenroom",
      html: bookingRequestEmail(
        sender.name || `${sender.firstName} ${sender.lastName}`,
        receiver.name || `${receiver.firstName} ${receiver.lastName}`,
        performanceDate
      ),
    });

    // Return populated booking
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("initiatedBy")
      .populate("receivedBy");

    res.status(201).json({
      message: "Booking request sent successfully",
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a specific booking
 * @route   GET /api/bookings/:id
 * @access  Private (logged in user)
 */

export const getSpecificBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // From checkToken middleware

    // Find booking and populate user details
    const booking = await Booking.findById(id)
      .populate("initiatedBy")
      .populate("receivedBy");

    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    // Check if user is part of the booking
    if (
      booking.initiatedBy._id.toString() !== userId &&
      booking.receivedBy._id.toString() !== userId
    ) {
      return next(
        createError(403, "Access denied. You are not part of this booking")
      );
    }

    res.status(200).json({
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(createError(400, "Invalid booking ID format"));
    }
    next(error);
  }
};

/**
 * @desc    Edit booking date (only enabled until booking accepted)
 * @route   PATCH /api/bookings/:id/edit
 * @access  Private (logged in user)
 */

export const editBookingDate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { performanceDate } = req.body;
    const userId = req.user.id; // From checkToken middleware

    // Validate input
    if (!performanceDate) {
      return next(createError(400, "Please provide a new performance date"));
    }

    // Check if date is in the future
    const newBookingDate = new Date(performanceDate);
    if (newBookingDate < new Date()) {
      return next(createError(400, "Performance date must be in the future"));
    }

    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    // Check if user is the initiator of the booking
    if (booking.initiatedBy.toString() !== userId) {
      return next(
        createError(403, "Only the booking initiator can edit the request")
      );
    }

    // Check if booking is still pending
    if (booking.status !== "pending") {
      return next(createError(400, "Only pending bookings can be edited"));
    }

    // Check if new date is already booked
    const existingBooking = await Booking.findOne({
      $or: [
        { initiatedBy: booking.initiatedBy, receivedBy: booking.receivedBy },
        { initiatedBy: booking.receivedBy, receivedBy: booking.initiatedBy },
      ],
      performanceDate: newBookingDate,
      _id: { $ne: id }, // Exclude current booking
      isCancelledOrDeclined: false,
    });

    if (existingBooking) {
      return next(
        createError(
          400,
          "A booking already exists for this date between these users"
        )
      );
    }

    // Update booking date
    booking.performanceDate = newBookingDate;
    booking.statusUpdatedAt = new Date();
    await booking.save();

    // Get users for email notification
    const [initiator, receiver] = await Promise.all([
      User.findById(booking.initiatedBy),
      User.findById(booking.receivedBy),
    ]);

    // Send email notification about the date change
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiver.email,
      subject: "Booking Date Updated - The Greenroom",
      html: bookingDateUpdateEmail(
        initiator.name || `${initiator.firstName} ${initiator.lastName}`,
        receiver.name || `${receiver.firstName} ${receiver.lastName}`,
        newBookingDate
      ),
    });

    // Return populated booking
    const populatedBooking = await Booking.findById(id)
      .populate("initiatedBy")
      .populate("receivedBy");

    res.status(200).json({
      message: "Booking date updated successfully",
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Accept booking request and notify other party
 * @route   PATCH /api/bookings/:id/accept
 * @access  Private (logged in user)
 */

export const acceptBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // From checkToken middleware

    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    // Check if user is the receiver of the booking
    if (booking.receivedBy.toString() !== userId) {
      return next(
        createError(403, "Only the booking receiver can accept the request")
      );
    }

    // Check if booking is still pending
    if (booking.status !== "pending") {
      return next(createError(400, "This booking is no longer pending"));
    }

    // Update booking status
    booking.status = "accepted";
    booking.statusUpdatedAt = new Date();
    await booking.save();

    // Get users for email notification
    const [initiator, receiver] = await Promise.all([
      User.findById(booking.initiatedBy),
      User.findById(booking.receivedBy),
    ]);

    // Send email notification to the initiator
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: initiator.email,
      subject: "Booking Accepted - The Greenroom",
      html: bookingAcceptanceEmail({
        performanceDate: booking.performanceDate,
        venueName: receiver.role === "venue" ? receiver.name : initiator.name,
        artistName: receiver.role === "artist" ? receiver.name : initiator.name,
      }),
    });

    // Return populated booking
    const populatedBooking = await Booking.findById(id)
      .populate("initiatedBy")
      .populate("receivedBy");

    res.status(200).json({
      message: "Booking accepted successfully",
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Decline booking request and notify other party
 * @route   PATCH /api/bookings/:id/decline
 * @access  Private (logged in user)
 */

export const declineBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // From checkToken middleware

    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    // Check if user is the receiver of the booking
    if (booking.receivedBy.toString() !== userId) {
      return next(
        createError(403, "Only the booking receiver can decline the request")
      );
    }

    // Check if booking is still pending
    if (booking.status !== "pending") {
      return next(createError(400, "This booking is no longer pending"));
    }

    // Update booking status and soft delete
    booking.status = "declined";
    booking.isCancelledOrDeclined = true;
    booking.statusUpdatedAt = new Date();
    await booking.save();

    // Get users for email notification
    const [initiator, receiver] = await Promise.all([
      User.findById(booking.initiatedBy),
      User.findById(booking.receivedBy),
    ]);

    // Send email notification to the initiator
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: initiator.email,
      subject: "Booking Declined - The Greenroom",
      html: bookingDeclineEmail(
        receiver.name || `${receiver.firstName} ${receiver.lastName}`,
        initiator.name || `${initiator.firstName} ${initiator.lastName}`,
        booking.performanceDate
      ),
    });

    // Return populated booking
    const populatedBooking = await Booking.findById(id)
      .populate("initiatedBy")
      .populate("receivedBy");

    res.status(200).json({
      message: "Booking declined successfully",
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel accepted booking and notify other party
 * @route   PATCH /api/bookings/:id/cancel
 * @access  Private (logged in user)
 */

export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // From checkToken middleware

    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    // Check if user is part of the booking
    if (
      booking.initiatedBy.toString() !== userId &&
      booking.receivedBy.toString() !== userId
    ) {
      return next(
        createError(403, "Access denied. You are not part of this booking")
      );
    }

    // Check if booking is accepted (can only cancel accepted bookings)
    if (booking.status !== "accepted") {
      return next(createError(400, "Only accepted bookings can be cancelled"));
    }

    // Update booking status and soft delete
    booking.status = "cancelled";
    booking.isCancelledOrDeclined = true;
    booking.statusUpdatedAt = new Date();
    await booking.save();

    // Get users for email notification
    const [initiator, receiver] = await Promise.all([
      User.findById(booking.initiatedBy),
      User.findById(booking.receivedBy),
    ]);

    // Determine who cancelled and who receives the notification
    const canceller =
      userId === initiator._id.toString() ? initiator : receiver;
    const notifyUser =
      userId === initiator._id.toString() ? receiver : initiator;

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: notifyUser.email,
      subject: "Booking Cancelled - The Greenroom",
      html: bookingCancelEmail(
        canceller.name || `${canceller.firstName} ${canceller.lastName}`,
        notifyUser.name || `${notifyUser.firstName} ${notifyUser.lastName}`,
        booking.performanceDate
      ),
    });

    // Return populated booking
    const populatedBooking = await Booking.findById(id)
      .populate("initiatedBy")
      .populate("receivedBy");

    res.status(200).json({
      message: "Booking cancelled successfully",
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all accepted bookings
 * @route   GET /api/bookings/accepted
 * @access  Private (logged in user)
 */

export const getAllAcceptedBookings = async (req, res, next) => {
  try {
    const userId = req.user.id; // From checkToken middleware

    // Find all accepted bookings where user is either initiator or receiver
    const acceptedBookings = await Booking.find({
      $and: [
        // User must be part of the booking
        {
          $or: [{ initiatedBy: userId }, { receivedBy: userId }],
        },
        // Booking must be accepted and not cancelled
        {
          status: "accepted",
          isCancelledOrDeclined: false,
        },
      ],
    })
      .populate("initiatedBy")
      .populate("receivedBy")
      .sort({ performanceDate: 1 }); // Sort by date ascending

    res.status(200).json({
      message: "Accepted bookings retrieved successfully",
      count: acceptedBookings.length,
      data: acceptedBookings,
    });
  } catch (error) {
    next(error);
  }
};
