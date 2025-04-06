import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/Context";
import { editBookingDate } from "../../../api/bookingsApi";
import { getAllSentBookings } from "../../../api/usersApi";
import BookingCard from "./BookingCard";
import { toast } from "react-toastify";
import Modal from "../../Modal";
import LoadingSpinner from "../../LoadingSpinner";
import EditBookingCalendar from "../../calendars/EditBookingCalendar";
import axios from "axios";

export default function SentBookings() {
  const { usersState, usersDispatch, bookingsDispatch } =
    useContext(DataContext);
  const { bookingsSent, isLoading, error } = usersState;
  const [showCalendar, setShowCalendar] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setShowCalendar(true);

    // Get all accepted bookings from the receiver (venue/artist)
    const getReceiverAcceptedGigs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/users/${booking.receivedBy._id}`
        );

        const acceptedSentBookings = data.data.bookingsSent
          .filter((booking) => booking.status === "accepted")
          .map((booking) => booking.performanceDate);

        const acceptedReceivedBookings = data.data.bookingsReceived
          .filter((booking) => booking.status === "accepted")
          .map((booking) => booking.performanceDate);

        const allAcceptedBookings = [
          ...acceptedSentBookings,
          ...acceptedReceivedBookings,
        ].filter((date) => date !== booking.performanceDate); // Exclude current booking's date

        // Update the editingBooking with the accepted bookings
        setEditingBooking((prev) => ({
          ...prev,
          receivedBy: {
            ...prev.receivedBy,
            bookedDates: allAcceptedBookings,
          },
        }));
      } catch (error) {
        console.error("Error fetching receiver's bookings:", error);
        toast.error("Failed to fetch availability");
      }
    };

    getReceiverAcceptedGigs();
  };

  const handleConfirm = async (date) => {
    try {
      await editBookingDate(bookingsDispatch, editingBooking._id, {
        performanceDate: date.toISOString(),
      });

      if (usersState.user?._id) {
        getAllSentBookings(usersDispatch, usersState.user._id);
      }

      setShowCalendar(false);
      setEditingBooking(null);
      toast.success("Booking date updated successfully");
    } catch (error) {
      console.error("Error editing booking:", error);

      // Display specific error message from the API if available
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Failed to update booking date. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setShowCalendar(false);
    setEditingBooking(null);
  };

  const EditDateModal = () => (
    <Modal title="Edit Booking Date" onClose={handleCancel}>
      <div className="p-6 max-w-[350px] mx-auto w-full">
        <EditBookingCalendar
          availableDates={editingBooking?.receivedBy?.availability || []}
          bookedDates={editingBooking?.receivedBy?.bookedDates || []}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </Modal>
  );

  // Filter out accepted bookings as they should appear in My Gigs
  const pendingBookings = bookingsSent?.filter(
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
        No pending booking requests
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pendingBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            type="sent"
            onEdit={() => handleEditClick(booking)}
          />
        ))}
      </div>
      {showCalendar && <EditDateModal />}
    </>
  );
}
