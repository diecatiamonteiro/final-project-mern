import { useContext, useState } from "react";
import { format } from "date-fns";
import { DataContext } from "../../../contexts/Context";
import { cancelBooking } from "../../../api/bookingsApi";
import Button from "../../Button";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function GigCard({ gig }) {
  const { usersState, bookingsDispatch } = useContext(DataContext);
  const { user } = usersState;
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formattedDate = format(new Date(gig.performanceDate), "PPP");

  const handleCancel = async () => {
    try {
      await cancelBooking(bookingsDispatch, gig._id);
      setIsSuccess(true);

      // Reset everything after 3 seconds
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

  const CancelModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {!isSuccess ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Cancel Gig Confirmation
            </h2>

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
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleCancel}
              >
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
          </>
        ) : (
          <div className="text-center py-6 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setIsSuccess(false);
              }}
              className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>

            <FaCheckCircle className="text-green text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Gig Cancelled!</h2>
            <p className="text-gray-600">
              The gig has been successfully cancelled.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Make sure we have both user and gig data before rendering
  if (!user || !gig) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {gig.initiatedBy._id === user._id
            ? gig.receivedBy.name
            : gig.initiatedBy.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Performance Date: {formattedDate}
        </p>
        <p className="text-sm mb-2">
          Status: <span className="font-medium text-green">Confirmed</span>
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => setShowModal(true)}
          variant="danger"
          size="small"
          className="w-full"
        >
          Cancel Gig
        </Button>
      </div>

      {showModal && <CancelModal />}
    </div>
  );
}
