import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../contexts/Context";
import { getAllFavourites, removeFavourite } from "../api/usersApi";
import { IoLocationOutline, IoClose } from "react-icons/io5";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import Button from "../components/Button";
import VenueCard from "../components/venuesPage/VenueCard";
import ArtistCard from "../components/artistsPage/ArtistCard";

export default function FavouritesPage() {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user, isLoading, error, favourites } = usersState;

  // Set default active tab based on user role - only on first mount
  const [activeTab, setActiveTab] = useState(
    user?.role === "venue" ? "artists" : "venues"
  );

  const venues = favourites
    .filter((fav) => fav.role === "venue")
    .map((venue) => ({
      ...venue,
      isFavourited: true,
    }));
  const artists = favourites.filter((fav) => fav.role === "artist");

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view favourites");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getAllFavourites(usersDispatch).catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to load favourites"
        );
      });
    }
  }, [user, usersDispatch]);

  const handleFavouriteClick = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await removeFavourite(usersDispatch, item._id);
    } catch (error) {
      toast.error("Failed to remove from favourites");
    }
  };

  const handleProfileClick = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mb-24">
      <h1 className="text-3xl font-bold mb-8">My Favourites</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8" aria-label="Dashboard Navigation">
          {user?.role === "venue" ? (
            <>
              <button
                onClick={() => setActiveTab("artists")}
                className={`
                  py-4 px-1 border-b-2 font-medium text-lg
                  ${
                    activeTab === "artists"
                      ? "border-green text-green"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                Artists
              </button>
              <button
                onClick={() => setActiveTab("venues")}
                className={`
                  py-4 px-1 border-b-2 font-medium text-lg
                  ${
                    activeTab === "venues"
                      ? "border-green text-green"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                Venues
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab("venues")}
                className={`
                  py-4 px-1 border-b-2 font-medium text-lg
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
                  py-4 px-1 border-b-2 font-medium text-lg
                  ${
                    activeTab === "artists"
                      ? "border-green text-green"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                Artists
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 pb-12">
          {activeTab === "venues" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Favourited Venues</h2>
              <p className="text-gray-500 mb-10">
                View and manage your favourite venues.
              </p>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {venues.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        No favourited venues yet
                      </p>
                      <Button
                        onClick={() => navigate("/venues")}
                        variant="black"
                      >
                        Browse Venues
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {venues.map((venue) => (
                        <VenueCard 
                          key={venue._id} 
                          venue={venue} 
                          onFavoriteClick={handleFavouriteClick}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {activeTab === "artists" && (
            <>
              <h2 className="text-xl font-semibold mb-2">Favourited Artists</h2>
              <p className="text-gray-500 mb-10">
                View and manage your favourite artists.
              </p>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {artists.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No favourite artists yet</p>
                      <Button
                        onClick={() => navigate("/artists")}
                        variant="black"
                      >
                        Browse Artists
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {artists.map((artist) => (
                        <ArtistCard 
                          key={artist._id} 
                          artist={artist} 
                          onFavoriteClick={handleFavouriteClick}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
