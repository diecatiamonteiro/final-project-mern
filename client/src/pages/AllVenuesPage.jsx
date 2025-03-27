import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/Context";
import { getAllVenues, getAllFavourites } from "../api/usersApi";
import LoadingSpinner from "../components/LoadingSpinner";
import VenueCardVenuesPage from "../components/VenueCardVenuesPage";

export default function AllVenuesPage() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading, error, venues, user } = usersState;
  const [venuesWithFavouriteStatus, setVenuesWithFavouriteStatus] = useState(
    []
  );

  // Fetch all venues when the page is loaded
  useEffect(() => {
    if (!venues.length) {
      getAllVenues(usersDispatch);
    }
  }, []);

  // Only fetch favourites when user logs in (not when user favourites a venue, avoiding unnecessary re-renders)
  useEffect(() => {
    if (user && !user.favourites) {
      getAllFavourites(usersDispatch);
    }
  }, [user]); // Only depend on user, not user.favourites

  // Add isFavourited flag only when venues change or user changes (not when favourites change)
  useEffect(() => {
    const updatedVenues = venues?.map((venue) => {
      if (!user || !user.favourites) return venue; // If there's no user, or no favourites, just return the venue as is

      const matchingFavourite = user.favourites.find(
        (favourite) => favourite._id === venue._id
      ); // Find the matching favourite venue object in the user's favourites array

      if (matchingFavourite) {
        return { ...matchingFavourite, isFavourited: true }; // Add isFavourited:true flag to venue object if it exists in user's favourites array
      } else {
        return { ...venue, isFavourited: false }; // Add isFavourited:false flag to venue object if it doesn't exist in user's favourites array
      }
    });

    setVenuesWithFavouriteStatus(updatedVenues);
  }, [venues, user]); // Only re-run when venues or user change

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
    <div className="max-w-7xl mx-auto px-4 mb-24">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        The Greenroom Venues
      </h1>
      <h2 className="text-xl md:text-2xl  font-medium mb-12 md:mb-16 lg:mb-24">
        Your next gig is just a click away. Browse through our list of venues
        and find the perfect stage for you.
      </h2>

      {/* Venues cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(venues) && venues.length > 0 ? (
          venuesWithFavouriteStatus &&
          venuesWithFavouriteStatus.map((venue) => (
            <VenueCardVenuesPage key={venue._id} venue={venue} />
          ))
        ) : (
          <div className="text-base md:text-lg text-midnightBlack/70">
            No venues found
          </div>
        )}
      </div>
    </div>
  );
}
