import { format } from "date-fns";
import Button from "../../Button";

export default function BookingCard({
  booking,
  type,
  onAccept,
  onDecline,
  onEdit,
}) {
  const formattedDate = format(new Date(booking.performanceDate), "PPP");
  const isPending = booking.status === "pending";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {type === "received"
            ? booking.initiatedBy.name
            : booking.receivedBy.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Performance Date: {formattedDate}
        </p>
        <p className="text-sm mb-2">
          Status:{" "}
          <span
            className={`font-medium ${
              booking.status === "pending"
                ? "text-amber-500"
                : booking.status === "accepted"
                ? "text-green"
                : "text-red-500"
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        {type === "received" && isPending && (
          <>
            <Button
              onClick={onAccept}
              variant="success"
              size="small"
              className="flex-1"
            >
              Accept
            </Button>
            <Button
              onClick={onDecline}
              variant="danger"
              size="small"
              className="flex-1"
            >
              Decline
            </Button>
          </>
        )}
        {type === "sent" && isPending && (
          <Button
            onClick={onEdit}
            variant="warning"
            size="small"
            className="w-full"
          >
            Edit Date
          </Button>
        )}
      </div>
    </div>
  );
}
