import { useState, useContext } from "react";
import AvailabilityCalendar from "../../calendars/AvailabilityCalendar";
import { DataContext } from "../../../contexts/Context";
import Modal from "../../Modal";
import Button from "../../Button";
import { toast } from "react-toastify";
import { updateProfile } from "../../../api/usersApi";
import TagSelector from "./TagSelector";
import VenueAddressForm from "./VenueAddressForm";
import VenueOperationsForm from "./VenueOperationsForm";
import SocialAndMediaLinks from "./SocialAndMediaLinks";
import ProfilePictureSection from "./ProfilePictureSection";
import GallerySection from "./GallerySection";
import BasicInfoSection from "./BasicInfoSection";
import {
  ARTIST_PERFORMANCE_TYPES,
  ARTIST_GENRES,
  VENUE_TYPES,
} from "../../../constants/profileFormConstants";

export default function UpdateProfileForm({ onUpdate }) {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user } = usersState;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    description: user?.description || "",
    type: user?.type || [],
    additionalInfo: {
      ...user?.additionalInfo,
      // Ensure genre array exists and is initialised with user's existing genres
      genre: user?.additionalInfo?.genre || [],
      // Venue specific fields - initialise with existing data or defaults
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

  // Handler for address updates (venue)
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

  // Handler for opening/performance time updates (venue)
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

  // Handler for tag management
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

  // Helper function to validate times
  const validateTimes = (times) => {
    // Check if there are any times and that none are empty strings
    return times.length > 0 && times.every((time) => time.trim() !== "");
  };

  // Add this to check if the form is valid before submission
  const isFormValid = () => {
    const timesSections = ["openingTimes", "performingTimes"];
    const hasValidTimes = timesSections.every((timeType) =>
      validateTimes(formData.additionalInfo[timeType])
    );

    return hasValidTimes;
  };

  // Update the handleSubmit function
  const handleSubmit = async () => {
    // Check if any time arrays contain empty strings
    const hasEmptyTimes = ["openingTimes", "performingTimes"].some((timeType) =>
      formData.additionalInfo[timeType].some((time) => !time.trim())
    );

    if (hasEmptyTimes) {
      toast.error("Please type in all times before saving");
      setShowConfirmModal(false);
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      await updateProfile(usersDispatch, user._id, formData);

      setStatus({ loading: false, error: null, success: true });
      setHasUnsavedChanges(false);
      setShowConfirmModal(false);

      // Scroll to top after successful update
      window.scrollTo({ top: 0, behavior: "smooth" });

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
          <ProfilePictureSection
            formData={formData}
            handleProfilePicture={handleProfilePicture}
          />
          <BasicInfoSection
            formData={formData}
            handleChange={handleChange}
            user={user}
          />
        </div>

        {/* Performance Type and Genre */}
        <div className="space-y-6 mb-12">
          {user.role === "artist" ? (
            <>
              <TagSelector
                title={
                  <>
                    Performance Type<span className="text-green">*</span>
                  </>
                }
                tags={ARTIST_PERFORMANCE_TYPES}
                selectedTags={formData.type}
                onToggle={(tag) => handleTagToggle("type", tag)}
                defaultCategory="Musical Acts"
              />
              <TagSelector
                title={
                  <>
                    Genre<span className="text-green">*</span>
                  </>
                }
                tags={ARTIST_GENRES}
                selectedTags={formData.additionalInfo.genre || []}
                onToggle={(tag) => handleTagToggle("genre", tag)}
                defaultCategory="Music Genres"
              />
            </>
          ) : (
            <TagSelector
              title={
                <>
                  Venue Type<span className="text-green">*</span>
                </>
              }
              tags={VENUE_TYPES}
              selectedTags={formData.type}
              onToggle={(tag) => handleTagToggle("type", tag)}
            />
          )}
        </div>

        {/* Venue-specific fields */}
        {user.role === "venue" && (
          <div className="space-y-8 pt-8">
            <h3 className="text-lg md:text-xl font-bold mb-6">Venue Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Address */}
              <VenueAddressForm
                formData={formData}
                handleAddressChange={handleAddressChange}
              />

              {/* Right Column - Revenue Split and Times */}
              <div className="space-y-6">
                <VenueOperationsForm
                  formData={formData}
                  setFormData={setFormData}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                  handleTimeArrayChange={handleTimeArrayChange}
                  handleAddTime={handleAddTime}
                  handleRemoveTime={handleRemoveTime}
                />
              </div>
            </div>
          </div>
        )}

        {/* Media & Social Links and Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <GallerySection
            formData={formData}
            handleGalleryImage={handleGalleryImage}
            handleRemoveImage={handleRemoveImage}
          />
          <SocialAndMediaLinks
            formData={formData}
            setFormData={setFormData}
            setHasUnsavedChanges={setHasUnsavedChanges}
            handleSocialLink={handleSocialLink}
            handleMediaLink={handleMediaLink}
            user={user}
          />
        </div>

        {/* Availability Calendar */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-6 text-center md:text-left">
            Set Your Availability<span className="text-green">*</span>
          </h3>
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
            <Button
              type="button"
              variant="green"
              onClick={handleFormSubmit}
              disabled={status.loading || !hasUnsavedChanges}
            >
              {status.loading ? "Saving..." : "Save Changes"}
            </Button>
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
              Once all the required fields are filled in, these changes will be
              published to your public profile.
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
