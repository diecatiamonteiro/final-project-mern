import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// For the artist/venue page - shows availability and allows booking requests
export default function BookingRequestCalendar({
  availableDates = [],
  bookedDates = [],
  onRequestBooking,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

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

    // Check if date is available (not booked)
    const isAvailable = convertedAvailableDates.some(
      (d) => d.getTime() === utcDate.getTime()
    );
    const isBooked = convertedBookedDates.some(
      (d) => d.getTime() === utcDate.getTime()
    );

    if (isAvailable && !isBooked) {
      setSelectedDate(utcDate); // Temporarily show green highlight

      // Remove highlight after animation
      setTimeout(() => {
        setSelectedDate(null);
      }, 300);

      onRequestBooking(utcDate);
    }
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

  return (
    <div className="booking-calendar">
      <DatePicker
        selected={null}
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
    </div>
  );
}
