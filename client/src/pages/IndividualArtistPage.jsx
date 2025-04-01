import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingRequestCalendar from "../components/calendars/BookingRequestCalendar";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaSpotify,
  FaSoundcloud,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaGlobe,
} from "react-icons/fa";

export default function IndividualArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const acceptedSentBookings =
    artist &&
    artist.bookingsSent
      .filter((sentBooking) => sentBooking.status === "accepted")
      .map((item) => (item = item.performanceDate));

  const acceptedReceivedBookings =
    artist &&
    artist.bookingsReceived
      .filter((receivedBooking) => receivedBooking.status === "accepted")
      .map((item) => (item = item.performanceDate));

  const allAcceptedBookings = artist && [
    ...acceptedReceivedBookings,
    ...acceptedSentBookings,
  ];

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Artist not found");
        }
        const data = await response.json();
        setArtist(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Photo gallery modal with carousel
  const PhotoGalleryModal = () => {
    const allPhotos = [artist.profilePicture, ...(artist.images || [])];

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 container mx-auto">
              {allPhotos.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img
                    src={image}
                    alt={`${artist.name} photo ${index + 1}`}
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Artist not found
      </div>
    );
  }

  // First, let's group media items by platform type
  const groupedMedia = artist.media?.reduce((acc, item) => {
    if (item.platform === "YouTube") {
      acc.youtube = [...(acc.youtube || []), item];
    } else if (["Spotify", "SoundCloud"].includes(item.platform)) {
      acc.audio = [...(acc.audio || []), item];
    } else {
      acc.other = [...(acc.other || []), item];
    }
    return acc;
  }, {});

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
            src={artist.profilePicture}
            alt={artist.name}
            className="w-full h-[400px] object-cover rounded-lg hover:opacity-95 transition-opacity"
          />
        </div>
        {artist.images?.slice(0, 4).map((image, index) => (
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
              alt={`${artist.name} performance ${index + 1}`}
              className="w-full h-[198px] object-cover rounded-lg hover:opacity-95 transition-opacity"
            />
            {/* Show overlay button only on the last image if there are more photos */}
            {index === 3 && artist.images.length > 4 && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllPhotos(true);
                }}
                className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
              >
                <span className="text-white font-semibold">
                  +{artist.images.length - 4} more photos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column - Artist Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {artist.type?.map((type) => (
              <span
                key={type}
                className="bg-green/10 text-green px-3 py-1 rounded-full text-sm"
              >
                {type}
              </span>
            ))}
            {artist.additionalInfo?.genre?.map((genre) => (
              <span
                key={genre}
                className="bg-midnightBlack/10 text-midnightBlack px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-gray-600 mb-8">{artist.description}</p>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Social Links */}
          <div className="flex gap-6 mb-6">
            {artist.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green hover:text-greenHover transition-colors"
              >
                {getSocialIcon(link)}
              </a>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Media Section */}
          <div className="space-y-8">
            {/* Video and Audio Players Grid */}
            {(groupedMedia?.youtube?.length > 0 ||
              groupedMedia?.audio?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* YouTube Video - Takes up 3 columns */}
                {groupedMedia?.youtube?.map((item, index) => (
                  <div key={index} className="md:col-span-3 aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(
                        item.url
                      )}`}
                      className="w-full h-full rounded-lg shadow-lg"
                      allowFullScreen
                    />
                  </div>
                ))}

                {/* Audio Players Stack - Takes up 2 columns */}
                {groupedMedia?.audio && (
                  <div className="md:col-span-2 space-y-4">
                    {groupedMedia.audio.map((item, index) => (
                      <div key={index}>
                        {item.platform === "Spotify" ? (
                          <div className="bg-white rounded-lg shadow-lg">
                            <iframe
                              style={{ borderRadius: "12px" }}
                              src={`https://open.spotify.com/embed/track/${getSpotifyId(
                                item.url
                              )}?utm_source=generator&theme=0`}
                              width="100%"
                              height="152"
                              frameBorder="0"
                              allowFullScreen=""
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                              className="shadow-lg"
                            />
                          </div>
                        ) : item.platform === "SoundCloud" ? (
                          <div className="bg-white rounded-lg shadow-lg h-[152px] overflow-hidden">
                            <iframe
                              src={`https://w.soundcloud.com/player/?url=${item.url}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false&show_playcount=false`}
                              className="w-full h-full rounded-lg"
                              frameBorder="0"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Other Media */}
            {groupedMedia?.other?.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                <p className="text-green">{item.platform}</p>
                <p className="truncate">{item.url}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-full">
              <BookingRequestCalendar
                availableDates={artist.availability}
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

// Helper function to determine social media icon
const getSocialIcon = (url) => {
  if (url.includes("facebook")) return <FaFacebook size={24} />;
  if (url.includes("instagram")) return <FaInstagram size={24} />;
  if (url.includes("twitter")) return <FaTwitter size={24} />;
  if (url.includes("youtube")) return <FaYoutube size={24} />;
  if (url.includes("spotify")) return <FaSpotify size={24} />;
  if (url.includes("soundcloud")) return <FaSoundcloud size={24} />;
  // Add website icon as default
  return <FaGlobe size={24} />;
};

// Helper function to extract YouTube video ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Add this helper function next to getYouTubeId
const getSpotifyId = (url) => {
  const trackId = url.split("/track/")[1]?.split("?")[0];
  return trackId || null;
};
