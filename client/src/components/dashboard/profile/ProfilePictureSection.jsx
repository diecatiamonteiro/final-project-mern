import React from "react";
import { ProfilePictureUpload } from "./UploadImage";

export default function ProfilePictureSection({
  formData,
  handleProfilePicture,
}) {
  return (
    <div className="flex-shrink-0 mb-8 md:mb-0 flex flex-col items-center md:items-start">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
        Profile Picture
      </h3>
      <ProfilePictureUpload
        currentImage={formData.profilePicture}
        onImageUpload={handleProfilePicture}
      />
    </div>
  );
}
