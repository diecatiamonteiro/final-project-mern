import React, { useContext, useState } from "react";
import Button from "../Button";
import { IoSearchSharp } from "react-icons/io5";
import { DataContext } from "../../contexts/Context";
import { searchForArtistOrVenue } from "../../api/usersApi";
import { toast } from "react-toastify";

export default function SearchBar({ className, onSearch }) {
  const { usersDispatch } = useContext(DataContext);
  const [searchParams, setSearchParams] = useState({
    q: "", // for venue name
    city: "",
    type: "",
    revenueSplit: "",
  }); // State for search functionality

  // Filter options
  const filterOptions = {
    venueType: [
      "Bar",
      "Café",
      "Club",
      "Pub",
      "Restaurant",
      "Live Music Venue",
      "Theater",
      "Art Gallery",
      "Community Center",
      "Cultural Center",
      "Cultural Space",
      "Outdoor Venue",
      "Concert Hall",
      "Concert Venue",
      "Music Venue",
      "Jazz Club",
      "Underground Venue",
      "Co-working Space",
      "Bookstore",
      "Event Space",
      "Hotel Lounge",
      "Rooftop Venue",
      "Pop-up Space",
      "Other",
    ],
    revenueSplit: ["100/0", "90/10", "80/20", "70/30", "60/40", "50/50"],
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
      !searchParams.q &&
      !searchParams.city &&
      !searchParams.type &&
      !searchParams.revenueSplit
    );
  };

  const handleSearch = () => {
    // Check if all inputs are empty before triggering search
    if (areAllInputsEmpty()) {
      toast.warning("Please enter a search criteria");
      return;
    }
    searchForArtistOrVenue(usersDispatch, searchParams);
    onSearch(true, searchParams); // Tell parent component (AllVenuesPage) that a search was triggered and pass the search params as second argument (needed for the no results message in AllVenuesPage)
  };

  return (
    <div
      className={`mt-8 ${className} bg-midnightBlack/60 p-4 rounded-xl border border-offwhite/30`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Venue Name Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="venueName" className="text-offwhite font-medium">
            Venue name
          </label>
          <input
            type="text"
            name="q"
            placeholder="Type in a venue name"
            value={searchParams.q}
            onChange={handleInputChange}
            className="px-4 py-2 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* City Search */}
        <div className="flex flex-col gap-2 items">
          <label htmlFor="city" className="text-offwhite font-medium">
            Venue City
          </label>
          <input
            type="text"
            name="city"
            placeholder="Type in a city"
            value={searchParams.city}
            onChange={handleInputChange}
            className="px-4 py-2 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* Venue Type Select */}
        <div className="flex flex-col gap-2">
          <label htmlFor="venueType" className="text-offwhite font-medium">
            Venue Type
          </label>
          <select
            name="type"
            value={searchParams.type}
            onChange={handleInputChange}
            className="px-4 py-2 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite focus:outline-none focus:ring-2 focus:ring-green"
          >
            <option value="" className="text-offwhite bg-midnightBlack/80">
              Select a Type
            </option>
            {filterOptions.venueType.map((type) => (
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

        {/* Revenue Split Select */}
        <div className="flex flex-col gap-2">
          <label htmlFor="revenueSplit" className="text-offwhite font-medium">
            Revenue Split % (Artist/Venue)
          </label>
          <select
            name="revenueSplit"
            value={searchParams.revenueSplit}
            onChange={handleInputChange}
            className="px-4 py-2 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite focus:outline-none focus:ring-2 focus:ring-green"
          >
            <option value="" className="text-offwhite bg-midnightBlack/80">
              Select a Split
            </option>
            {filterOptions.revenueSplit.map((split) => (
              <option
                key={split}
                value={split}
                className="text-offwhite bg-midnightBlack/80"
              >
                {split}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          onClick={handleSearch}
          variant="green"
          className="flex items-center"
        >
          Search Venues{" "}
          <span className="ml-2">
            <IoSearchSharp className="text-2xl" />
          </span>
        </Button>
      </div>
    </div>
  );
}
