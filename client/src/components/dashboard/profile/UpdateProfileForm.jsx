import { useState, useContext } from "react";
import axios from "axios";
import { ProfilePictureUpload, GalleryUpload } from "./UploadImage";
import AvailabilityCalendar from "../../calendars/AvailabilityCalendar";
import { DataContext } from "../../../contexts/Context";
import Modal from "../../Modal";
import Button from "../../Button";
import { toast } from "react-toastify";
import { updateProfile } from "../../../api/usersApi";

// Update these constants to include all existing options
const ARTIST_PERFORMANCE_TYPES = [
  "Band",
  "Duo",
  "Solo Artist",
  "Singer-Songwriter",
  "Rapper",
  "DJ",
  "Orchestra",
  "Ensemble",
];

const ARTIST_GENRES = [
  "Rock",
  "Pop",
  "Jazz",
  "Classical",
  "Electronic",
  "Hip Hop",
  "R&B",
  "Folk",
  "Folk Rock",
  "Country",
  "Blues",
  "Dream Pop",
  "Disco",
  "Metal",
  "Indie",
  "Indie Rock",
  "Indie Pop",
  "Alternative",
  "Art Pop",
  "Experimental",
  "Psychedelic Rock",
  "Garage Rock",
  "Soul",
  "Funk",
  "Punk",
  "World Music",
  "Reggae",
  "Latin",
  "EDM",
  "Other",
];

const VENUE_TYPES = [
  "Bar",
  "Club",
  "Restaurant",
  "Nightclub",
  "Concert Hall",
  "Theater",
  "Outdoor Venue",
  "Cultural Center",
  "Cafe",
  "Hotel",
  "Arena",
  "Festival Grounds",
  "Art Gallery",
  "Community Center",
  "Event Space",
];

const REVENUE_SPLIT_OPTIONS = [
  "100/0",
  "90/10",
  "80/20",
  "70/30",
  "60/40",
  "50/50",
];

