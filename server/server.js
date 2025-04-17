import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import {
  globalErrorHandler,
  routeNotFound,
} from "./middleware/errorHandler.js";
import path from 'path';
import { fileURLToPath } from 'url';
// Connect to the database
await connectDB();

// Initialise Express application
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, 'client/dist')));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/email", emailRouter);

// Add this before the catch-all route
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

// Modified catch-all route with logging
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client/dist', '/index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// Error handling middleware
app.use(routeNotFound);
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
