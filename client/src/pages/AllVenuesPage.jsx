import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/Context";
import { getAllVenues, getAllFavourites } from "../api/usersApi";
import LoadingSpinner from "../components/LoadingSpinner";
import VenueCard from "../components/venuesPage/VenueCard";
import heroImage from "../assets/venuesPage/venuesPage-heroImage.jpg";
import SearchBar from "../components/venuesPage/SearchBarVenues";
import Button from "../components/Button";
import { USER_ACTIONS } from "../reducers/usersReducer";
import { FaArrowUpLong } from "react-icons/fa6";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AllVenuesPage() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading, error, venues, searchResults, user } = usersState;
  const [searchParams] = useSearchParams();
  const [venuesWithFavouriteStatus, setVenuesWithFavouriteStatus] = useState(
    []
  );
  const [searchTriggered, setSearchTriggered] = useState(false); // flags when a search was triggered in the SearchBarVenues component so we can display a message of no results found
  const [currentSearchParams, setCurrentSearchParams] = useState({}); // params are needed for the no results message and are passed from the SearchBarVenues component (see line 96 on this file)
  const [showScrollButton, setShowScrollButton] = useState(false);
  const navigate = useNavigate();

  // Show button "To Top" after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ************************************

  // Fetch all venues when the page is loaded
  useEffect(() => {
    if (!venues.length) {
      getAllVenues(usersDispatch);
    }
  }, []);

  // Fetch all favourites when user logs in
  useEffect(() => {
    if (user && !user.favourites) {
      getAllFavourites(usersDispatch);
    }
  }, [user]);

  // ************************************

  // Handle initial city parameter from PopularCities in homepage
  useEffect(() => {
    const city = searchParams.get("city");

    // Only filter by city if no other search has been triggered
    if (city && venues.length > 0 && !searchTriggered) {
      usersDispatch({
        type: USER_ACTIONS.SEARCH_FOR_ARTIST_OR_VENUE,
        payload: {
          data: venues.filter(
            (venue) =>
              venue.additionalInfo?.address?.city?.toLowerCase() ===
              city.toLowerCase()
          ),
        },
      });
      setSearchTriggered(true);
      setCurrentSearchParams({ city });
    }
  }, [searchParams, venues, usersDispatch, searchTriggered]);

  // ************************************

  // Update the list of venues with 'isFavourited' status for each venue
  useEffect(() => {
    // Decide which list of venues to work with: If there are search results, use that list. Otherwise, fall back to showing all venues.
    const baseVenues = searchResults.length > 0 ? searchResults : venues;

    // For each venue in the selected list, add an 'isFavourited' flag depending on whether the logged-in user has favourited it. If there's no user or no favourites list yet, assume this venue is NOT favourited
    const updatedVenues = baseVenues?.map((venue) => {
      if (!user || !user.favourites) return { ...venue, isFavourited: false };

      // Try to find this venue in the user's list of favourites
      const matchingFavourite = user.favourites.find(
        (favourite) => favourite._id === venue._id
      );

      // If it's found, merge it with the venue data and set 'isFavourited' to true. Otherwise, return the venue as is with 'isFavourited: false'
      if (matchingFavourite) {
        return { ...venue, ...matchingFavourite, isFavourited: true };
      } else {
        return { ...venue, isFavourited: false };
      }
    });

    // Update local state with the new list that includes favourite status
    setVenuesWithFavouriteStatus(updatedVenues);
  }, [venues, user, searchResults]);
  // This effect runs every time: the full venue list changes, the logged-in user or their favourites change, or the search results change

  // Update this function
  const handleClearSearch = () => {
    // Clear all states and search results
    usersDispatch({ type: USER_ACTIONS.CLEAR_SEARCH });

    // Clear the search params
    setCurrentSearchParams({});

    // Clear URL parameters
    if (searchParams.get("city")) {
      navigate("/venues", { replace: true });
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 mb-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-midnightBlack">
          We cannot show you all our venues at the moment. Try refreshing the
          page.
        </h1>
        <p className="text-base md:text-lg text-midnightBlack/70">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative mt-[-110px]">
        {/* Hero Image */}
        <div className="full-width-section h-[90vh] md:h-[70vh] xl:h-[60vh]">
          <img
            src={heroImage}
            alt="stage set for a gig"
            className="w-full h-full object-cover brightness-75 grayscale"
          />
        </div>

        {/* Hero Text & Search Bar*/}
        <div className="absolute top-0 left-0 right-0 px-4 lg:px-6 2xl:px-0 mt-16">
          <div className="max-width-content flex flex-col justify-start">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-offwhite">
              The Greenroom Venues
            </h1>
            <h2 className="text-xl w-full md:w-2/3 lg:w-1/2 md:text-2xl font-medium text-offwhite/80">
              Your next gig is just a click away. Browse through our list of
              venues and find the perfect stage for you.
            </h2>

            {/* onSearch flags when a search was triggered in the SearchBarVenues line 73 - this allows us to flag when no results are found and display a message of no results found. Params are the search params passed from the SearchBarVenues component and are needed here for the no results message */}
            <SearchBar
              onSearch={(triggered, params) => {
                setSearchTriggered(triggered);
                setCurrentSearchParams(params);
                // If there's a city in the URL but user makes a new search, we can optionally clear the URL parameter
                if (triggered && searchParams.get("city")) {
                  window.history.replaceState({}, "", "/venues");
                }
              }}
              initialCity={searchParams.get("city")} // Pass initial city to SearchBar
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-16">
          {/* No Results Message */}
          {searchTriggered &&
            searchResults.length === 0 &&
            Object.keys(currentSearchParams).length > 0 && (
              <div className="text-center">
                <p className="text-base md:text-lg lg:text-2xl bg-white rounded-lg p-4 shadow-lg">
                  No venues found
                  {currentSearchParams.q &&
                    ` matching "${currentSearchParams.q}"`}
                  {currentSearchParams.type &&
                    ` in type "${currentSearchParams.type}"`}
                  {currentSearchParams.city &&
                    ` in ${
                      currentSearchParams.city.charAt(0).toUpperCase() +
                      currentSearchParams.city.slice(1)
                    }`}
                  {currentSearchParams.revenueSplit &&
                    ` with ${currentSearchParams.revenueSplit} revenue split`}
                  .
                </p>
              </div>
            )}

          {/* Search Results Message */}
          {searchResults.length > 0 ? (
            <div className="flex flex-wrap items-center gap-8 my-8 md:my-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {searchResults.length > 0
                  ? `Venues ${
                      currentSearchParams.q
                        ? `matching "${currentSearchParams.q}"`
                        : ""
                    }${
                      currentSearchParams.type
                        ? `in type "${currentSearchParams.type}"`
                        : ""
                    }${
                      currentSearchParams.city
                        ? ` in ${
                            currentSearchParams.city.charAt(0).toUpperCase() +
                            currentSearchParams.city.slice(1)
                          }`
                        : ""
                    }${
                      currentSearchParams.revenueSplit
                        ? ` with ${currentSearchParams.revenueSplit} revenue split`
                        : ""
                    } (${searchResults.length})`
                  : "All Venues"}
              </h2>
              <Button variant="black" size="small" onClick={handleClearSearch}>
                Clear Search
              </Button>
            </div>
          ) : (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold my-8 md:my-16">
              All Venues
            </h2>
          )}

          {/* All Venues Cards - not filtered by search results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {Array.isArray(venues) && venues.length > 0 ? (
              venuesWithFavouriteStatus &&
              venuesWithFavouriteStatus.map((venue) => (
                <VenueCard key={venue._id} venue={venue} />
              ))
            ) : (
              <div className="text-base md:text-lg text-midnightBlack/70">
                No venues found
              </div>
            )}
          </div>
        </div>
      )}
      {/* DIV END */}

      {/* To top button - only shown when scrolling down after 300px */}
      {showScrollButton && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="black"
            size="small"
            className="flex flex-row items-center gap-1"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaArrowUpLong /> To Top
          </Button>
        </div>
      )}
    </>
  );
}
