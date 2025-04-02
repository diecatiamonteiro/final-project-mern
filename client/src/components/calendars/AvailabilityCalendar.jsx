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

  console.log("Incoming bookedDates:", bookedDates);
  console.log("Converted booked dates:", convertedBookedDates);

  const handleDateSelect = (date) => {
    // Don't allow selection of booked dates
    const isBooked = convertedBookedDates.some(
      (d) => d.getTime() === date.getTime()
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
      (d) => d.getTime() === utcDate.getTime()
    );

    if (isSelected) {
      const newDates = convertedDates.filter(
        (d) => d.getTime() !== utcDate.getTime()
      );
      onDateSelect(newDates);
    } else {
      onDateSelect([...convertedDates, utcDate]);
    }
  };

  const dayClassName = (date) => {
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();

    // Check for booked dates first
    const isBooked = convertedBookedDates.some(
      (d) => new Date(d).setHours(0, 0, 0, 0) === currentDate
    );
    console.log("Checking date:", new Date(currentDate), "isBooked:", isBooked);

    if (isBooked) {
      return "date-booked";
    }

    if (selectedDate?.getTime() === currentDate) {
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
            color: #111827;
          }
          .availability-calendar .react-datepicker__day--disabled {
            color: #ccc;
            cursor: default;
          }
          .availability-calendar .date-booked {
            border: 2px solid #111827;
            background-color: white;
            color: #111827;
            cursor: not-allowed !important;
          }
          .availability-calendar .date-booked:hover {
            background-color: white !important;
            color: #111827 !important;
          }
        `}
      </style>
    </div>
  );
}
