import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const BookingSchema = new Schema(
  {
    // Venue or artist who makes the request booking
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Venue or artist who receives the request booking
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    performanceDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "cancelled"],
      default: "pending",
    },
    statusUpdatedAt: { type: Date, default: Date.now },
    isCancelledOrDeclined: { type: Boolean, default: false }, // Soft deleted from DB (not deleted from DB but does not appear in the FE)
  },
  { timestamps: true }
);

// Add this static method to handle multiple bookings
BookingSchema.statics.cleanupAllPastBookings = async function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await this.updateMany(
    {
      performanceDate: { $lt: today },
      isCancelledOrDeclined: false,
    },
    {
      $set: { isCancelledOrDeclined: true },
    }
  );
};

export default model("Booking", BookingSchema);
