import { useState, useEffect, useContext } from "react";
import UpdateProfileForm from "../components/dashboard/profile/UpdateProfileForm";
import MyBookings from "../components/dashboard/bookings/MyBookings";
import MyGigs from "../components/dashboard/gigs/MyGigs";
import MyAccount from "../components/dashboard/account/MyAccount";
import { DataContext } from "../contexts/Context";
import { getUserData } from "../api/usersApi";

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("account");
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user } = usersState;

  // Add this useEffect to fetch user data when component mounts
  useEffect(() => {
    getUserData(usersDispatch);
  }, [usersDispatch]);

  // Pass this to UpdateProfileForm
  const handleProfileUpdate = async () => {
    await getUserData(usersDispatch);
  };

  // Shouldn't happen if protected route is working
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">No user data found</div>
      </div>
    );
  }

  const tabs = [
    { id: "account", label: "My Account" },
    { id: "profile", label: "My Public Profile" },
    { id: "bookings", label: "My Bookings" },
    { id: "gigs", label: "My Gigs" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mb-24">
      <h1 className="text-3xl font-bold mb-8">My Greenroom</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8" aria-label="Dashboard Navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm md:text-lg
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
              Manage your personal data, change your password and delete your
              account.
            </p>
            <MyAccount />
          </div>
        )}

        {activeTab === "profile" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              Public Profile Settings
            </h2>
            {user.role === "artist" ? (
              <div>
                <p className="text-gray-500 mb-6">
                  Customise your public profile and set your availability to
                  attract bookings. Once the required fields are filled in, your
                  profile will be published in the{" "}
                  <span className="font-bold">Find Artists</span> page.
                </p>
                <div className="bg-orange-500/10 p-4 rounded-lg mb-10">
                  <p className="text-orange-500 mb-2">
                    Please note that your profile will only be published in the
                    Find Artists page once you have filled in <span className="font-bold">all</span> of the following
                    fields:
                  </p>
                  <ul className="list-disc pl-5 text-orange-500">
                    <li>Basic Information</li>
                    <li>Artist Categories</li>
                    <li>Calendar Available Dates</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-6">
                  Customise your public profile and set your availability to
                  attract bookings. Once the required fields are filled in, your
                  profile will be published in the{" "}
                  <span className="font-bold">Find Venues</span> page.
                </p>
                <div className="bg-orange-500/10 p-4 rounded-lg mb-10">
                  <p className="text-orange-500 mb-2">
                    Please note that your profile will only be published in the
                    Find Venues page once you have filled in <span className="font-bold">all</span> of the following
                    fields:
                  </p>
                  <ul className="list-disc pl-5 text-orange-500">
                    <li>Basic Information</li>
                    <li>Venue Categories</li>
                    <li>Venue Details</li>
                    <li>Calendar Available Dates</li>
                  </ul>
                </div>
              </div>
            )}
            <UpdateProfileForm onUpdate={handleProfileUpdate} />
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
