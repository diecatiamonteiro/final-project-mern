
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../contexts/Context";
import { getAllFavourites, removeFavourite } from "../api/usersApi";
import { IoLocationOutline, IoClose } from "react-icons/io5";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function FavouritesPage() {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user, isLoading, error, favourites } = usersState;
  
  // Set default active tab based on user role
  const [activeTab, setActiveTab] = useState(user?.role === "artist" ? "venues" : "artists");

  const venues = favourites.filter(fav => fav.role === "venue").map(venue => ({
    ...venue,
    isFavourited: true
  }));
  const artists = favourites.filter(fav => fav.role === "artist");

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view favorites");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getAllFavourites(usersDispatch).catch((error) => {
        toast.error(error.response?.data?.message || "Failed to load favorites");
      });
    }
  }, [user, usersDispatch]);

  // Set initial active tab when user data is loaded
  useEffect(() => {
    if (user) {
      setActiveTab(user.role === "artist" ? "venues" : "artists");
    }
  }, [user]);

  const handleFavouriteClick = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await removeFavourite(usersDispatch, item._id);
      toast.success(`${item.role === "venue" ? "Venue" : "Artist"} removed from favourites`);
    } catch (error) {
      toast.error("Failed to remove from favourites");
    }
  };

  const handleProfileClick = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold mb-8">My Favourites</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8" aria-label="Dashboard Navigation">
          <button
            onClick={() => setActiveTab("venues")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "venues"
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Venues
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "artists"
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Artists
          </button>
        </nav>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {activeTab === "venues" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Favourite Venues</h2>
              <p className="text-gray-500 mb-10">
                View and manage your favourite venues.
              </p>
              {venues.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No favourite venues yet</p>
                  <button
                    onClick={() => navigate("/venues")}
                    className="px-6 py-2 bg-midnightBlack text-white rounded-md hover:bg-midnightBlack/80 transition-colors"
                  >
                    Browse Venues
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {venues.map((venue) => (
                    <div
                      key={venue._id}
                      className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] flex flex-col"
                      onClick={() => handleProfileClick("venue", venue._id)}
                    >
                      <div className="h-48 relative">
                        <img
                          src={venue.profilePicture}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => handleFavouriteClick(e, venue)}
                          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-midnightBlack/30 shadow-midnightBlack/10 hover:scale-[1.05] hover:bg-red-50 duration-300 cursor-pointer"
                        >
                          <IoClose className="text-xl text-red-500" />
                        </button>
                        <div className="absolute top-4 left-4 p-2 bg-midnightBlack/70 rounded-lg shadow-lg">
                          <p className="text-sm font-semibold text-white">
                            Split: {venue.additionalInfo?.revenueSplit?.split("/")[0]}% artist /{" "}
                            {venue.additionalInfo?.revenueSplit?.split("/")[1]}% venue
                          </p>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl md:text-2xl mb-2 line-clamp-2">
                            {venue.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4">
                            <span className="inline-block mr-2">
                              <IoLocationOutline />
                            </span>
                            {venue.additionalInfo?.address?.city}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {venue.type?.map((type, index) => (
                              <span
                                key={`${venue._id}-type-${index}`}
                                className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm mt-auto line-clamp-2">
                            {venue.description}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/venue/${venue._id}`)}
                          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "artists" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Favourite Artists</h2>
              <p className="text-gray-500 mb-10">
                View and manage your favourite artists.
              </p>
              {artists.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No favourite artists yet</p>
                  <button
                    onClick={() => navigate("/artists")}
                    className="px-6 py-2 bg-midnightBlack text-white rounded-md hover:bg-midnightBlack/80 transition-colors"
                  >
                    Browse Artists
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {artists.map((artist) => (
                    <div
                      key={artist._id}
                      className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] flex flex-col"
                      onClick={() => handleProfileClick("artist", artist._id)}
                    >
                      <div className="h-48 relative">
                        <img
                          src={artist.profilePicture}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => handleFavouriteClick(e, artist)}
                          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-midnightBlack/30 shadow-midnightBlack/10 hover:scale-[1.05] hover:bg-red-50 duration-300 cursor-pointer"
                        >
                          <IoClose className="text-xl text-red-500" />
                        </button>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl md:text-2xl mb-2 line-clamp-2">
                            {artist.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {artist.additionalInfo?.genre?.map((genre, index) => (
                              <span
                                key={`${artist._id}-genre-${index}`}
                                className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {artist.type?.map((type, index) => (
                              <span
                                key={`${artist._id}-type-${index}`}
                                className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm mt-auto line-clamp-2">
                            {artist.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}