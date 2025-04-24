/**
 * Returns the appropriate base URL for the application based on the environment
 * Used for email verification, password reset, and account update links
 * @returns {string} The base URL for the application
 */
export const getAppURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://the-greenroom.onrender.com";
  }
  // In development, use localhost
  return "http://localhost:5173";
};
