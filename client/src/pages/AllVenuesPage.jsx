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

  // Fetch favorites when user is logged in
  useEffect(() => {
    if (user) {
      getAllFavourites(usersDispatch);
    }
  }, [user]);

  // Add isFavourited flag to venue object if it exists in user's favourites array
  useEffect(() => {
    const updatedVenues =
      user &&
      venues &&
      venues.map((venue) => {
        const matchingFavourite = user?.favourites?.find(
          (favourite) => favourite._id === venue._id
        );

        if (matchingFavourite) {
          return { ...matchingFavourite, isFavourited: true };
        } else {
          return venue;
        }
      });

    setVenuesWithFavouriteStatus(updatedVenues);
  }, [venues, user?.favourites]); // Only re-run when venues or user favourites change

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
