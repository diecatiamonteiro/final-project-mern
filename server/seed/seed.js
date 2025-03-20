import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { artists } from "./seed/artistsSeed.js";
import { venues } from "./seed/venuesSeed.js";
import bcrypt from "bcrypt";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Clear existing data
    await User.deleteMany({});
    console.log("Cleared existing users...");

    // Hash a common password for all seed users
    const password = "123456";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the users with hashed password and confirmed status
    const preparedArtists = artists.map((artist) => ({
      ...artist,
      password: hashedPassword,
      isConfirmed: true,
    }));

    const preparedVenues = venues.map((venue) => ({
      ...venue,
      password: hashedPassword,
      isConfirmed: true,
    }));

    // Insert the data
    await User.insertMany(preparedArtists);
    console.log(`${preparedArtists.length} artists seeded successfully!`);

    await User.insertMany(preparedVenues);
    console.log(`${preparedVenues.length} venues seeded successfully!`);

    console.log("All data seeded successfully!");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
