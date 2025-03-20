import express from "express";
import checkToken from "../middleware/checkToken.js";

import {
  requestArtistOrVenue,
  getSpecificBooking,
  editBookingDate,
  acceptBooking,
  declineBooking,
  cancelBooking,
  getAllAcceptedBookings,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter
  .post("/", checkToken, requestArtistOrVenue)
  .get("/accepted", checkToken, getAllAcceptedBookings)
  .get("/:id", checkToken, getSpecificBooking)
  .patch("/:id/edit", checkToken, editBookingDate)
  .patch("/:id/accept", checkToken, acceptBooking)
  .patch("/:id/decline", checkToken, declineBooking)
  .patch("/:id/cancel", checkToken, cancelBooking);

export default bookingRouter;
