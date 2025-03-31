import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function EditBookingCalendar({
  availableDates = [],
  bookedDates = [],
  onConfirm,
  onCancel,
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
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }
    onConfirm(selectedDate);
  };

  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

  return (
    <div className="flex flex-col items-center">
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
          .react-datepicker {
            font-family: inherit;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
          }
          .react-datepicker__header {
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
            border-radius: 0.5rem 0.5rem 0 0;
          }
          .react-datepicker__day {
            border-radius: 9999px;
            transition: all 0.2s;
            position: relative;
            margin: 0.2rem;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
          }
          .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
            border-radius: 9999px;
            background-color: #f3f4f6;
          }
          .react-datepicker__day--selected {
            background-color: #059669 !important;
            color: white !important;
          }
          .react-datepicker__day--disabled {
            color: #d1d5db;
            text-decoration: line-through;
            cursor: not-allowed;
          }
          .react-datepicker__day--keyboard-selected {
            background-color: transparent;
            border: 2px solid #059669;
            color: inherit;
          }
          .react-datepicker__day--keyboard-selected:hover {
            background-color: #f3f4f6;
          }
        `}
      </style>
      <div className="flex gap-3 mt-4 w-full">
        <Button
          variant="green"
          size="small"
          className="flex-1"
          onClick={handleConfirm}
          disabled={!selectedDate}
        >
          Confirm
        </Button>
        <Button
          variant="white"
          size="small"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
