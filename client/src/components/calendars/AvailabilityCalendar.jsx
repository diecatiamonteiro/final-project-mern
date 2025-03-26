import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AvailabilityCalendar({
  selectedDates = [],
  onDateSelect,
}) {
  const [convertedDates, setConvertedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    console.log("Selected dates from props:", selectedDates);

    const dates = selectedDates.map((date) => {
      if (typeof date === "string") {
        const utcDate = new Date(date);
        return new Date(
          utcDate.getFullYear(),
          utcDate.getMonth(),
          utcDate.getDate()
        );
      }
      return date;
    });

    console.log("Converted dates:", dates);
    setConvertedDates(dates);
  }, [selectedDates]);

  const handleDateSelect = (date) => {
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
    // Create a date object without time component for comparison
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();

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
        `}
      </style>
    </div>
  );
}
