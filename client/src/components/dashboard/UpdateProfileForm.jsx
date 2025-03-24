import { useState } from "react";
import axios from "axios";
import { ProfilePictureUpload, GalleryUpload } from "./UploadImage";

export default function UpdateProfileForm({ user = {}, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    description: user?.description || "",
    type: user?.type || "",
    additionalInfo: user?.additionalInfo || {},
    profilePicture: user?.profilePicture || "",
    media: user?.media || [],
    images: user?.images || [],
    socialLinks: user?.socialLinks || {},
    availability: user?.availability || [],
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Handler for profile picture upload
  const handleProfilePicture = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: imageUrl,
    }));
    setHasUnsavedChanges(true);
  };

  // Handler for gallery images
  const handleGalleryImage = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl].slice(0, 10), // Keep max 10 images
    }));
    setHasUnsavedChanges(true);
  };

  // Handler for removing images
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setHasUnsavedChanges(true);
  };

  // Handler for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasUnsavedChanges(true);
  };

  // Handler for social links
  const handleSocialLink = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  // Handler for media links
  const handleMediaLink = (e, platform) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      media: [
        ...prev.media.filter((m) => m.platform !== platform),
        ...(value ? [{ url: value, platform }] : []),
      ],
    }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/users/${user._id}/update-profile`,
        formData,
        { withCredentials: true }
      );

      setStatus({ loading: false, error: null, success: true });
      setHasUnsavedChanges(false);
      console.log("Profile updated:", response.data);

      // Call the onUpdate callback to refresh parent component
      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.message || "Failed to update profile",
        success: false,
      });
      console.error("Update error:", error);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header Section */}
        <div className="flex items-start space-x-8 mb-12">
          <div className="flex-shrink-0">
            <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
            <ProfilePictureUpload
              currentImage={formData.profilePicture}
              onImageUpload={handleProfilePicture}
            />
          </div>

          {/* Basic Info next to profile picture */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 border rounded-lg h-32"
              />
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery Images */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Gallery Images</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                {formData.images.length < 10 && (
                  <div className="flex items-center justify-center aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <GalleryUpload onImageUpload={handleGalleryImage} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Media Links</h3>
            <div className="space-y-4">
              {["YouTube", "Spotify", "SoundCloud"].map((platform) => (
                <div key={platform} className="flex items-center space-x-3">
                  <div className="w-24 flex-shrink-0 text-gray-600">
                    {platform}:
                  </div>
                  <input
                    type="url"
                    value={
                      formData.media.find((m) => m.platform === platform)
                        ?.url || ""
                    }
                    onChange={(e) => handleMediaLink(e, platform)}
                    placeholder={`${platform} URL`}
                    className="flex-grow p-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Update Button */}
        <div className="sticky bottom-0 bg-white p-4 shadow-lg mt-8 -mx-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {hasUnsavedChanges && (
              <span className="text-amber-600">
                ⚠️ You have unsaved changes
              </span>
            )}
            <button
              type="submit"
              disabled={status.loading || !hasUnsavedChanges}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {status.loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
