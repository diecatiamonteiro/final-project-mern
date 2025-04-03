import { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfileForm from "../components/dashboard/profile/UpdateProfileForm";
import MyBookings from "../components/dashboard/bookings/MyBookings";
import MyGigs from "../components/dashboard/gigs/MyGigs";
import LoadingSpinner from "../components/LoadingSpinner";
import AccountSettings from "../components/dashboard/AccountSettings";
export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Move fetchUser to its own function so we can reuse it
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/user-data",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError(error.response?.data?.message || "Failed to load user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Pass this to UpdateProfileForm
  const handleProfileUpdate = async () => {
    await fetchUser(); // Refresh user data after successful update
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  // No user state (shouldn't happen if protected route is working)
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">No user data found</div>
      </div>
    );
  }

  const tabs = [
    { id: "account", label: "My Account" },
    { id: "profile", label: "My Profile" },
    { id: "bookings", label: "My Bookings" },
    { id: "gigs", label: "My Gigs" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold mb-8">My Greenroom</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8" aria-label="Dashboard Navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? "border-green text-green"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === "account" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <p className="text-gray-500 mb-10">
              Manage your account settings, change your password, and delete
              profile.
            </p>
            <p className="text-gray-500">
              <AccountSettings />
            </p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
            <p className="text-gray-500 mb-10">
              Customize your profile and set your availability. Keep your
              information up to date to attract more bookings.
            </p>
            <UpdateProfileForm user={user} onUpdate={handleProfileUpdate} />
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
            <p className="text-gray-500 mb-10">
              View and manage your pending booking requests. Accept or decline
              received bookings, and track the status of bookings you've sent.
            </p>
            <MyBookings />
          </div>
        )}

        {activeTab === "gigs" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">My Gigs</h2>
            <p className="text-gray-500 mb-10">
              See all your confirmed bookings. Send an email to the other party
              or cancel upcoming performances.
            </p>
            <MyGigs />
          </div>
        )}
      </div>
    </div>
  );
}
