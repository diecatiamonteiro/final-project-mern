import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button";
import { DataContext } from "../../contexts/Context";
import { addFavourite, removeFavourite } from "../../api/usersApi";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function ArtistCardArtistsPage({ artist }) {
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
    if (artist._id === usersState.user._id) {
      toast.error("You cannot add yourself to favourites.");
      return;
    }

    // Update favourites
    try {
      if (artist.isFavourited) {
        await removeFavourite(usersDispatch, artist._id);
        toast.success("Artist removed from favourites.");
      } else {
        await addFavourite(usersDispatch, artist._id);
        toast.success("Artist added to favourites.");
      }
    } catch (error) {
      console.error("Failed to update favourites:", error);
      toast.error("Failed to update favourites.");
    }
  };

  return (
    <div
      className="bg-offwhite border border-midnightBlack/10 rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col transform transition-transform hover:scale-[1.02]"
      onClick={() => navigate(`/artist/${artist._id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full">
        <img
          src={artist.profilePicture}
          alt={artist.name}
          className="w-full h-52 object-cover"
        />

        {/* Favourite Button */}
        <button
          onClick={handleFavouriteClick}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-midnightBlack/30 shadow-midnightBlack/10 hover:scale-[1.05] duration-300 cursor-pointer"
        >
          {artist.isFavourited ? (
            <FaHeart className="text-xl text-red-500" />
          ) : (
            <FaRegHeart className="text-xl text-midnightBlack" />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-4">
            {artist.name}
          </h3>

          <p className="text-midnightBlack/80 mb-2 flex flex-wrap gap-2">
            {artist.type?.map((type) => (
              <span
                key={type}
                className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
          </p>

          <p className="text-midnightBlack/80 mb-4 flex flex-wrap gap-2">
            {artist.additionalInfo?.genre.map((genre) => (
              <span
                key={genre}
                className="border border-midnightBlack/50 text-midnightBlack text-sm px-3 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </p>

          <p className="mb-8 line-clamp-3 leading-snug">{artist.description}</p>
        </div>

        <Button
          onClick={() => navigate(`/artist/${artist._id}`)}
          variant="green"
          size="small"
          className="md:hidden"
        >
          View Artist Profile
        </Button>
      </div>
    </div>
  );
}
