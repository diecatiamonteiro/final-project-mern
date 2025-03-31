import { useState, useRef } from "react";
import axios from "axios";

// ProfilePictureUpload component - for profile pictures
export function ProfilePictureUpload({ currentImage, onImageUpload }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "The Greenroom";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const cloudinaryAxios = axios.create();
      const response = await cloudinaryAxios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false,
        }
      );

      onImageUpload(response.data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        id="profile-upload"
      />
      <label
        htmlFor="profile-upload"
        className="cursor-pointer block relative group"
      >
        <div className="w-48 h-48 rounded-full overflow-hidden relative">
          <img
            src={currentImage || "default-avatar.png"}
            alt="Profile"
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              uploading ? "opacity-60" : "opacity-100"
            }`}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Edit icon overlay - only show when not uploading */}
        {!uploading && (
          <div className="absolute bottom-0 right-0 bg-green rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-greenHover">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
        )}
      </label>
    </div>
  );
}

// GalleryUpload component - for gallery images
export function GalleryUpload({ onImageUpload, className = "" }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "The Greenroom";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const cloudinaryAxios = axios.create();
      const response = await cloudinaryAxios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false,
        }
      );

      onImageUpload(response.data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        id="gallery-upload"
      />
      <label
        htmlFor="gallery-upload"
        className={`inline-flex items-center space-x-2 cursor-pointer bg-transparent text-green border border-green px-4 py-2 rounded-lg hover:bg-green/10 disabled:bg-gray-400 ${className}`}
      >
        {uploading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Photo</span>
          </>
        )}
      </label>
    </div>
  );
}
