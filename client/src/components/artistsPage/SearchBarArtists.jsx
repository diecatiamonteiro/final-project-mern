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

export default function SearchBarArtists({ className, onSearch }) {
  const { usersDispatch } = useContext(DataContext);
  const [searchParams, setSearchParams] = useState({
    q: "",
    genres: [],
    performanceTypes: [],
  });

  const filterOptions = {
    genre: {
      "Music Genres": [
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
        "Dance",
      ],
      "Dance Styles": [
        "Contemporary",
        "Ballet",
        "Hip Hop Dance",
        "Jazz Dance",
        "Tap",
        "Street Dance",
        "Ballroom",
        "Traditional Dance",
        "Modern Dance",
        "Break Dance",
      ],
      "Comedy & Spoken Word": [
        "Stand-up",
        "Improv Comedy",
        "Slam Poetry",
        "Traditional Poetry",
      ],
      "Performance Arts": [
        "Magic",
        "Theater",
        "Drag",
        "Cabaret",
        "Burlesque",
        "Digital Performance",
      ],
      Other: ["Family-Friendly", "Adult", "Other"],
    },
    performanceType: {
      "Musical Acts": [
        "Band",
        "Duo",
        "Solo Artist",
        "Singer-Songwriter",
        "Rapper",
        "DJ",
        "Orchestra",
        "Ensemble",
      ],
      "Performing Acts": [
        "Dancer",
        "Comedian",
        "Poet",
        "Spoken Word Artist",
        "Magician",
        "Theatrical Performer",
        "Drag Performer",
        "Improv Performer",
      ],
      Other: [
        "Digital Artist",
        "Multi-disciplinary Artist",
        "Performance Collective",
        "Other",
      ],
    },
  };

  // Track which sections are open
  const [openSections, setOpenSections] = useState({
    performanceType: false,
    genre: false,
  });

  // Ref for dropdown containers
  const performanceTypeRef = useRef(null);
  const genreRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        performanceTypeRef.current &&
        !performanceTypeRef.current.contains(event.target)
      ) {
        setOpenSections((prev) => ({ ...prev, performanceType: false }));
      }
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setOpenSections((prev) => ({ ...prev, genre: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle handler to open and close the dropdowns
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Checkbox handler to close dropdown after selection
  const handleCheckboxChange = (category, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));

    // Close the respective dropdown
    const sectionKey = category === "genres" ? "genre" : "performanceType";
    setOpenSections((prev) => ({ ...prev, [sectionKey]: false }));
  };

  // Handler for text input
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
      searchParams.performanceTypes.length === 0 &&
      searchParams.genres.length === 0
    );
  };

  const handleSearch = () => {
    if (areAllInputsEmpty()) {
      toast.warning("Please enter a search criteria");
      return;
    }
    // Convert the arrays back to strings for the API
    const searchQuery = {
      q: searchParams.q,
      performanceType: searchParams.performanceTypes.join(","),
      genre: searchParams.genres.join(","),
    };
    searchForArtistOrVenue(usersDispatch, searchQuery);
    onSearch(true, searchQuery);
    setSearchParams({
      q: "",
      genres: [],
      performanceTypes: [],
    });
  };

  return (
    <div
      className={`mt-8 ${className} bg-midnightBlack/60 p-4 pb-6 rounded-xl border border-offwhite/30`}
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Artist Name Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="artistName" className="text-offwhite font-medium">
            Artist Name
          </label>
          <input
            type="text"
            name="q"
            placeholder="Type a Name"
            value={searchParams.q}
            onChange={handleInputChange}
            className="p-3 bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* Performance Types Section */}
        <div className="flex flex-col gap-2 relative" ref={performanceTypeRef}>
          <label
            htmlFor="performanceTypes"
            className="text-offwhite font-medium"
          >
            Performance Types
          </label>
          <button
            onClick={() => toggleSection("performanceType")}
            className="flex justify-between items-center text-offwhite bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl p-3 hover:bg-offwhite/30 transition-colors"
          >
            <span>
              Select Types{" "}
              {searchParams.performanceTypes.length > 0 &&
                `(${searchParams.performanceTypes.length})`}
            </span>
            {openSections.performanceType ? (
              <IoChevronUpOutline />
            ) : (
              <IoChevronDownOutline />
            )}
          </button>

          {openSections.performanceType && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-midnightBlack border border-offwhite/30 rounded-xl shadow-lg">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-midnightBlack to-transparent z-10 rounded-t-xl"></div>
                <div className="p-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-green/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                  {Object.entries(filterOptions.performanceType).map(
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
                                checked={searchParams.performanceTypes.includes(
                                  type
                                )}
                                onChange={() =>
                                  handleCheckboxChange("performanceTypes", type)
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

        {/* Genres Section */}
        <div className="flex flex-col gap-2 relative" ref={genreRef}>
          <label htmlFor="genres" className="text-offwhite font-medium">
            Genres
          </label>
          <button
            onClick={() => toggleSection("genre")}
            className="flex justify-between items-center text-offwhite bg-offwhite/20 backdrop-blur-sm border border-offwhite/30 rounded-xl p-3 hover:bg-offwhite/30 transition-colors"
          >
            <span>
              Select Genres{" "}
              {searchParams.genres.length > 0 &&
                `(${searchParams.genres.length})`}
            </span>
            {openSections.genre ? (
              <IoChevronUpOutline />
            ) : (
              <IoChevronDownOutline />
            )}
          </button>

          {openSections.genre && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-midnightBlack border border-offwhite/30 rounded-xl shadow-lg">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-midnightBlack to-transparent rounded-t-xl"></div>
                <div className="p-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-green/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                  {Object.entries(filterOptions.genre).map(
                    ([category, options]) => (
                      <div key={category} className="mb-4">
                        <h3 className="text-emerald-500 font-medium mb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {options.map((genre) => (
                            <label
                              key={genre}
                              className="flex items-start text-offwhite text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={searchParams.genres.includes(genre)}
                                onChange={() =>
                                  handleCheckboxChange("genres", genre)
                                }
                                className="mr-2 accent-green"
                              />
                              {genre}
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
          Search Artists{" "}
          <span className="ml-2">
            <IoSearchSharp className="text-2xl" />
          </span>
        </Button>
      </div>
    </div>
  );
}
