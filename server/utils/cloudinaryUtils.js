import cloudinary from "../config/cloudinary.js";

export const deleteFromCloudinary = async (imageUrl) => {
  try {
    // Extract public_id from the URL
    const publicId = imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};
