import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/Context";
import { editBookingDate } from "../../../api/bookingsApi";
import { getAllSentBookings } from "../../../api/usersApi";
import BookingCard from "./BookingCard";
import BookingRequestCalendar from "../../calendars/BookingRequestCalendar";
import Button from "../../Button";
import { toast } from "react-toastify";

export default function SentBookings() {
  const { usersState, usersDispatch, bookingsDispatch } =
    useContext(DataContext);
  const { bookingsSent, isLoading, error } = usersState;
  const [showCalendar, setShowCalendar] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEditClick = (bookingId) => {
    setEditingBookingId(bookingId);
    setShowCalendar(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEdit = async () => {
    if (!selectedDate) return;

    try {
      await editBookingDate(bookingsDispatch, editingBookingId, {
        performanceDate: selectedDate.toISOString(),
      });

      // Refresh the bookings list after editing
      if (usersState.user?._id) {
        getAllSentBookings(usersDispatch, usersState.user._id);
      }

      // Reset states and show success message
      setShowCalendar(false);
      setSelectedDate(null);
      setEditingBookingId(null);
      toast.success("Booking date updated successfully");
    } catch (error) {
      console.error("Error editing booking:", error);
      toast.error("Failed to update booking date. Please try again.");
    }
  };

  const EditDateModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Booking Date</h2>
        <BookingRequestCalendar
          availableDates={[]} // You'll need to pass the available dates
          bookedDates={[]} // You'll need to pass the booked dates
          onRequestBooking={handleDateSelect}
        />
        <div className="flex gap-3 mt-4">
          <Button
            variant="green"
            className="flex-1"
            onClick={handleEdit}
            disabled={!selectedDate}
          >
            Confirm
          </Button>
          <Button
            variant="white"
            className="flex-1"
            onClick={() => {
              setShowCalendar(false);
              setSelectedDate(null);
              setEditingBookingId(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  // Filter out accepted bookings as they should appear in My Gigs
  const pendingBookings = bookingsSent?.filter(
    (booking) => booking.status === "pending"
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading bookings...</div>;
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
            onEdit={() => handleEditClick(booking._id)}
          />
        ))}
      </div>
      {showCalendar && <EditDateModal />}
    </>
  );
}