export default function UpdateProfileForm({ onUpdate }) {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user } = usersState;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    description: user?.description || "",
    type: user?.type || [],
    additionalInfo: {
      ...user?.additionalInfo,
      // Ensure genre array exists and is initialized with user's existing genres
      genre: user?.additionalInfo?.genre || [],
      // Venue specific fields - initialize with existing data or defaults
      address: {
        streetName: user?.additionalInfo?.address?.streetName || "",
        number: user?.additionalInfo?.address?.number || "",
        zipCode: user?.additionalInfo?.address?.zipCode || "",
        city: user?.additionalInfo?.address?.city || "",
      },
      revenueSplit: user?.additionalInfo?.revenueSplit || "",
      openingTimes: user?.additionalInfo?.openingTimes || [],
      performingTimes: user?.additionalInfo?.performingTimes || [],
    },
    profilePicture: user?.profilePicture || "",
    media: user?.media || [],
    images: user?.images || [],
    socialLinks: user?.socialLinks || [],
    availability: user?.availability || [],
  });

  const acceptedSentBookings =
    user &&
    user.bookingsSent
      .filter((booking) => booking.status === "accepted")
      .map((booking) => (booking = booking.performanceDate));

  const acceptedReceivedBookings =
    user &&
    user.bookingsReceived
      .filter((booking) => booking.status === "accepted")
      .map((booking) => (booking = booking.performanceDate));

  const allAcceptedBookings = user && [
    ...acceptedSentBookings,
    ...acceptedReceivedBookings,
  ];

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
  const handleSocialLink = (e, index) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? value : link
      ),
    }));
    setHasUnsavedChanges(true);
  };

  // Handler for media links
  const handleMediaLink = (e, platform) => {
    const { value } = e.target;

    setFormData((prev) => {
      const mediaIndex = prev.media.findIndex((m) => m.platform === platform);

      // If media item exists, update it
      if (mediaIndex !== -1) {
        const updatedMedia = [...prev.media];
        updatedMedia[mediaIndex] = {
          ...updatedMedia[mediaIndex],
          url: value,
        };
        return {
          ...prev,
          media: updatedMedia,
        };
      }

      // If not found, create new media item (no _id yet)
      return {
        ...prev,
        media: [
          ...prev.media,
          {
            platform,
            url: value,
          },
        ],
      };
    });

    setHasUnsavedChanges(true);
  };

  // Handler for availability updates
  const handleDateSelect = (dates) => {
    setFormData((prev) => ({
      ...prev,
      availability: dates,
    }));
    setHasUnsavedChanges(true);
  };

  // Add new handlers for venue-specific fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        address: {
          ...prev.additionalInfo.address,
          [name]: value,
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleTimeArrayChange = (type, index, value) => {
    setFormData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [type]: prev.additionalInfo[type].map((time, i) =>
          i === index ? value : time
        ),
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddTime = (type) => {
    setFormData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [type]: [...prev.additionalInfo[type], ""],
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleRemoveTime = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [type]: prev.additionalInfo[type].filter((_, i) => i !== index),
      },
    }));
    setHasUnsavedChanges(true);
  };

  // Add these handlers for tag management
  const handleTagToggle = (category, tag) => {
    setFormData((prev) => {
      if (category === "genre") {
        const genres = prev.additionalInfo.genre || [];
        const updatedGenres = genres.includes(tag)
          ? genres.filter((g) => g !== tag)
          : [...genres, tag];

        return {
          ...prev,
          additionalInfo: {
            ...prev.additionalInfo,
            genre: updatedGenres,
          },
        };
      } else {
        // type
        const types = prev.type || [];
        const updatedTypes = types.includes(tag)
          ? types.filter((t) => t !== tag)
          : [...types, tag];

        return {
          ...prev,
          type: updatedTypes,
        };
      }
    });
    setHasUnsavedChanges(true);
  };

  // Add this component for rendering tag bubbles
  const TagSelector = ({ title, tags, selectedTags, onToggle }) => (
    <div className="space-y-4">
      <h4 className="text-md font-medium">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedTags.includes(tag)
                  ? "bg-green text-white hover:bg-greenHover"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {selectedTags.includes(tag) && <span className="mr-1">✓</span>}
            {tag}
          </button>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async () => {
    setStatus({ loading: true, error: null, success: false });

    console.log(formData);

    try {
      await updateProfile(usersDispatch, user._id, formData);

      setStatus({ loading: false, error: null, success: true });
      setHasUnsavedChanges(false);
      setShowConfirmModal(false);

      toast.success("Profile updated successfully!");

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
      toast.error("Failed to update profile. Please try again.");
      console.error("Update error:", error);
    }
  };

  // New handler for form submission that shows modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  return (
    <div className="relative">
      <form onSubmit={handleFormSubmit} className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 mb-12">
          {/* Center profile picture section on mobile */}
          <div className="flex-shrink-0 mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              Profile Picture
            </h3>
            <ProfilePictureUpload
              currentImage={formData.profilePicture}
              onImageUpload={handleProfilePicture}
            />
          </div>

          {/* Basic Info stacks below profile picture on mobile */}
          <div className="flex-grow w-full">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={
                  user.role === "artist" ? "Artist Name" : "Venue Name"
                }
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

        {/* Tags Selection Section */}
        <div className="space-y-8">
          <h3 className="text-lg font-semibold mb-6">
            {user.role === "artist" ? "Artist Categories" : "Venue Categories"}
          </h3>

          {user.role === "artist" ? (
            // Artist-specific tags
            <div className="space-y-8">
              <TagSelector
                title="Performance Type"
                tags={ARTIST_PERFORMANCE_TYPES}
                selectedTags={formData.type}
                onToggle={(tag) => handleTagToggle("type", tag)}
              />
              <TagSelector
                title="Genre"
                tags={ARTIST_GENRES}
                selectedTags={formData.additionalInfo.genre || []}
                onToggle={(tag) => handleTagToggle("genre", tag)}
              />
            </div>
          ) : (
            // Venue-specific tags
            <TagSelector
              title="Venue Type"
              tags={VENUE_TYPES}
              selectedTags={formData.type}
              onToggle={(tag) => handleTagToggle("type", tag)}
            />
          )}
        </div>

        {/* Venue-specific fields */}
        {user.role === "venue" && (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold mb-6">Venue Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Address */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-6">Address</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Name
                      </label>
                      <input
                        type="text"
                        name="streetName"
                        value={formData.additionalInfo.address.streetName}
                        onChange={handleAddressChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={formData.additionalInfo.address.number}
                        onChange={handleAddressChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.additionalInfo.address.zipCode}
                        onChange={handleAddressChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.additionalInfo.address.city}
                        onChange={handleAddressChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Revenue Split and Times */}
              <div className="space-y-6">
                {/* Revenue Split */}
                <div>
                  <h4 className="text-md font-medium mb-6">Venue Operations</h4>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Revenue Split %
                      </label>
                      <select
                        name="revenueSplit"
                        value={formData.additionalInfo.revenueSplit}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            additionalInfo: {
                              ...prev.additionalInfo,
                              revenueSplit: e.target.value,
                            },
                          }));
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        <option value="">Select a revenue split</option>
                        {REVENUE_SPLIT_OPTIONS.map((split) => (
                          <option key={split} value={split}>
                            {split} (Artist/Venue)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Times Arrays */}
                    {["openingTimes", "performingTimes"].map((timeType) => (
                      <div key={timeType}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {timeType === "openingTimes"
                            ? "Opening Times"
                            : "Performance Times"}
                        </label>
                        <div className="space-y-2">
                          {formData.additionalInfo[timeType].map(
                            (time, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={time}
                                  onChange={(e) =>
                                    handleTimeArrayChange(
                                      timeType,
                                      index,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 border rounded-lg"
                                  placeholder={`Enter ${
                                    timeType === "openingTimes"
                                      ? "opening"
                                      : "performance"
                                  } time`}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveTime(timeType, index)
                                  }
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            onClick={() => handleAddTime(timeType)}
                            className="text-green hover:text-greenHover flex items-center gap-1"
                          >
                            <svg
                              className="w-4 h-4"
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
                            Add{" "}
                            {timeType === "openingTimes"
                              ? "Opening"
                              : "Performance"}{" "}
                            Time
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media and Social Links Section */}
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
                    <GalleryUpload
                      onImageUpload={handleGalleryImage}
                      className="text-xs sm:text-base"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Social Links</h3>
              <div className="space-y-4">
                {formData.socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 relative"
                  >
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleSocialLink(e, index)}
                      placeholder="Social media URL"
                      className="w-full p-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          socialLinks: prev.socialLinks.filter(
                            (_, i) => i !== index
                          ),
                        }));
                        setHasUnsavedChanges(true);
                      }}
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

                {/* Add New Link Button */}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      socialLinks: [...prev.socialLinks, ""],
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="mt-4 flex items-center text-green hover:text-greenHover transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Add Social Link
                </button>
              </div>
            </div>

            {/* Media Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Media Links</h3>
              <div className="space-y-4">
                {user.role === "artist"
                  ? ["YouTube", "Spotify", "SoundCloud"].map((platform) => (
                      <div
                        key={platform}
                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0"
                      >
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
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    ))
                  : ["YouTube"].map((platform) => (
                      <div
                        key={platform}
                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0"
                      >
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
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability Calendar Section */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-center md:text-left">
            Set Your Availability
          </h3>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 mb-4 text-center md:text-left">
              Select dates when you're available for bookings. Click a date to
              mark it as available.
            </p>
            <div className="flex justify-center md:justify-start">
              <AvailabilityCalendar
                selectedDates={formData.availability}
                bookedDates={allAcceptedBookings}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
        </div>

        {/* Sticky Update Button */}
        <div className="sticky bottom-0 bg-white p-4 shadow-lg mt-8 -mx-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {hasUnsavedChanges && (
              <span className="text-amber-600 text-xs sm:text-base">
                ⚠️ You have unsaved changes
              </span>
            )}
            <button
              type="submit"
              disabled={status.loading || !hasUnsavedChanges}
              className="bg-green text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-greenHover disabled:bg-gray-400 text-xs sm:text-base"
            >
              {status.loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>

      {/* Add Modal */}
      {showConfirmModal && (
        <Modal
          title="Confirm Changes"
          onClose={() => setShowConfirmModal(false)}
        >
          <div className="p-6 space-y-6">
            <p className="text-gray-700">
              Are you sure you want to save these changes?
            </p>
            <p className="text-sm text-gray-600">
              These changes will be published to your public profile and will be
              visible to other venues and artists.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="green"
                onClick={handleSubmit}
                disabled={status.loading}
              >
                {status.loading ? "Saving..." : "Confirm"}
              </Button>
              <Button
                variant="white"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
