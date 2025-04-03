import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingRequestCalendar from "../components/calendars/BookingRequestCalendar";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaMusic,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { SocialIcons } from "../components/SocialIcons";

export default function IndividualVenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Venue not found");
        }
        const data = await response.json();
        console.log("Venue data:", data);
        setVenue(data.data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs once when component mounts

  // Photo gallery modal with carousel (same as artist page)
  const PhotoGalleryModal = () => {
    const allPhotos = [venue.profilePicture, ...(venue.images || [])];

    const handleClose = () => {
      setShowAllPhotos(false);
      setSelectedPhoto(null);
    };

    return (
      <div className="fixed inset-0 bg-black/90 z-50 overflow-hidden">
        {selectedPhoto !== null ? (
          // Carousel View
          <div className="fixed inset-0 flex items-center justify-center p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <FaTimes size={24} />
            </button>

            <button
              onClick={() =>
                setSelectedPhoto((prev) =>
                  prev > 0 ? prev - 1 : allPhotos.length - 1
                )
              }
              className="absolute left-4 text-white hover:text-gray-300"
            >
              <FaChevronLeft size={24} />
            </button>

            <img
              src={allPhotos[selectedPhoto]}
              alt={`Photo ${selectedPhoto + 1}`}
              className="max-h-[80vh] max-w-[80vw] object-contain"
            />

            <button
              onClick={() =>
                setSelectedPhoto((prev) =>
                  prev < allPhotos.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-4 text-white hover:text-gray-300"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        ) : (
          // Grid View
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-300"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 container mx-auto">
              {allPhotos.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img
                    src={image}
                    alt={`${venue.name} photo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Format address from additionalInfo
  const formattedAddress = venue?.additionalInfo?.address
    ? `${venue.additionalInfo.address.streetName} ${venue.additionalInfo.address.number}, ${venue.additionalInfo.address.zipCode} ${venue.additionalInfo.address.city}`
    : "Address not available";

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Photo Grid Section */}
      <div className="grid grid-cols-4 gap-4 mb-8 relative h-[400px]">
        <div
          className="col-span-2 row-span-2 cursor-pointer"
          onClick={() => {
            setShowAllPhotos(true);
            setSelectedPhoto(0);
          }}
        >
          <img
            src={venue.profilePicture}
            alt={venue.name}
            className="w-full h-[400px] object-cover rounded-lg hover:opacity-95 transition-opacity"
          />
        </div>
        {venue.images?.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="cursor-pointer relative"
            onClick={() => {
              setShowAllPhotos(true);
              setSelectedPhoto(index + 1);
            }}
          >
            <img
              src={image}
              alt={`${venue.name} photo ${index + 1}`}
              className="w-full h-[198px] object-cover rounded-lg hover:opacity-95 transition-opacity"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>

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

          <p className="text-gray-600 mb-8">{venue.description}</p>

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
          <hr className="border-gray-200 mb-6" />

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Opening Hours */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FaClock className="text-green" />
                <h3 className="font-semibold">Opening Hours</h3>
              </div>
              {venue.additionalInfo?.openingTimes?.map((time, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{time}</span>
                </div>
              ))}
            </div>

            {/* Performance Times */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FaMusic className="text-green" />
                <h3 className="font-semibold">Performance Times</h3>
              </div>
              {venue.additionalInfo?.performingTimes?.map((time, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{time}</span>
                </div>
              ))}
            </div>

            {/* Revenue Split */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FaMoneyBillWave className="text-green" />
                <h3 className="font-semibold">Revenue Split</h3>
              </div>
              {venue.additionalInfo?.revenueSplit ? (
                <p className="text-sm">
                  {venue.additionalInfo.revenueSplit.split("/")[0]}% artist
                  {" / "}
                  {venue.additionalInfo.revenueSplit.split("/")[1]}% venue
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Revenue split information not available
                </p>
              )}
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

      {/* Photo Gallery Modal */}
      {showAllPhotos && <PhotoGalleryModal />}
    </div>
  );
}

// Add the YouTube helper function (same as artist page)
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
