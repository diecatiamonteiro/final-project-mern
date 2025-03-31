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
import Modal from "../Modal";

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
    // Check if the date is today or in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date <= today) {
      toast.error("Please select a future date");
      return;
    }

    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    );

    setSelectedDate(utcDate);
    onRequestBooking(utcDate);
  };

  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First check if date is today or in the past
    if (date <= today) {
      return "date-unavailable";
    }

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

      setTimeout(() => {
        setShowModal(false);
        setSelectedDate(null);
        setIsSuccess(false);
      }, 6000);
    } catch (error) {
      console.error("Error making booking request:", error);

      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Failed to make booking request. Please try again.");
      }

      setShowModal(false);
      setSelectedDate(null);
    }
  };

  const SuccessContent = () => (
    <div className="text-center py-6">
      <FaCheckCircle className="text-green text-5xl mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Request Sent!</h2>
      <p className="text-gray-600">
        Go to My Bookings in My Greenroom to see your booking.
      </p>
    </div>
  );

  const ConfirmationContent = () => (
    <div className="p-6">
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-gray-600 mb-1">Selected Date:</p>
          <p className="font-medium">{format(selectedDate, "PPPP")}</p>
        </div>

        <div>
          <p className="text-gray-600 mb-1">Note:</p>
          <p className="text-sm text-gray-500">
            This will send a booking request. The artist/venue will need to
            confirm the booking before it's finalized.
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
    </div>
  );

  return (
    <div className="booking-calendar flex flex-col items-center">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateSelect}
        inline
        minDate={new Date()}
        includeDates={convertedAvailableDates}
        excludeDates={convertedBookedDates}
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
            width: 2rem;
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
        className="mt-2 px-6 py-2 w-full max-w-[320px]"
        size="small"
        onClick={() => setShowModal(true)}
        disabled={!selectedDate}
      >
        Request Booking
      </Button>

      {showModal && (
        <Modal
          title={isSuccess ? "" : "Confirm Booking Request"}
          onClose={() => {
            setShowModal(false);
            if (isSuccess) {
              setSelectedDate(null);
              setIsSuccess(false);
            }
          }}
        >
          {isSuccess ? <SuccessContent /> : <ConfirmationContent />}
        </Modal>
      )}
    </div>
  );
}
