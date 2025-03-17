import { Schema, model } from "mongoose";

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

export default model("Booking", BookingSchema);
