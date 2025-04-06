import createError from "http-errors";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import transporter from "../utils/emailConfig.js";
import { userMessageEmail } from "../utils/emailTemplates.js";

/**
 * @desc    Send message via email form once booking has been accepted
 * @route   POST /api/email
 * @access  Private (logged in user)
 */

export const sendEmail = async (req, res, next) => {
  try {
    const { bookingId, message, subject } = req.body;
    const senderId = req.user.id; // From checkToken middleware

    // Validate input
    if (!bookingId || !message || !subject) {
      return next(createError(400, "Please provide all required fields"));
    }

    // Find the booking and check if it exists
    const booking = await Booking.findById(bookingId)
      .populate("initiatedBy", "email firstName lastName name")
      .populate("receivedBy", "email firstName lastName name");

    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    // Check if user is part of the booking
    if (
      booking.initiatedBy._id.toString() !== senderId &&
      booking.receivedBy._id.toString() !== senderId
    ) {
      return next(
        createError(403, "You can only send messages for your own bookings")
      );
    }

    // Check if booking is accepted
    if (booking.status !== "accepted") {
      return next(
        createError(400, "You can only send messages for accepted bookings")
      );
    }

    // Determine sender and receiver
    const sender =
      booking.initiatedBy._id.toString() === senderId
        ? booking.initiatedBy
        : booking.receivedBy;
    const receiver =
      booking.initiatedBy._id.toString() === senderId
        ? booking.receivedBy
        : booking.initiatedBy;

    // Send the email using template
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: sender.email, // Enables direct replies to other party
      to: receiver.email,
      subject: `The Greenroom - ${subject}`,
      html: userMessageEmail(
        sender.name || `${sender.firstName} ${sender.lastName}`,
        receiver.name || `${receiver.firstName} ${receiver.lastName}`,
        booking.performanceDate,
        subject,
        message
      ),
    });

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
