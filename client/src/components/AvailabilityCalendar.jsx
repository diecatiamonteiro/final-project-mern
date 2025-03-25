import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AvailabilityCalendar({
  selectedDates = [],
  onDateSelect,
}) {
  // Convert string dates to Date objects when component mounts or selectedDates changes
  const [convertedDates, setConvertedDates] = useState([]);

  useEffect(() => {
    // Convert string dates to Date objects, ensuring correct date
    const dates = selectedDates.map((date) => {
      if (typeof date === "string") {
        // Create date from the UTC string and adjust for local timezone
        const utcDate = new Date(date);
        return new Date(
          utcDate.getUTCFullYear(),
          utcDate.getUTCMonth(),
          utcDate.getUTCDate()
        );
      }
      return date;
    });
    setConvertedDates(dates);
  }, [selectedDates]);

  const handleDateSelect = (date) => {
    // Create a new date at UTC midnight
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    );

    // Check if date is already selected
    const isSelected = convertedDates.some(
      (d) => d.getTime() === utcDate.getTime()
    );

    if (isSelected) {
      // If date is already selected, remove it
      const newDates = convertedDates.filter(
        (d) => d.getTime() !== utcDate.getTime()
      );
      onDateSelect(newDates);
    } else {
      // If date is not selected, add it
      onDateSelect([...convertedDates, utcDate]);
    }
  };

  return (
    <div className="availability-calendar">
      <DatePicker
        highlightDates={convertedDates}
        onChange={handleDateSelect}
        inline
        minDate={new Date()}
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
        /* Style for highlighted dates */
        .availability-calendar .react-datepicker__day--highlighted {
          background-color: #059669 !important;
          color: white !important;
        }
        .availability-calendar .react-datepicker__day--highlighted:hover {
          background-color: #047857 !important;
        }
        .availability-calendar .react-datepicker__day--disabled {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}
