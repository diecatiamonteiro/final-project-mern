import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button";
import { DataContext } from "../../contexts/Context";
import { addFavourite, removeFavourite } from "../../api/usersApi";
import { IoLocationOutline, IoClose } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function VenueCard({ venue, onFavoriteClick }) {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);

  const handleFavouriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onFavoriteClick) {
      // Use custom handler if provided (for FavouritesPage)
      onFavoriteClick(e, venue);
      return;
    }

    // Default favorite handling logic
    if (!usersState.user) {
      toast.error("Please login to favourite venues.");
      return;
    }

    // Prevent self-favouriting
    if (venue._id === usersState.user._id) {
      toast.error("You cannot add yourself to favourites.");
      return;
    }

    // Update favourites
    try {
      if (venue.isFavourited) {
        await removeFavourite(usersDispatch, venue._id);
        toast.success("Venue removed from favourites.");
      } else {
        await addFavourite(usersDispatch, venue._id);
        toast.success("Venue added to favourites.");
      }
    } catch (error) {
      console.error("Failed to update favourites:", error);
      toast.error("Failed to update favourites.");
    }
  };

  const isOwnProfile = usersState.user?._id === venue?._id;

  return (
    <div
      className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col transform transition-transform hover:scale-[1.02]"
      onClick={(e) => {
        // Only handle click on non-mobile screens (from md size and up)
        if (window.innerWidth >= 768) {
          navigate(`/venue/${venue._id}`);
        }
      }}
    >
      {/* Image Section */}
      <div className="relative w-full">
        <img
          src={venue.profilePicture}
          alt={venue.name || "Venue Profile Picture"}
          className="w-full h-52 object-cover"
        />

        {/* Revenue Split Badge */}
        <div className="absolute top-4 left-4 p-2 bg-midnightBlack/70 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-white">
            Split:{" "}
            {venue.additionalInfo?.revenueSplit?.split("/")[0] || "Not Set "}%
            artist /{" "}
            {venue.additionalInfo?.revenueSplit?.split("/")[1] || "Not Set "}%
            venue
          </p>
        </div>

        {/* Favourite Button */}
        {!isOwnProfile && (
          <button
            onClick={handleFavouriteClick}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-midnightBlack/30 shadow-midnightBlack/10 hover:scale-[1.05] duration-300 cursor-pointer"
        >
          {onFavoriteClick ? (
            <IoClose className="text-xl text-red-500" />
          ) : venue.isFavourited ? (
            <FaHeart className="text-xl text-red-500" />
          ) : (
              <FaRegHeart className="text-xl text-midnightBlack" />
            )}
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-1">
            {venue.name || "Venue Name Not Available"}
          </h3>

          <p className="mb-4 flex items-center">
            <span className="inline-block mr-2">
              <IoLocationOutline />
            </span>
            {venue.additionalInfo?.address?.city || "Venue City Not Available"}
          </p>

          <p className="text-midnightBlack/80 mb-4 flex flex-wrap gap-2">
            {venue.type?.length > 0 ? (
              venue.type.map((type) => (
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
          </p>

          <p className="mb-8 line-clamp-2 leading-snug">
            {venue.description || "Venue Description Not Available"}
          </p>
        </div>

        <Button
          onClick={() => navigate(`/venue/${venue._id}`)}
          variant="green"
          size="small"
          className="md:hidden"
        >
          View Venue Profile
        </Button>
      </div>
    </div>
  );
}
