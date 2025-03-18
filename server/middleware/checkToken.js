import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.js";

/**
 * @desc  Validates user identity and ensures that only authenticated users can access protected routes
 */

const checkToken = async (req, res, next) => {
  try {
    // Extract token from cookies
    const jwtToken = req.cookies.jwtToken;
    console.log("JWT Token:", jwtToken);

    if (!jwtToken) {
      throw createError(401, "Unauthorized request - No token");
    }

    // Verify and decode the token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Find the user based on decoded token ID
    const user = await User.findById(decoded.id);
    console.log("Found user:", user);

    if (!user) {
      throw createError(401, "User no longer exists");
    }

    // Attach user data to request object
    req.user = user;
    req.isAuthenticated = true;

    next();
  } catch (error) {
    console.error("Error in checkToken:", error);
    next(error);
  }
};

export default checkToken;
