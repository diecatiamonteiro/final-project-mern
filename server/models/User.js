import { Schema, model } from "mongoose";

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
        "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1700000000/default-avatar.png",
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

export default model("User", UserSchema);
