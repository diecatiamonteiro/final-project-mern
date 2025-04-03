import express from "express";
import checkToken from "../middleware/checkToken.js";

import {
  register,
  verifyEmail,
  login,
  googleLogin,
  logout,
  getUserData,
  updateAccount,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter
  .post("/register", register)
  .get("/verify-email", verifyEmail)
  .post("/login", login)
  .post("/login/google", googleLogin)
  .get("/logout", checkToken, logout)
  .get("/user-data", checkToken, getUserData)
  .patch("/update-account", checkToken, updateAccount)
  .patch("/change-password", checkToken, changePassword)
  .delete("/delete-account", checkToken, deleteAccount)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword);

export default authRouter;
