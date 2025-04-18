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

  const handleEditClick = async (booking) => {
    setEditingBooking(booking);

    try {
      const { data } = await axios.get(
        `/api/users/${booking.receivedBy._id}/bookings/received`
      );

      if (!data || !data.data) {
        throw new Error("Invalid response format");
      }

      const acceptedSentBookings =
        data.data?.bookingsSent
          ?.filter((booking) => booking.status === "accepted")
          .map((booking) => booking.performanceDate) || [];

      const acceptedReceivedBookings =
        data.data?.bookingsReceive
          ?.filter((booking) => booking.status === "accepted")
          .map((booking) => booking.performanceDate) || [];

      const allAcceptedBookings = [
        ...acceptedSentBookings,
        ...acceptedReceivedBookings,
      ].filter((date) => date !== booking.performanceDate);

      setEditingBooking((prev) => ({
        ...prev,
        receivedBy: {
          ...prev.receivedBy,
          bookedDates: allAcceptedBookings,
        },
      }));

      setShowCalendar(true);
    } catch (error) {
      console.error("Error fetching receiver's bookings:", error);
      toast.error("Failed to fetch availability");
    }
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
