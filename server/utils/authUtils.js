import jwt from "jsonwebtoken";
import createError from "http-errors";

/**
 * @desc   Generate JWT token and set it as an HTTP-only cookie
 * @param  {Object} user - The authenticated user object
 * @param  {Object} res - Express response object
 */
export const tokenizeCookie = async (user, res) => {
  try {
    const { JWT_SECRET, JWT_EXP } = process.env;

    if (!JWT_SECRET || !JWT_EXP) {
      throw new Error("JWT configuration is missing");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXP,
    });

    res.cookie("jwtToken", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  } catch (error) {
    return next(createError(500, "Error generating authentication token"));
  }
};

/**
 * @desc    Generate a JWT token for email verification
 * @returns {String} - JWT token that expires in 24 hours
 */
export const generateVerificationToken = () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "24h" });
  } catch (error) {
    return next(createError(500, "Error generating verification token"));
  }
};
