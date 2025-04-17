import { useContext } from "react";
import { DataContext } from "../../../contexts/Context";
import {
  acceptBooking,
  declineBooking,
  getAllAcceptedBookings,
} from "../../../api/bookingsApi";
import { getAllReceivedBookings } from "../../../api/usersApi";
import BookingCard from "./BookingCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";

export default function ReceivedBookings() {
  const { usersState, usersDispatch, bookingsDispatch } =
    useContext(DataContext);
  const { bookingsReceived, isLoading, error } = usersState;

  const handleAccept = async (bookingId) => {
    try {
      await acceptBooking(bookingsDispatch, bookingId);
      // Refresh both bookings and gigs lists after accepting
      if (usersState.user?._id) {
        getAllReceivedBookings(usersDispatch, usersState.user._id);
        getAllAcceptedBookings(bookingsDispatch);
      }
      toast.success("Booking accepted! Find it in My Confirmed Gigs.");
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Failed to accept booking. Please try again.");
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      await declineBooking(bookingsDispatch, bookingId);
      // Refresh the bookings list after declining
      if (usersState.user?._id) {
        getAllReceivedBookings(usersDispatch, usersState.user._id);
      }
      toast.success("Booking declined.");
    } catch (error) {
      console.error("Error declining booking:", error);
      toast.error("Failed to decline booking. Please try again.");
    }
  };

  // Filter out accepted bookings as they should appear in My Gigs
  const pendingBookings = bookingsReceived?.filter(
    (booking) => booking.status === "pending"
  );

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

  if (!pendingBookings?.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No pending booking requests yet
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pendingBookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          type="received"
          onAccept={() => handleAccept(booking._id)}
          onDecline={() => handleDecline(booking._id)}
        />
      ))}
    </div>
  );
}
