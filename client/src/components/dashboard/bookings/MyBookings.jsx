import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../contexts/Context";
import {
  getAllReceivedBookings,
  getAllSentBookings,
} from "../../../api/usersApi";
import ReceivedBookings from "./ReceivedBookings";
import SentBookings from "./SentBookings";

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("received");
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user } = usersState;

  useEffect(() => {
    if (user?._id) {
      // Fetch both received and sent bookings when component mounts
      getAllReceivedBookings(usersDispatch, user._id);
      getAllSentBookings(usersDispatch, user._id);
    }
  }, [user?._id]);

  return (
    <div>
      {/* Sub-tabs for Received/Sent */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Bookings Navigation">
          <button
            onClick={() => setActiveTab("received")}
            className={`
              py-4 px-1 border-b-2 font-medium
              ${
                activeTab === "received"
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Received Bookings
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`
              py-4 px-1 border-b-2 font-medium
              ${
                activeTab === "sent"
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Sent Bookings
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === "received" ? <ReceivedBookings /> : <SentBookings />}
    </div>
  );
}
