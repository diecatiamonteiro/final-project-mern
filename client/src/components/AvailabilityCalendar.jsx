import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AvailabilityCalendar({
  selectedDates = [],
  onDateSelect,
}) {
  const handleDateSelect = (date) => {
    // Check if date is already selected
    const dateString = date.toISOString().split("T")[0];
    const isSelected = selectedDates.some(
      (d) => new Date(d).toISOString().split("T")[0] === dateString
    );

    if (isSelected) {
      // If date is already selected, remove it
      const newDates = selectedDates.filter(
        (d) => new Date(d).toISOString().split("T")[0] !== dateString
      );
      onDateSelect(newDates);
    } else {
      // If date is not selected, add it
      onDateSelect([...selectedDates, date]);
    }
  };

  // Custom styles for different date states
  const dayClassNames = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const isSelected = selectedDates.some(
      (d) => new Date(d).toISOString().split("T")[0] === dateString
    );

    return isSelected ? "bg-green text-white hover:bg-greenHover" : "";
  };

  return (
    <div className="availability-calendar">
      <DatePicker
        selected={null}
        onChange={handleDateSelect}
        inline
        minDate={new Date()}
        dayClassName={dayClassNames}
        calendarClassName="!border-0 !shadow-lg"
        showPopperArrow={false}
        monthsShown={2}
        fixedHeight
      />
      <style jsx>{`
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
        }
        .availability-calendar .react-datepicker__day:hover {
          border-radius: 9999px;
          background-color: #f3f4f6;
        }
        /* Override the default selected state */
        .availability-calendar .react-datepicker__day--keyboard-selected {
          background-color: transparent !important;
          color: inherit !important;
        }
        /* Override the clicked state */
        .availability-calendar .react-datepicker__day--selected {
          background-color: #059669 !important;
          color: white !important;
        }
        .availability-calendar .react-datepicker__day--selected:hover {
          background-color: #047857 !important;
        }
        .availability-calendar .react-datepicker__day--disabled {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}
