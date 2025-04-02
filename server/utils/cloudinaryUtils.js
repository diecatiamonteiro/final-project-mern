import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadLogo = async () => {
  try {
    // Path to your logo in the public folder
    const logoPath = path.join(__dirname, '../../client/public/logo.png');
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(logoPath, {
      folder: "thegreenroom",
      public_id: "email-logo", // This will make the URL consistent
      overwrite: true // This will replace any existing file with the same public_id
    });

    console.log('Logo uploaded successfully!');
  } catch (error) {
    console.error('Error uploading logo:', error);
  }
};

uploadLogo();

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
