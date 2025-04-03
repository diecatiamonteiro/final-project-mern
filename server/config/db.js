import mongoose from "mongoose";

export default function connectDB() {
  try {
    // Log a message when successfully connected to the database
    mongoose.connection.on("connected", () =>
      console.log(
        `Successfully connected to the database: ${mongoose.connection.name}`
      )
    );

    // Log an error message if there is a connection error
    mongoose.connection.on("error", (error) => console.log("DB Error", error));

    // Initiate the connection to the database using the URI from environment variables
    mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log("DB Error: ", error);
  }
}
