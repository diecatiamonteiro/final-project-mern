import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AvailabilityCalendar({
  selectedDates = [],
  bookedDates = [],
  onDateSelect,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const convertedDates = useMemo(
    () =>
      selectedDates.map((date) => {
        if (typeof date === "string") {
          const utcDate = new Date(date);
          return new Date(
            utcDate.getFullYear(),
            utcDate.getMonth(),
            utcDate.getDate()
          );
        }
        return date;
      }),
    [selectedDates]
  );

  const convertedBookedDates = useMemo(
    () =>
      bookedDates.map((date) => {
        if (typeof date === "string") {
          const utcDate = new Date(date);
          return new Date(
            utcDate.getFullYear(),
            utcDate.getMonth(),
            utcDate.getDate()
          );
        }
        return date;
      }),
    [bookedDates]
  );

  const handleDateSelect = (date) => {
    // Don't allow selection of booked dates
    const isBooked = convertedBookedDates.some(
      (d) =>
        new Date(d).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)
    );
    if (isBooked) return;

    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    );

    setSelectedDate(utcDate); // Temporarily show green highlight

    // Remove highlight after animation
    setTimeout(() => {
      setSelectedDate(null);
    }, 300);

    const isSelected = convertedDates.some(
      (d) => new Date(d).setHours(0, 0, 0, 0) === utcDate.setHours(0, 0, 0, 0)
    );

    if (isSelected) {
      const newDates = convertedDates.filter(
        (d) => new Date(d).setHours(0, 0, 0, 0) !== utcDate.setHours(0, 0, 0, 0)
      );
      onDateSelect(newDates);
    } else {
      onDateSelect([...convertedDates, utcDate]);
    }
  };

  const dayClassName = (date) => {
    const currentDate = new Date(date).setHours(0, 0, 0, 0);

    // Check for booked dates first
    const isBooked = convertedBookedDates.some(
      (d) => new Date(d).setHours(0, 0, 0, 0) === currentDate
    );

    if (isBooked) {
      return "date-booked";
    }

    if (
      selectedDate &&
      new Date(selectedDate).setHours(0, 0, 0, 0) === currentDate
    ) {
      return "date-selected";
    }

    // Check if any of the converted dates match the current date
    const isAvailable = convertedDates.some(
      (d) => new Date(d).setHours(0, 0, 0, 0) === currentDate
    );

    if (isAvailable) {
      return "date-available";
    }

    return "date-unavailable";
  };

  return (
    <div className="availability-calendar">
      <DatePicker
        selected={null}
        onChange={handleDateSelect}
        inline
        minDate={new Date()}
        dayClassName={dayClassName}
        calendarClassName="!border-0 !shadow-lg"
        showPopperArrow={false}
        monthsShown={1}
        fixedHeight
      />
      <style>
        {`
          .availability-calendar .react-datepicker {
            font-family: inherit;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
          }
          .availability-calendar .react-datepicker__header {
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
            border-radius: 0.5rem 0.5rem 0 0;
          }
          .availability-calendar .react-datepicker__day {
            border-radius: 9999px;
            transition: all 0.2s;
            position: relative;
            margin: 0.2rem;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            color: #111827;
          }
          .availability-calendar .date-available {
            background-color: #059669;
            color: white;
            font-weight: 600;
          }
          .availability-calendar .date-available:hover {
            background-color: #047857;
          }
          .availability-calendar .date-selected {
            background-color: #047857;
            color: white;
            font-weight: 600;
          }
          .availability-calendar .react-datepicker__day:hover {
            background-color: #047857;
            color: white;
            border-radius: 9999px;
          }
          .availability-calendar .date-unavailable {
            cursor: pointer;
            color: black;
          }
          .availability-calendar .react-datepicker__day--disabled {
            color: #ccc;
            cursor: default;
            // text-decoration: line-through
          }
          .availability-calendar .date-booked {
            border: 1px solid #059668a7;
            color: #059669;
            cursor: not-allowed !important;
          }
          .availability-calendar .date-booked:hover {
            background-color: white !important;
            color: ##ccc !important;
          }

          /* Add tooltip base styles */
          .availability-calendar .date-available,
          .availability-calendar .date-booked {
            position: relative;
          }

          .availability-calendar .date-available::after,
          .availability-calendar .date-booked::after {
            content: "Available";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 5px 5px;
            background-color: #333;
            color: white;
            font-size: 12px;
            white-space: nowrap;
            visibility: hidden;
            border-radius: 0.2rem;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 1000;
            pointer-events: none;
            line-height: 1;
            height: fit-content;
            box-sizing: border-box;
          }

          .availability-calendar .date-booked::after {
            content: "Gig booked on this day";
          }

          .availability-calendar .date-available:hover::after,
          .availability-calendar .date-booked:hover::after {
            visibility: visible;
            opacity: 1;
          }

          /* Remove only the default blue highlight on keyboard selection */
          .availability-calendar .react-datepicker__day--keyboard-selected:not(.date-available):not(.date-booked):not(.date-selected) {
            background-color: transparent;
          }

        `}
      </style>
    </div>
  );
}
