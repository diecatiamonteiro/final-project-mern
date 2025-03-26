import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "./Button";
import { DataContext } from "../contexts/Context";
import { addFavourite, removeFavourite } from "../api/usersApi";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function VenueCardVenuesPage({ venue }) {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);

  const handleFavouriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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

  return (
    <div className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02]">
      {/* Image Section */}
      <div className="relative w-full">
        <img
          src={venue.profilePicture}
          alt={venue.name}
          className="w-full h-52 object-cover"
        />

        {/* Revenue Split Badge */}
        <div className="absolute top-4 left-4 p-2 bg-midnightBlack/70 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-white">
            Split: {venue.additionalInfo.revenueSplit.split("/")[0]}% artist /{" "}
            {venue.additionalInfo.revenueSplit.split("/")[1]}% venue
          </p>
        </div>

        {/* Favourite Button */}
        <button
          onClick={handleFavouriteClick}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-midnightBlack/30 shadow-midnightBlack/10 hover:scale-[1.05] duration-300 cursor-pointer"
        >
          {venue.isFavourited ? (
            <FaHeart className="text-xl text-red-500" />
          ) : (
            <FaRegHeart className="text-xl text-midnightBlack" />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-1">
            {venue.name}
          </h3>

          <p className="mb-4 flex items-center">
            <span className="inline-block mr-2">
              <IoLocationOutline />
            </span>
            {venue.additionalInfo.address.city}
          </p>

          <p className="text-midnightBlack/80 mb-4 flex flex-wrap gap-2">
            {venue.type.map((type) => (
              <span
                key={type}
                className="bg-midnightBlack/10 px-2 py-1 rounded-xl text-sm"
              >
                {type}
              </span>
            ))}
          </p>

          <p className="mb-8 line-clamp-2 leading-snug">{venue.description}</p>
        </div>

        <Button
          onClick={() => navigate(`/venue/${venue._id}`)}
          variant="green"
          size="small"
        >
          View Venue Profile
        </Button>
      </div>
    </div>
  );
}
