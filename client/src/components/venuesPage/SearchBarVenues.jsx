import React, { useContext, useState, useEffect, useRef } from "react";
import Button from "../Button";
import {
  IoSearchSharp,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { DataContext } from "../../contexts/Context";
import { searchForArtistOrVenue } from "../../api/usersApi";
import { toast } from "react-toastify";

export default function SearchBar({ className, onSearch }) {
  const { usersDispatch } = useContext(DataContext);
  const [searchParams, setSearchParams] = useState({
    q: "",
    city: "",
    types: [], // Changed from single type to array
    revenueSplits: [], // Changed from single split to array
  });

  // Filter options restructured to match artists search bar format
  const filterOptions = {
    venueType: {
      "Entertainment Venues": [
        "Bar",
        "Jazz Bar",
        "Club",
        "Concert Hall",
        "Arena",
        "Comedy Club",
        "Cabaret Club",
        "Theater",
      ],
      "Outdoor Spaces": ["Outdoor Venue", "Rooftop Venue", "Festival"],
      "Cultural Spaces": [
        "Cultural Center",
        "Community Center",
        "Art Gallery",
        "Museum",
      ],
      "Hospitality Venues": ["Café", "Restaurant", "Hotel"],
      "Alternative Spaces": [
        "Co-working Space",
        "Bookstore",
        "Pop-up Space",
        "Other",
      ],
    },
    revenueSplit: {
      "Revenue Splits": ["100/0", "90/10", "80/20", "70/30", "60/40", "50/50"],
    },
  };

  // Track which sections are open
  const [openSections, setOpenSections] = useState({
    venueType: false,
    revenueSplit: false,
  });

  // Refs for dropdown containers
  const venueTypeRef = useRef(null);
  const revenueSplitRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        venueTypeRef.current &&
        !venueTypeRef.current.contains(event.target)
      ) {
        setOpenSections((prev) => ({ ...prev, venueType: false }));
      }
      if (
        revenueSplitRef.current &&
        !revenueSplitRef.current.contains(event.target)
      ) {
        setOpenSections((prev) => ({ ...prev, revenueSplit: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle handler
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Checkbox handler
  const handleCheckboxChange = (category, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));

    // Close the respective dropdown
    const sectionKey = category === "types" ? "venueType" : "revenueSplit";
    setOpenSections((prev) => ({ ...prev, [sectionKey]: false }));
  };

  // Handler for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const areAllInputsEmpty = () => {
    return (
      !searchParams.q &&
      !searchParams.city &&
      searchParams.types.length === 0 &&
      searchParams.revenueSplits.length === 0
    );
  };

  const handleSearch = () => {
    if (areAllInputsEmpty()) {
      toast.warning("Please enter a search criteria");
      return;
    }

    // Convert arrays to strings for API
    const searchQuery = {
      q: searchParams.q,
      city: searchParams.city,
      type: searchParams.types.join(","),
      revenueSplit: searchParams.revenueSplits.join(","),
    };

    searchForArtistOrVenue(usersDispatch, searchQuery);
    onSearch(true, searchQuery);
    setSearchParams({
      q: "",
      city: "",
      types: [],
      revenueSplits: [],
    });
  };

  return (
    <div
      className={`mt-8 ${className} bg-midnightBlack/60 p-4 pb-8 rounded-xl border border-offwhite/30`}
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Venue Name Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="venueName" className="text-offwhite font-medium">
            Venue Name
          </label>
          <input
            type="text"
            name="q"
            placeholder="Type a venue name"
            value={searchParams.q}
            onChange={handleInputChange}
            className="p-3 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* City Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-offwhite font-medium">
            Venue City
          </label>
          <input
            type="text"
            name="city"
            placeholder="Type a city"
            value={searchParams.city}
            onChange={handleInputChange}
            className="p-3 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* Venue Types Dropdown */}
        <div className="flex flex-col gap-2 relative" ref={venueTypeRef}>
          <label htmlFor="venueTypes" className="text-offwhite font-medium">
            Venue Types
          </label>
          <button
            onClick={() => toggleSection("venueType")}
            className="flex justify-between items-center text-offwhite bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl p-3 hover:bg-offwhite/30 transition-colors"
          >
            <span>
              Select Types{" "}
              {searchParams.types.length > 0 &&
                `(${searchParams.types.length})`}
            </span>
            {openSections.venueType ? (
              <IoChevronUpOutline />
            ) : (
              <IoChevronDownOutline />
            )}
          </button>

          {openSections.venueType && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-midnightBlack border border-offwhite/30 rounded-xl shadow-lg">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-midnightBlack to-transparent z-10 rounded-t-xl"></div>
                <div className="p-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-green/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                  {Object.entries(filterOptions.venueType).map(
                    ([category, options]) => (
                      <div key={category} className="mb-4">
                        <h3 className="text-emerald-500 font-medium mb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {options.map((type) => (
                            <label
                              key={type}
                              className="flex items-start text-offwhite text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={searchParams.types.includes(type)}
                                onChange={() =>
                                  handleCheckboxChange("types", type)
                                }
                                className="mr-2 accent-green"
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-midnightBlack to-transparent z-10 rounded-b-xl"></div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue Split Dropdown */}
        <div className="flex flex-col gap-2 relative" ref={revenueSplitRef}>
          <label htmlFor="revenueSplit" className="text-offwhite font-medium">
            Revenue Split % (Artist/Venue)
          </label>
          <button
            onClick={() => toggleSection("revenueSplit")}
            className="flex justify-between items-center text-offwhite bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl p-3 hover:bg-offwhite/30 transition-colors"
          >
            <span>
              Select Splits{" "}
              {searchParams.revenueSplits.length > 0 &&
                `(${searchParams.revenueSplits.length})`}
            </span>
            {openSections.revenueSplit ? (
              <IoChevronUpOutline />
            ) : (
              <IoChevronDownOutline />
            )}
          </button>

          {openSections.revenueSplit && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-midnightBlack border border-offwhite/30 rounded-xl shadow-lg">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-midnightBlack to-transparent z-10 rounded-t-xl"></div>
                <div className="p-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-green/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                  {Object.entries(filterOptions.revenueSplit).map(
                    ([category, options]) => (
                      <div key={category} className="mb-4">
                        <h3 className="text-emerald-500 font-medium mb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {options.map((split) => (
                            <label
                              key={split}
                              className="flex items-start text-offwhite text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={searchParams.revenueSplits.includes(
                                  split
                                )}
                                onChange={() =>
                                  handleCheckboxChange("revenueSplits", split)
                                }
                                className="mr-2 accent-green"
                              />
                              {split}
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-midnightBlack to-transparent z-10 rounded-b-xl"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
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
