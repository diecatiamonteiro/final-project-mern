/*import React from 'react'

export default function FavouritesPage() {
  return (
    <div>FavouritesPage</div>
  )
}*/

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../contexts/Context";
import { getAllFavourites, removeFavourite } from "../api/usersApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function FavouritesPage() {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user, isLoading, error, favourites } = usersState;

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to view favorites");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch favorites on mount
  useEffect(() => {
    if (user) {
      getAllFavourites(usersDispatch).catch((error) => {
        toast.error(error.response?.data?.message || "Failed to load favorites");
      });
    }
  }, [user, usersDispatch]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavourite(usersDispatch, favoriteId);
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from favorites");
    }
  };

  const handleProfileClick = (favorite) => {
    const route = favorite.role === "artist" ? "artist" : "venue";
    navigate(`/${route}/${favorite._id}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 mb-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-midnightBlack">
          Unable to load favorites
        </h1>
        <p className="text-base md:text-lg text-midnightBlack/70">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Favorites</h1>

      {favourites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">You haven't added any favorites yet.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/artists")}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Browse Artists
            </button>
            <button
              onClick={() => navigate("/venues")}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Browse Venues
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((favorite) => (
            <div
              key={favorite._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={favorite.profilePicture}
                  alt={favorite.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleRemoveFavorite(favorite._id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Remove from favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{favorite.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {favorite.role}
                  </span>
                  {favorite.type?.map((type, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {favorite.description}
                </p>
                {favorite.role === "venue" && favorite.additionalInfo?.revenueSplit && (
                  <p className="text-sm text-gray-500 mb-4">
                    Revenue Split: {favorite.additionalInfo.revenueSplit}
                  </p>
                )}
                <button
                  onClick={() => handleProfileClick(favorite)}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}