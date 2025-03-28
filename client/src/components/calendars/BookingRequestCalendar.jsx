import { useState, useMemo, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../../contexts/Context";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { requestArtistOrVenue } from "../../api/bookingsApi";
import { format } from "date-fns";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

// For the artist/venue page - shows availability and allows booking requests
export default function BookingRequestCalendar({
  availableDates = [],
  bookedDates = [],
  onRequestBooking,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { bookingsDispatch, usersState } = useContext(DataContext);
  const { id } = useParams();

  console.log(selectedDate);

  // Convert dates once when props change
  const convertedAvailableDates = useMemo(
    () => availableDates.map((date) => new Date(date)),
    [availableDates]
  );

  const convertedBookedDates = useMemo(
    () => bookedDates.map((date) => new Date(date)),
    [bookedDates]
  );

  const handleDateSelect = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    );

    setSelectedDate(utcDate); // Temporarily show green highlight

    // Remove highlight after animation
    // setTimeout(() => {
    //   setSelectedDate(null);
    // }, 300);

    onRequestBooking(utcDate);
  };

  const dayClassName = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    );

    if (selectedDate?.getTime() === utcDate.getTime()) {
      return "date-selected";
    }

    if (convertedBookedDates.some((d) => d.getTime() === utcDate.getTime())) {
      return "date-unavailable";
    }

    if (
      convertedAvailableDates.some((d) => d.getTime() === utcDate.getTime())
    ) {
      return "date-available";
    }

    return "date-unavailable";
  };

  const handleBookingRequest = async () => {
    if (!usersState?.user?._id) {
      toast.error("Please log in to make a booking");
      setShowModal(false);
      return;
    }

    try {
      const utcPerformanceDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );

      const bookingData = {
        initiatedBy: usersState.user._id,
        receivedBy: id,
        performanceDate: utcPerformanceDate.toISOString(),
      };

      await requestArtistOrVenue(bookingsDispatch, bookingData);
      setIsSuccess(true);

      // Reset everything after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        setSelectedDate(null);
        setIsSuccess(false);
      }, 6000);
    } catch (error) {
      console.error("Error making booking request:", error);

      // Check for specific error message or status
      if (
        error.response?.data?.message?.includes("already exists") ||
        error.message?.includes("already exists")
      ) {
        toast.error("You've already requested a booking for this date");
      } else {
        toast.error("Failed to make booking request. Please try again.");
      }

      // Close the modal after error
      setShowModal(false);
      setSelectedDate(null);
    }
  };

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {!isSuccess ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Confirm Booking Request
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-600 mb-1">Selected Date:</p>
                <p className="font-medium">{format(selectedDate, "PPPP")}</p>
              </div>

              <div>
                <p className="text-gray-600 mb-1">Note:</p>
                <p className="text-sm text-gray-500">
                  This will send a booking request. The artist/venue will need
                  to confirm the booking before it's finalized.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="green"
                className="flex-1"
                onClick={handleBookingRequest}
              >
                Request Booking
              </Button>
              <Button
                variant="white"
                className="flex-1"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedDate(null);
                setIsSuccess(false);
              }}
              className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>

            <FaCheckCircle className="text-green text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Request Sent!</h2>
            <p className="text-gray-600">
              Go to My Bookings in My Greenroom to see your booking.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="booking-calendar">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateSelect}
        inline
        minDate={new Date()}
        includeDates={convertedAvailableDates} // Only allow selecting available dates
        excludeDates={convertedBookedDates} // Exclude booked dates
        calendarClassName="!border-0 !shadow-lg"
        showPopperArrow={false}
        monthsShown={1}
        fixedHeight
        dayClassName={dayClassName}
      />
      <style>
        {`
          .booking-calendar .react-datepicker {
            font-family: inherit;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
          }
          .booking-calendar .react-datepicker__header {
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
            border-radius: 0.5rem 0.5rem 0 0;
          }
          .booking-calendar .react-datepicker__day {
            border-radius: 9999px;
            transition: all 0.2s;
            position: relative;
            margin: 0.2rem;
            width: 2.5rem;
            height: 2rem;
            line-height: 2rem;
          }
          .booking-calendar .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
            border-radius: 9999px;
            background-color: #f3f4f6;
          }
          .booking-calendar .react-datepicker__day--selected {
            background-color: #059669 !important;
            color: white !important;
          }
          .booking-calendar .react-datepicker__day--disabled {
            color: #d1d5db;
            text-decoration: line-through;
            cursor: not-allowed;
          }
          .booking-calendar .react-datepicker__day--keyboard-selected {
            background-color: transparent;
            border: 2px solid #059669;
            color: inherit;
          }
          .booking-calendar .react-datepicker__day--keyboard-selected:hover {
            background-color: #f3f4f6;
          }
        `}
      </style>
      <Button
        variant="green"
        className="mt-2 px-6 py-2 w-full"
        onClick={() => setShowModal(true)}
        disabled={!selectedDate}
      >
        Request Booking
      </Button>

      {showModal && <BookingModal />}
    </div>
  );
}
