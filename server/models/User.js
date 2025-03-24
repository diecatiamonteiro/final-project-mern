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
    media: [{ url: { type: String }, platform: { type: String } }], // For artists & venues, YouTube, Spotify, SoundCloud LINKS only
    images: [{ type: String }], // Cloudinary URLs to store images
    socialLinks: [{ type: String }], // Social media and portfolio links

    // Mark own availability
    availability: [{ type: Date }], // Dates the user has marked as available in their calendar

    // Bookings
    bookingsReceived: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    ],
    bookingsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],

    // Favourites
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Pre-update middleware to hash password
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

export default model("User", UserSchema);
