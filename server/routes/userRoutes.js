import express from "express";
import multer from "multer";

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
  checkImages,
  checkMediaLinks,
  checkSocialLinks,
} from "../middleware/checkUploads.js";
// import { upload } from "../middleware/uploadMiddleware.js";

const upload = multer({ dest: "uploads/" });

const userRouter = express.Router();

userRouter
  // Static routes first. Display venues/artists. Get, add and remove favourites. Search function.
  .get("/venues", getAllVenues)
  .get("/artists", getAllArtists)
  .get("/search", checkToken, searchForArtistOrVenue)
  .get("/favourites", checkToken, getAllFavourites)
  .post("/favourites", checkToken, addFavourite)
  .delete("/favourites/:id", checkToken, removeFavourite)
  .get("/:id", getIndividualArtistOrVenue);

// Update own profile and delete media links and images
userRouter
  .patch(
    "/:id/update-profile",
    // checkToken,
    // upload,
    // checkMediaLinks,
    // checkImages,
    // checkSocialLinks,
    upload.single("image"),
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
