import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

//! User Schema contains auth and profile data together

const UserSchema = new Schema(
  {
    // Registration
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["artist", "venue"], required: true }, // Defines account type
    isConfirmed: { type: Boolean, default: false }, // Email verification

    // Profile
    name: { type: String }, // artisticName for artists & venue name for venues
    description: { type: String }, // Bio for artists & description for venues
    type: [{ type: String }], // Performance type for artists & venue type for venues

    //additionalInfo for venue or artist only:
    additionalInfo: {
      // Venue only:
      address: {
        streetName: { type: String },
        number: { type: String },
        zipCode: { type: String },
        city: { type: String },
      },
      revenueSplit: { type: String },
      openingTimes: [{ type: String }],
      performingTimes: [{ type: String }],
      // Artist only:
      genre: [{ type: String }],
    },

    // Media
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dtlnz58z5/image/upload/v1742665279/icon-7797704_1280_lifkba.webp",
    }, // Default Cloudinary image
    media: [{ url: { type: String }, platform: { type: String } }], // YouTube for artists & venues. Spotify and SoundCloud for artists only
    images: [{ type: String }], // Cloudinary URLs to store images
    socialLinks: [{ type: String }], // Social media and portfolio links

    // Mark own availability
    availability: [{ type: Date }], // Dates the user has marked as available in their availability calendar

    // Bookings
    bookingsReceived: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    ],
    bookingsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],

    // Favourites
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Temporary email fields
    tempEmail: String,
    emailVerificationToken: String,
    emailVerificationExpires: Date
  },
  { timestamps: true }
);

// ----------------------------------------------------------------------

// Pre-update middleware for password updates
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data when converting to JSON
UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// Remove past availability from array
UserSchema.methods.cleanupPastAvailability = async function () {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59, 999); // End of previous day

  // Filter out dates that are before yesterday
  this.availability = this.availability.filter(
    (date) => new Date(date) > yesterday
  );

  return await this.save();
};

export default model("User", UserSchema);
