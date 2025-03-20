// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";
// import createError from "http-errors";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "greenroom",
//     allowed_formats: ["jpg", "jpeg", "png", "gif"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//   },
// });

// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(createError(400, "Only image files are allowed"));
//     }
//     cb(null, true);
//   },
// }).fields([
//   { name: "profilePicture", maxCount: 1 },
//   { name: "images", maxCount: 5 },
// ]);
