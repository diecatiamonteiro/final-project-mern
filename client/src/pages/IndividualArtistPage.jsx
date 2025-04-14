import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../contexts/Context";
import {
  getIndividualArtistOrVenue,
  addFavourite,
  removeFavourite,
} from "../api/usersApi";
import BookingRequestCalendar from "../components/calendars/BookingRequestCalendar";
import PhotoGalleryModal from "../components/individualPages/PhotoGalleryModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { SocialIcons } from "../components/SocialIcons";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getYouTubeId,
  getSpotifyId,
  getSoundCloudUrl,
} from "../utils/mediaHelpers";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function IndividualArtistPage() {
  const { id } = useParams();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading, error } = usersState;
  const artist = usersState.currentProfile;
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);
  const navigate = useNavigate();

  const acceptedSentBookings =
    artist &&
    artist.bookingsSent
      .filter((booking) => booking.status === "accepted")
      .map((booking) => (booking = booking.performanceDate));

  const acceptedReceivedBookings =
    artist &&
    artist.bookingsReceived
      .filter((booking) => booking.status === "accepted")
      .map((booking) => (booking = booking.performanceDate));

  const allAcceptedBookings = artist && [
    ...acceptedReceivedBookings,
    ...acceptedSentBookings,
  ];

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        await getIndividualArtistOrVenue(usersDispatch, id);
      } catch (err) {
        console.error("Error fetching artist:", err);
      }
    };

    fetchArtist();
  }, [usersDispatch, id]);

  useEffect(() => {
    if (artist && usersState.user?.favourites) {
      const isFavourited = usersState.user.favourites.some(
        (favourite) => favourite._id === artist._id
      );
      setCurrentArtist({ ...artist, isFavourited: isFavourited });
    } else if (artist) {
      setCurrentArtist({ ...artist, isFavourited: false });
    }
  }, [artist, usersState.user?.favourites]); // this effect is triggered when the artist or the user favourites change and it does the following:
  // 1. Check if the artist is in the user's favourites
  // 2. If it is, set the isFavourited state to true
  // 3. If it is not, set the isFavourited state to false

  const handleFavouriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // this prevents the click event from bubbling up to the parent elements, ie it doesn't trigger the click event of the parent element

    if (!usersState.user) {
      toast.error("Please login to favourite items.");
      return;
    }

    if (currentArtist._id === usersState.user._id) {
      toast.error("You cannot add yourself to favourites.");
      return;
    }

    try {
      if (currentArtist.isFavourited) {
        await removeFavourite(usersDispatch, currentArtist._id);
        setCurrentArtist({ ...currentArtist, isFavourited: false });
        toast.success("Artist removed from favourites.");
      } else {
        await addFavourite(usersDispatch, currentArtist._id);
        setCurrentArtist({ ...currentArtist, isFavourited: true });
        toast.success("Artist added to favourites.");
      }
    } catch (error) {
      console.error("Failed to update favourites:", error);
      toast.error("Failed to update favourites.");
    }
  };

  // Check if the current user is artist
  const isArtist = usersState.user?.role === "artist";

  // Check if the current user is viewing their own profile
  const isOwnProfile = usersState.user?._id === artist?._id;

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

  // Group media items by platform type
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
            src={artist.profilePicture}
            alt={artist.name}
            className="w-full h-full object-cover rounded-lg hover:opacity-95 transition-opacity"
          />
        </div>
        {artist.images?.slice(0, 4).map((image, index) => (
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
              alt={`${artist.name} performance ${index + 1}`}
              className="w-full h-full object-cover rounded-lg hover:opacity-95 transition-opacity"
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
      {/* End of Photo Grid Section */}

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Artist Info */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">{artist.name}</h1>
            {!isOwnProfile && (
            <button
              onClick={handleFavouriteClick}
              className={`p-2 rounded-full transition-colors ${
                currentArtist?.isFavourited
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
                <FaHeart size={24} />
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* Tags Type */}
            {artist.type?.map((type) => (
              <span
                key={type}
                className="group relative bg-green/10 text-green px-3 py-1 rounded-full text-sm cursor-pointer"
              >
                {type}
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Type
                </span>
              </span>
            ))}
            {/* Tags Genre */}
            {artist.additionalInfo?.genre?.map((genre) => (
              <span
                key={genre}
                className="group relative bg-midnightBlack/10 text-midnightBlack px-3 py-1 rounded-full text-sm cursor-pointer"
              >
                {genre}
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Genre
                </span>
              </span>
            ))}
          </div>

          <p className="text-base md:text-lg mb-8">{artist.description}</p>

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
                <SocialIcons link={link} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-12" />

          {/* Media Section */}
          <div className="space-y-8">
            {/* Video and Audio Players Grid */}
            {(groupedMedia?.youtube?.length > 0 ||
              groupedMedia?.audio?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* YouTube Video - Takes up 3 columns */}
                {groupedMedia?.youtube?.map((item, index) => (
                  <div
                    key={index}
                    className="md:col-span-3 h-[320px] lg:h-[320px]"
                  >
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
                              src={getSoundCloudUrl(item.url)}
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

        {/* Right Column - Upcoming Gigs */}
        <div className="relative">
          <div className="sticky top-24">
            {!isArtist ? (
              <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-full">
                <BookingRequestCalendar
                  availableDates={artist.availability}
                  bookedDates={allAcceptedBookings}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-4 w-full">
                <h2 className="text-xl font-semibold mb-4">Upcoming Gigs</h2>
                <div className="space-y-4">
                  <div>
                    {artist.bookingsReceived.concat(artist.bookingsSent)
                      .filter(booking => 
                        booking.status === "accepted" && 
                        new Date(booking.performanceDate) >= new Date()
                      )
                      .sort((a, b) => new Date(a.performanceDate) - new Date(b.performanceDate))
                      .slice(0, 3)
                      .map((booking) => {
                        // Determine if this is a sent or received booking
                        const venue = booking.receivedBy.role === "venue" 
                          ? booking.receivedBy 
                          : booking.initiatedBy;
                        
                        return (
                          <div key={booking._id} className="mb-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <img 
                                src={venue.profilePicture} 
                                alt={venue.name}
                                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => {
                                  navigate(`/venue/${venue._id}`);
                                }}
                              />
                              <div>
                                <p className="font-medium">{venue.name}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(booking.performanceDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {artist.bookingsReceived.concat(artist.bookingsSent).filter(b => 
                      b.status === "accepted" && 
                      new Date(b.performanceDate) >= new Date()
                    ).length === 0 && (
                      <p className="text-gray-500 text-sm italic">No upcoming gigs</p>
                    )}
                  </div>
                </div>
              </div>
            )}
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
          profilePicture={artist.profilePicture}
          images={artist.images}
          name={artist.name}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
}
