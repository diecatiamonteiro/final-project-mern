import { format } from "date-fns";
import Button from "../../Button";
import Modal from "../../Modal";
import { useState } from "react";

export default function BookingCard({
  booking,
  type,
  onAccept,
  onDecline,
  onEdit,
}) {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const formattedDate = format(new Date(booking.performanceDate), "PPP");
  const isPending = booking.status === "pending";

  const handleDeclineClick = () => {
    setShowDeclineModal(true);
  };

  const handleConfirmDecline = () => {
    onDecline();
    setShowDeclineModal(false);
  };

  return (
    <>
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
                Accept Booking
              </Button>
              <Button
                onClick={handleDeclineClick}
                variant="outline"
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

      {/* Decline Confirmation Modal */}
      {showDeclineModal && (
        <Modal
          title="Decline Booking Request"
          onClose={() => setShowDeclineModal(false)}
        >
          <div className="p-6">
            <p className="mb-6 text-gray-700">
              Are you sure you want to decline the booking request from{" "}
              <span className="font-semibold">{booking.initiatedBy.name}</span>{" "}
              for <span className="font-semibold">{formattedDate}</span>?
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeclineModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDecline}>
                Decline Booking
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
