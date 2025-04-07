import express from "express";

import checkToken from "../middleware/checkToken.js";

import {
  getAllVenues,
  getAllArtists,
  getIndividualArtistOrVenue,
  updateProfile,
  deleteSingleMedia,
  deleteSingleImage,
  addFavourite,
  removeFavourite,
  getAllFavourites,
  getAllReceivedAndSentBookings,
  getAllReceivedBookings,
  getAllSentBookings,
  searchForArtistOrVenue,
} from "../controllers/userController.js";
import {
  checkMediaLinks,
  checkSocialLinks,
} from "../middleware/checkUploads.js";

const userRouter = express.Router();

userRouter
  // Static routes first. Display venues/artists. Get, add and remove favourites. Search function.
  .get("/venues", getAllVenues)
  .get("/artists", getAllArtists)
  .get("/search", searchForArtistOrVenue)
  .get("/favourites", checkToken, getAllFavourites)
  .post("/favourites", checkToken, addFavourite)
  .delete("/favourites/:id", checkToken, removeFavourite)
  .get("/:id", getIndividualArtistOrVenue);

// Update own profile and delete media links and images
userRouter
  .patch(
    "/:id/update-profile",
    checkToken,
    checkMediaLinks,
    checkSocialLinks,
    updateProfile
  )
  .delete("/:id/delete-media/:mediaId", checkToken, deleteSingleMedia)
  .delete("/:id/delete-image/:imageId", checkToken, deleteSingleImage);

// Bookings for display in user dashboard
userRouter
  .get("/:id/bookings", checkToken, getAllReceivedAndSentBookings)
  .get("/:id/bookings/received", checkToken, getAllReceivedBookings)
  .get("/:id/bookings/sent", checkToken, getAllSentBookings);

export default userRouter;
