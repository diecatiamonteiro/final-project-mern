import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../contexts/Context";
import {
  addFavourite,
  getIndividualArtistOrVenue,
  removeFavourite,
} from "../api/usersApi";
import BookingRequestCalendar from "../components/calendars/BookingRequestCalendar";
import PhotoGalleryModal from "../components/individualPages/PhotoGalleryModal";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaMusic,
  FaHeart,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { SocialIcons } from "../components/SocialIcons";
import { toast } from "react-toastify";
import { getYouTubeId } from "../utils/mediaHelpers";

export default function IndividualVenuePage() {
  const { id } = useParams();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading, error } = usersState;
  const venue = usersState.currentProfile;
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentVenue, setCurrentVenue] = useState(null);

  const acceptedSentBookings =
    venue &&
    venue.bookingsSent
      .filter((booking) => booking.status === "accepted")
      .map((booking) => (booking = booking.performanceDate));

  const acceptedReceivedBookings =
    venue &&
    venue.bookingsReceived
      .filter((booking) => booking.status === "accepted")
      .map((booking) => (booking = booking.performanceDate));

  const allAcceptedBookings = venue && [
    ...acceptedReceivedBookings,
    ...acceptedSentBookings,
  ];

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        await getIndividualArtistOrVenue(usersDispatch, id);
      } catch (err) {
        console.error("Error fetching venue:", err);
      }
    };

    fetchVenue();
  }, [usersDispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format address from additionalInfo
  const formattedAddress = venue?.additionalInfo?.address
    ? `${venue.additionalInfo.address.streetName} ${venue.additionalInfo.address.number}, ${venue.additionalInfo.address.zipCode} ${venue.additionalInfo.address.city}`
    : "Address not available";

  useEffect(() => {
    if (venue && usersState.user?.favourites) {
      const isFavourited = usersState.user.favourites.some(
        (favourite) => favourite._id === venue._id
      );
      setCurrentVenue({ ...venue, isFavourited: isFavourited });
    } else if (venue) {
      setCurrentVenue({ ...venue, isFavourited: false });
    }
  }, [venue, usersState.user?.favourites]); // this effect is triggered when the venue or the user favourites change and it does the following:
  // 1. Check if the venue is in the user's favourites
  // 2. If it is, set the isFavourited state to true
  // 3. If it is not, set the isFavourited state to false

  const handleFavouriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // this prevents the click event from bubbling up to the parent elements, ie it doesn't trigger the click event of the parent element

    if (!usersState.user) {
      toast.error("Please login to favourite items.");
      return;
    }

    if (currentVenue._id === usersState.user._id) {
      toast.error("You cannot add yourself to favourites.");
      return;
    }

    try {
      if (currentVenue.isFavourited) {
        await removeFavourite(usersDispatch, currentVenue._id);
        setCurrentVenue({ ...currentVenue, isFavourited: false });
        toast.success("Venue removed from favourites.");
      } else {
        await addFavourite(usersDispatch, currentVenue._id);
        setCurrentVenue({ ...currentVenue, isFavourited: true });
        toast.success("Venue added to favourites.");
      }
    } catch (error) {
      console.error("Failed to update favourites:", error);
      toast.error("Failed to update favourites.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );

  if (!venue)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Venue not found
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-24">
      {/* Photo Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-8">
        <div
          className="col-span-2 row-span-2 cursor-pointer h-[200px] md:h-[400px]"
          onClick={() => {
            setShowAllPhotos(true);
            setSelectedPhoto(0);
          }}
        >
          <img
            src={venue.profilePicture}
            alt={venue.name}
            className="w-full h-full object-cover rounded-lg hover:opacity-95 transition-opacity"
          />
        </div>
        {venue.images?.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="cursor-pointer relative h-[100px] md:h-[198px]"
            onClick={() => {
              setShowAllPhotos(true);
              setSelectedPhoto(index + 1);
            }}
          >
            <img
              src={image}
              alt={`${venue.name} photo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg hover:opacity-95 transition-opacity"
            />
            {/* Show overlay button only on the last image if there are more photos */}
            {index === 3 && venue.images.length > 4 && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllPhotos(true);
                }}
                className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
              >
                <span className="text-white font-semibold">
                  +{venue.images.length - 4} more photos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* End of Photo Grid Section */}

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Venue Info */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">{venue.name}</h1>
            <button
              onClick={handleFavouriteClick}
              className={`p-2 rounded-full transition-colors ${
                currentVenue?.isFavourited
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
              <FaHeart size={24} />
            </button>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <FaMapMarkerAlt className="text-green" />
            <span>{formattedAddress}</span>
          </div>

          {/* Venue Type Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {venue.type?.map((type) => (
              <span
                key={type}
                className="bg-green/10 text-green px-3 py-1 rounded-full text-sm"
              >
                {type}
              </span>
            ))}
          </div>

          <p className="text-base md:text-lg mb-8">{venue.description}</p>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Social Links */}
          <div className="flex gap-6 mb-6">
            {venue.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green hover:text-greenHover transition-colors"
              >
                <SocialIcons link={link} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-12" />

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Opening Hours */}
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FaClock className="text-green" />
                <h3 className="font-semibold">Opening Hours</h3>
              </div>
              {venue.additionalInfo?.openingTimes?.map((time, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm md:text-base"
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>

            {/* Performance Times */}
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FaMusic className="text-green" />
                <h3 className="font-semibold">Performance Times</h3>
              </div>
              {venue.additionalInfo?.performingTimes?.map((time, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm md:text-base"
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>

            {/* Revenue Split */}
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FaMoneyBillWave className="text-green" />
                <h3 className="font-semibold">Revenue Split</h3>
              </div>
              <p className="text-sm md:text-base">
                {(venue.additionalInfo?.revenueSplit &&
                  `${
                    venue.additionalInfo?.revenueSplit?.split("/")[0]
                  }% artist / ${
                    venue.additionalInfo?.revenueSplit?.split("/")[1]
                  }% venue`) ||
                  "Information not available"}
              </p>
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-8">
            {venue.media
              ?.sort((a, b) => {
                // Sort YouTube items first
                if (a.platform === "YouTube" && b.platform !== "YouTube")
                  return -1;
                if (a.platform !== "YouTube" && b.platform === "YouTube")
                  return 1;
                return 0;
              })
              .map((item, index) => (
                <div key={index}>
                  {item.platform === "YouTube" ? (
                    <div>
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeId(
                            item.url
                          )}`}
                          className="w-full h-full rounded-lg shadow-lg"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-lg p-4">
                      <p className="text-green">{item.platform}</p>
                      <p className="truncate">{item.url}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-full">
              <BookingRequestCalendar
                availableDates={venue.availability}
                bookedDates={allAcceptedBookings}
              />
            </div>
          </div>
        </div>
      </div>
      {/* End of Main Content Section */}

      {/* Photo Gallery Modal */}
      {showAllPhotos && (
        <PhotoGalleryModal
          showAllPhotos={showAllPhotos}
          selectedPhoto={selectedPhoto}
          setShowAllPhotos={setShowAllPhotos}
          setSelectedPhoto={setSelectedPhoto}
          profilePicture={venue.profilePicture}
          images={venue.images}
          name={venue.name}
        />
      )}
    </div>
  );
}
