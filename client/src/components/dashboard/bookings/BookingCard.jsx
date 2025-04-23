import { format } from "date-fns";
import { FaCalendar, FaEuroSign, FaCircle } from "react-icons/fa";
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

  // Get the venue's revenue split
  const venueRevenueSplit =
    booking.initiatedBy.role === "venue"
      ? booking.initiatedBy.additionalInfo?.revenueSplit
      : booking.receivedBy.additionalInfo?.revenueSplit;

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
            className="flex items-center gap-4 mb-3 hover:opacity-75 transition-opacity"
          >
            <img
              src={otherParty.profilePicture || "/default-avatar.png"}
              alt={otherParty.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">{otherParty.name}</h3>
          </Link>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="sm:flex sm:items-center sm:gap-2">
              <p className="text-gray-600 text-sm flex items-center gap-2 mb-1 sm:mb-0">
                <FaCalendar className="text-gray-400" />
                Performance Date:
              </p>
              <p className="text-sm pl-6 sm:pl-0">{formattedDate}</p>
            </div>
            <div className="sm:flex sm:items-center sm:gap-2">
              <p className="text-sm flex items-center gap-2 mb-1 sm:mb-0">
                <FaEuroSign className="text-gray-400" />
                Revenue Split:
              </p>
              <p className="text-sm pl-6 sm:pl-0">
                {venueRevenueSplit ? (
                  <span>
                    {venueRevenueSplit.split("/")[0]}% artist
                    {" / "}
                    {venueRevenueSplit.split("/")[1]}% venue
                  </span>
                ) : (
                  "Not specified"
                )}
              </p>
            </div>
            <div className="sm:flex sm:items-center sm:gap-2">
              <p className="text-sm flex items-center gap-2 mb-1 sm:mb-0">
                <FaCircle className="text-xs text-gray-400" />
                Status:
              </p>
              <p className="text-sm pl-6 sm:pl-0 font-bold">
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </p>
            </div>
          </div>
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
                onClick={handleDeclineClick}
                variant="outlineGreen"
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
              variant="outlineBlack"
              size="small"
              className="w-sm"
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
              <Button variant="danger" onClick={handleConfirmDecline}>
                Decline Booking
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeclineModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
