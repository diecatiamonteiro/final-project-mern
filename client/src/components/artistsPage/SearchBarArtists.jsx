import React, { useContext, useState } from "react";
import Button from "../Button";
import { IoSearchSharp } from "react-icons/io5";
import { DataContext } from "../../contexts/Context";
import { searchForArtistOrVenue } from "../../api/usersApi";
import { toast } from "react-toastify";

export default function SearchBarArtists({ className, onSearch }) {
  const { usersDispatch } = useContext(DataContext);
  const [searchParams, setSearchParams] = useState({
    q: "", // for artist name
    genre: "",
    performanceType: "",
  }); // State for search functionality

  // Filter options
  const filterOptions = {
    genre: [
      "Rock",
      "Pop",
      "Jazz",
      "Classical",
      "Electronic",
      "Hip Hop",
      "R&B",
      "Folk",
      "Folk Rock",
      "Country",
      "Blues",
      "Dream Pop",
      "Disco",
      "Metal",
      "Indie",
      "Indie Rock",
      "Indie Pop",
      "Alternative",
      "Art Pop",
      "Experimental",
      "Psychedelic Rock",
      "Garage Rock",
      "Soul",
      "Funk",
      "Punk",
      "World Music",
      "Reggae",
      "Latin",
      "EDM",
      "Other",
    ],
    performanceType: [
      "Band",
      "Duo",
      "Solo Artist",
      "Singer-Songwriter",
      "Rapper",
      "DJ",
      "Orchestra",
      "Ensemble",
      "Other",
    ],
  };

  // Handler for all input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Check if all inputs are empty
  const areAllInputsEmpty = () => {
    return (
      !searchParams.q && !searchParams.performanceType && !searchParams.genre
    );
  };

  const handleSearch = () => {
    // Check if all inputs are empty before triggering search
    if (areAllInputsEmpty()) {
      toast.warning("Please enter a search criteria");
      return;
    }
    searchForArtistOrVenue(usersDispatch, searchParams);
    onSearch(true, searchParams); // Tell parent component (AllArtistsPage) that a search was triggered and pass the search params as second argument (needed for the no results message in AllArtistsPage)
    setSearchParams({
      q: "",
      performanceType: "",
      genre: "",
    }); // Reset search parameters after search
  };

  return (
    <div
      className={`mt-8 ${className} bg-midnightBlack/60 p-4 pb-12 rounded-xl border border-offwhite/30`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Artist Name Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="artistName" className="text-offwhite font-medium">
            Artist name
          </label>
          <input
            type="text"
            name="q"
            placeholder="Type in an artist name"
            value={searchParams.q}
            onChange={handleInputChange}
            className="px-4 py-2 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* Performance Type Select */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="performanceType"
            className="text-offwhite font-medium"
          >
            Performance Type
          </label>
          <select
            name="performanceType"
            value={searchParams.performanceType}
            onChange={handleInputChange}
            className="px-4 py-2 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite focus:outline-none focus:ring-2 focus:ring-green"
          >
            <option value="" className="text-offwhite bg-midnightBlack/80">
              Select a Type
            </option>
            {filterOptions.performanceType.map((type) => (
              <option
                key={type}
                value={type}
                className="text-offwhite bg-midnightBlack/80"
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Select */}
        <div className="flex flex-col gap-2">
          <label htmlFor="genre" className="text-offwhite font-medium">
            Genre
          </label>
          <select
            name="genre"
            value={searchParams.genre}
            onChange={handleInputChange}
            className="px-4 py-2 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite focus:outline-none focus:ring-2 focus:ring-green"
          >
            <option value="" className="text-offwhite bg-midnightBlack/80">
              Select a Genre
            </option>
            {filterOptions.genre.map((genre) => (
              <option
                key={genre}
                value={genre}
                className="text-offwhite bg-midnightBlack/80"
              >
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSearch}
            variant="green"
            className="flex items-center"
          >
            Search Artists{" "}
            <span className="ml-2">
              <IoSearchSharp className="text-2xl" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
