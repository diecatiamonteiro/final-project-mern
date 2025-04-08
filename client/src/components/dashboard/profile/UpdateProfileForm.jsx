import { useState, useContext } from "react";
import axios from "axios";
import { ProfilePictureUpload, GalleryUpload } from "./UploadImage";
import AvailabilityCalendar from "../../calendars/AvailabilityCalendar";
import { DataContext } from "../../../contexts/Context";
import Modal from "../../Modal";
import Button from "../../Button";
import { toast } from "react-toastify";
import { updateProfile } from "../../../api/usersApi";
import TagSelector from "./TagSelector";

const ARTIST_PERFORMANCE_TYPES = {
  "Musical Acts": [
    "Band",
    "Duo",
    "Solo Artist",
    "Singer-Songwriter",
    "Rapper",
    "DJ",
    "Orchestra",
    "Ensemble",
  ],
  "Performing Acts": [
    "Dancer",
    "Comedian",
    "Poet",
    "Spoken Word Artist",
    "Magician",
    "Theatrical Performer",
    "Drag Performer",
    "Improv Performer",
  ],
  Other: [
    "Digital Artist",
    "Multi-disciplinary Artist",
    "Performance Collective",
    "Other",
  ],
};

const ARTIST_GENRES = {
  "Music Genres": [
    "Alternative",
    "Art Pop",
    "Blues",
    "Classical",
    "Country",
    "Dance",
    "Disco",
    "Dream Pop",
    "EDM",
    "Electronic",
    "Experimental",
    "Folk",
    "Folk Rock",
    "Funk",
    "Garage Rock",
    "Hip Hop",
    "Indie",
    "Indie Pop",
    "Indie Rock",
    "Jazz",
    "Latin",
    "Metal",
    "Pop",
    "Psychedelic Rock",
    "Punk",
    "Reggae",
    "Rock",
    "R&B",
    "Soul",
    "World Music",
  ],
  "Dance Styles": [
    "Ballet",
    "Ballroom",
    "Break Dance",
    "Contemporary",
    "Hip Hop Dance",
    "Jazz Dance",
    "Modern Dance",
    "Street Dance",
    "Tap",
    "Traditional Dance",
  ],
  "Comedy & Spoken Word": [
    "Improv Comedy",
    "Slam Poetry",
    "Stand-up",
    "Traditional Poetry",
  ],
  "Performance Arts": [
    "Theater",
    "Burlesque",
    "Cabaret",
    "Digital Performance",
    "Drag",
    "Magic",
  ],
  Other: ["Adult", "Family-Friendly", "Other"],
};

const VENUE_TYPES = [
  "Bar",
  "Jazz Bar",
  "Club",
  "Concert Hall",
  "Arena",
  "Comedy Club",
  "Cabaret Club",
  "Outdoor Venue",
  "Rooftop Venue",
  "Festival",
  "Theater",
  "Cultural Center",
  "Community Center",
  "Café",
  "Restaurant",
  "Hotel",
  "Art Gallery",
  "Museum",
  "Co-working Space",
  "Bookstore",
  "Pop-up Space",
  "Other",
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
      // If the value is empty, remove this platform from media array
      if (!value) {
        return {
          ...prev,
          media: prev.media.filter((m) => m.platform !== platform),
        };
      }

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

      // If not found and value exists, create new media item
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

  const handleSubmit = async () => {
    setStatus({ loading: true, error: null, success: false });

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

        {/* Performance Type and Genre */}
        <div className="space-y-6 mb-12">
          {user.role === "artist" ? (
            <>
              <TagSelector
                title="Performance Type"
                tags={ARTIST_PERFORMANCE_TYPES}
                selectedTags={formData.type}
                onToggle={(tag) => handleTagToggle("type", tag)}
                defaultCategory="Musical Acts"
              />
              <TagSelector
                title="Genre"
                tags={ARTIST_GENRES}
                selectedTags={formData.additionalInfo.genre || []}
                onToggle={(tag) => handleTagToggle("genre", tag)}
                defaultCategory="Music Genres"
              />
            </>
          ) : (
            <TagSelector
              title="Venue Type"
              tags={VENUE_TYPES}
              selectedTags={formData.type}
              onToggle={(tag) => handleTagToggle("type", tag)}
            />
          )}
        </div>

        {/* Gallery and Social Links Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Gallery Images */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Gallery Images</h3>
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

          {/* Social & Media Links */}
          <div className="space-y-8">
            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
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
              <h3 className="text-lg font-semibold mb-4">Media Links</h3>
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

        {/* Availability Calendar */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Set Your Availability</h3>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 mb-4 text-center md:text-left">
              Select dates when you're available for bookings. Any confirmed
              gigs are also shown here.
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
