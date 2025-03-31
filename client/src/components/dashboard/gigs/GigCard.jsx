import { useContext, useState } from "react";
import { format } from "date-fns";
import { DataContext } from "../../../contexts/Context";
import { cancelBooking } from "../../../api/bookingsApi";
import Button from "../../Button";
import {
  FaCheckCircle,
  FaCalendar,
  FaEuroSign,
  FaCircle,
  FaEnvelope,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../../Modal";
import { Link } from "react-router-dom";
import MessageForm from "./MessageForm";

export default function GigCard({ gig }) {
  const { usersState, bookingsDispatch } = useContext(DataContext);
  const { user } = usersState;
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const formattedDate = format(new Date(gig.performanceDate), "PPP");

  const handleCancel = async () => {
    try {
      await cancelBooking(bookingsDispatch, gig._id);
      setIsSuccess(true);

      setTimeout(() => {
        setShowModal(false);
        setIsSuccess(false);
      }, 3000);

      toast.success("Gig cancelled successfully");
    } catch (error) {
      console.error("Error cancelling gig:", error);
      toast.error("Failed to cancel gig. Please try again.");
    }
  };

  const CancelContent = () => (
    <div className="p-6">
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-gray-600 mb-1">Gig Date:</p>
          <p className="font-medium">{formattedDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Are you sure you want to cancel this gig?
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="danger" className="flex-1" onClick={handleCancel}>
          Cancel Gig
        </Button>
        <Button
          variant="white"
          className="flex-1"
          onClick={() => setShowModal(false)}
        >
          Return to My Gigs
        </Button>
      </div>
    </div>
  );

  const SuccessContent = () => (
    <div className="text-center py-6">
      <FaCheckCircle className="text-green text-5xl mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Gig Cancelled!</h2>
      <p className="text-gray-600">The gig has been successfully cancelled.</p>
    </div>
  );

  // Get the other party's info
  const otherParty =
    gig.initiatedBy._id === user._id ? gig.receivedBy : gig.initiatedBy;

  // Get the venue's revenue split
  const venueRevenueSplit =
    gig.initiatedBy.role === "venue"
      ? gig.initiatedBy.additionalInfo?.revenueSplit
      : gig.receivedBy.additionalInfo?.revenueSplit;

  // Make sure we have both user and gig data before rendering
  if (!user || !gig) return null;

  return (
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
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <FaCalendar className="text-gray-400" />
            Performance Date: {formattedDate}
          </p>
          <p className="text-sm flex items-center gap-2">
            <FaEuroSign className="text-gray-400" />
            Revenue Split: {venueRevenueSplit}
          </p>
          <p className="text-sm flex items-center gap-2">
            <FaCircle className="text-xs text-gray-400" />
            Status: <span className="font-bold">Confirmed</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => setShowMessageModal(true)}
          variant="outlineBlack"
          size="small"
          className="flex-1 flex items-center justify-center"
        >
          <FaEnvelope className="mr-2" />
          Message
        </Button>
        <Button
          onClick={() => setShowModal(true)}
          variant="danger"
          size="small"
          className="flex-1"
        >
          Cancel Gig
        </Button>
      </div>

      {showModal && (
        <Modal
          title={isSuccess ? "" : "Cancel Gig Confirmation"}
          onClose={() => {
            setShowModal(false);
            if (isSuccess) {
              setIsSuccess(false);
            }
          }}
        >
          {isSuccess ? <SuccessContent /> : <CancelContent />}
        </Modal>
      )}

      {showMessageModal && (
        <Modal title="Send Message" onClose={() => setShowMessageModal(false)}>
          <MessageForm
            bookingId={gig._id}
            onClose={() => setShowMessageModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
