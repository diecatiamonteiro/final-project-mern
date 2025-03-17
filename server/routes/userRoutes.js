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

const userRouter = express.Router();

// Display venues, artists, and their individual profiles
userRouter
  .get("/venues", getAllVenues)
  .get("/artists", getAllArtists)
  .get("/:id", getIndividualArtistOrVenue);

// Update own profile and delete media links and images
userRouter
  .patch("/:id/update-profile", checkToken, updateProfile)
  .delete("/:id/delete-media/:mediaId", checkToken, deleteSingleMedia)
  .delete("/:id/delete-image/:imageId", checkToken, deleteSingleImage);

// Favourites
userRouter
  .post("/favourites", checkToken, addFavourite)
  .delete("/favourites/:id", checkToken, removeFavourite)
  .get("/favourites", checkToken, getAllFavourites);

// Bookings for display in user dashboard
userRouter
  .get("/:id/bookings", checkToken, getAllReceivedAndSentBookings)
  .get("/:id/bookings/received", checkToken, getAllReceivedBookings)
  .get("/:id/bookings/sent", checkToken, getAllSentBookings);

// Search query for search bar / filtration
userRouter.get("/search?q=searchTerm", checkToken, searchForArtistOrVenue);

export default userRouter;
