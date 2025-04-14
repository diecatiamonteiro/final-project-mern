import React, { useState, useEffect, useContext } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowRightLong, FaRegHeart, FaHeart } from "react-icons/fa6";
import { DataContext } from "../../contexts/Context";
import {
  getAllArtists,
  getAllVenues,
  addFavourite,
  removeFavourite,
} from "../../api/usersApi";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";

export default function FeaturedArtistsAndVenues() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading, artists, venues } = usersState;
  const [randomArtists, setRandomArtists] = useState([]);
  const [randomVenues, setRandomVenues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllArtists(usersDispatch);
    getAllVenues(usersDispatch);
  }, [usersDispatch]);

  // Add these helper functions at the top of your component
  const getCompletedArtists = (artists) => {
    return artists?.filter(
      (artist) =>
        artist.name &&
        artist.description &&
        artist.type?.length > 0 &&
        artist.additionalInfo?.genre &&
        artist.availability?.length > 0
    );
  };

  const getCompletedVenues = (venues) => {
    return venues?.filter(
      (venue) =>
        venue.name &&
        venue.description &&
        venue.type?.length > 0 &&
        venue.additionalInfo?.address?.streetName &&
        venue.additionalInfo?.address?.number &&
        venue.additionalInfo?.address?.zipCode &&
        venue.additionalInfo?.address?.city &&
        venue.additionalInfo?.revenueSplit &&
        venue.additionalInfo?.openingTimes?.length > 0 &&
        venue.additionalInfo?.performingTimes?.length > 0
    );
  };

  // Modify your useEffect for artists and venues
  useEffect(() => {
    if (artists.length > 0) {
      // First filter completed artists, then take first 3
      const completedArtists = getCompletedArtists(artists);
      const randomThreeArtists = completedArtists.slice(0, 3).map((artist) => ({
        ...artist,
        isFavourited:
          usersState.user?.favourites?.some((fav) => fav._id === artist._id) ||
          false,
      }));
      setRandomArtists(randomThreeArtists);
    }

    if (venues.length > 0) {
      // First filter completed venues, then take first 3
      const completedVenues = getCompletedVenues(venues);
      const randomThreeVenues = completedVenues.slice(0, 3).map((venue) => ({
        ...venue,
        isFavourited:
          usersState.user?.favourites?.some((fav) => fav._id === venue._id) ||
          false,
      }));
      setRandomVenues(randomThreeVenues);
    }
  }, [artists, venues, usersState.user?.favourites]);

  const handleProfileClick = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  const handleFavouriteClick = async (e, item, type) => {
    // 1. Prevent default behaviour and stop event propagation
    e.preventDefault();
    e.stopPropagation();

    // 2. Check if user is logged in
    if (!usersState.user) {
      toast.error("Please login to favourite items.");
      return;
    }

    // 3. Prevent self-favouriting
    if (item._id === usersState.user._id) {
      toast.error("You cannot add yourself to favourites.");
      return;
    }

    // 4. Try to update favourites
    try {
      // 5a. If item is already favourited, remove it
      if (item.isFavourited) {
        // Make API call to remove favourite
        await removeFavourite(usersDispatch, item._id);
        toast.success(`${type} removed from favourites.`);

        // Update local state based on item type (we need to use local state because the API call is async, so it doesn't update immediately)
        if (type === "Artist") {
          // prev is the previous and latest state of the array
          setRandomArtists((prev) =>
            prev.map((a) =>
              // Checks if the current artist in the map is the one we want to update. If true: { ...a, isFavourited: false } - Creates a new object with all properties of the artist (...a) but sets isFavourited to false. If false: a - Returns the artist object unchanged
              a._id === item._id ? { ...a, isFavourited: false } : a
            )
          );
        } else {
          setRandomVenues((prev) =>
            prev.map((v) =>
              v._id === item._id ? { ...v, isFavourited: false } : v
            )
          );
        }
      }
      // 5b. If item is not favourited, add it
      else {
        // Make API call to add favourite
        await addFavourite(usersDispatch, item._id);
        toast.success(`${type} added to favourites.`);

        // Update local state based on item type
        if (type === "Artist") {
          setRandomArtists((prev) =>
            prev.map((a) =>
              a._id === item._id ? { ...a, isFavourited: true } : a
            )
          );
        } else {
          setRandomVenues((prev) =>
            prev.map((v) =>
              v._id === item._id ? { ...v, isFavourited: true } : v
            )
          );
        }
      }
    } catch (error) {
      // 6. Handle any errors
      console.error("Failed to update favourites:", error);
      toast.error("Failed to update favourites.");
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured on The Greenroom
          </h2>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-24 my-24 lg:my-48 px-6 bg-white full-width-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-left mb-12 lg:mb-16">
          Featured on The Greenroom
        </h2>

        {/* ARTISTS SECTION */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Featured Artists
            </h3>
            <Button
              to="/artists"
              variant="black"
              size="medium"
              className="flex flex-row items-center gap-2"
            >
              View All Artists <FaArrowRightLong />
            </Button>
          </div>

          {/* Artist Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomArtists &&
              randomArtists.map((artist) => (
                <div
                  key={artist._id || artist.id}
                  className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
                  onClick={() =>
                    handleProfileClick("artist", artist._id || artist.id)
                  }
                >
                  {/* Image */}
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={artist.profilePicture}
                      alt={artist.name}
                      className="w-full h-48 object-cover"
                    />
                    {/* Favourite Button */}
                    <button
                      onClick={(e) => handleFavouriteClick(e, artist, "Artist")}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-midnightBlack/30 shadow-midnightBlack/10 hover:scale-[1.05] duration-300 cursor-pointer"
                    >
                      {artist.isFavourited ? (
                        <FaHeart className="text-xl text-red-500" />
                      ) : (
                        <FaRegHeart className="text-xl text-midnightBlack" />
                      )}
                    </button>
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 p-6">
                    <h3 className="font-semibold text-xl md:text-2xl mb-4 line-clamp-2">
                      {artist.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {/* Type Tags */}
                      {artist.type?.length > 0 ? (
                        artist.type.map((type) => (
                          <span
                            key={type}
                            className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
                          >
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full">
                          Type Not Available
                        </span>
                      )}

                      {/* Genre Tags */}
                      {artist.additionalInfo?.genre?.length > 0 ? (
                        artist.additionalInfo.genre.map((genre) => (
                          <span
                            key={genre}
                            className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
                          >
                            {genre}
                          </span>
                        ))
                      ) : (
                        <span className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full">
                          Genre Not Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* VENUES SECTION */}
        <div>
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Featured Venues
            </h3>
            <Button
              to="/venues"
              variant="black"
              className="flex flex-row items-center gap-2"
            >
              View All Venues <FaArrowRightLong />
            </Button>
          </div>

          {/* Venues Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomVenues &&
              randomVenues.map((venue) => (
                <div
                  key={venue._id || venue.id}
                  className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] flex flex-col"
                  onClick={() =>
                    handleProfileClick("venue", venue._id || venue.id)
                  }
                >
                  {/* Image Container */}
                  <div className="h-48 relative">
                    <img
                      src={venue.profilePicture}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => handleFavouriteClick(e, venue, "Venue")}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-midnightBlack/30 shadow-midnightBlack/10 hover:scale-[1.05] duration-300 cursor-pointer"
                    >
                      {venue.isFavourited ? (
                        <FaHeart className="text-xl text-red-500" />
                      ) : (
                        <FaRegHeart className="text-xl text-midnightBlack" />
                      )}
                    </button>

                    {/* Revenue Split Badge */}
                    <div className="absolute top-4 left-4 p-2 bg-midnightBlack/70 rounded-lg shadow-lg">
                      <p className="text-sm font-semibold text-white">
                        Split:{" "}
                        {venue.additionalInfo?.revenueSplit?.split("/")[0]}%
                        artist /{" "}
                        {venue.additionalInfo?.revenueSplit?.split("/")[1]}%
                        venue
                      </p>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Venue Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl md:text-2xl mb-2 line-clamp-2">
                        {venue.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">
                        <span className="inline-block mr-2">
                          <IoLocationOutline />
                        </span>
                        {venue.additionalInfo.address.city}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {venue.type &&
                          venue.type.map((type, index) => (
                            <span
                              key={`${venue._id || venue.id}-type-${index}`}
                              className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
                            >
                              {type}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
