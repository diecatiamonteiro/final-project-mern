import { useEffect, useContext } from "react";
import { DataContext } from "../../../contexts/Context";
import { getAllAcceptedBookings } from "../../../api/bookingsApi";
import GigCard from "./GigCard";
import LoadingSpinner from "../../LoadingSpinner";

export default function MyGigs() {
  const { bookingsState, bookingsDispatch } = useContext(DataContext);
  const { allAcceptedBookings, isLoading, error } = bookingsState;

  useEffect(() => {
    getAllAcceptedBookings(bookingsDispatch);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (!allAcceptedBookings?.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No confirmed gigs yet
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {allAcceptedBookings.map((gig) => (
        <GigCard key={gig._id} gig={gig} />
      ))}
    </div>
  );
}
