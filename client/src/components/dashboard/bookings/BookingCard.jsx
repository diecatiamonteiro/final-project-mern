import { format } from "date-fns";
import Button from "../../Button";
import Modal from "../../Modal";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  // Get the other party's info
  const otherParty =
    type === "received" ? booking.initiatedBy : booking.receivedBy;

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
          <Link
            to={`/${otherParty.role}/${otherParty._id}`}
            className="flex items-center gap-4 mb-2 hover:opacity-75 transition-opacity"
          >
            <img
              src={otherParty.profilePicture || "/default-avatar.png"}
              alt={otherParty.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">{otherParty.name}</h3>
          </Link>
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
            <div className="flex gap-4 justify-center">
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
