import { useState, useContext, useEffect } from "react";
import Button from "../Button";
import { DataContext } from "../../contexts/Context";
import { getUserData } from "../../api/usersApi";

export default function AccountSettings() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading, error, user } = usersState;
  const [activeTab, setActiveTab] = useState("profile");
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    getUserData(usersDispatch);
  }, []);
  console.log(user);
  return (
    <div className="h-full w-full p-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2 mb-4">
        {[
          { id: "profile", label: "Profile" },
          { id: "security", label: "Security" },
          { id: "delete", label: "Delete Account" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? "border-green text-green"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="p-4 border rounded-lg shadow-sm space-y-4 w-1/2">
          <div className="flex items-center space-x-4">
            <h3>First Name:</h3>
            <p>{user.firstName}</p>
          </div>

          <div className="flex justify-start mt-10">
            <Button variant="green" className="mr-4">
              Edit
            </Button>
            <Button to="/dashboard" variant="green">
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="p-4 border rounded-lg shadow-sm space-y-4 w-1/2">
          <label className="block text-sm font-medium">New Password</label>
          <input
            className="w-full p-2 border rounded"
            type="password"
            placeholder="Enter new password"
          />
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            className="w-full p-2 border rounded"
            type="password"
            placeholder="Confirm password"
          />
          <div className="flex justify-start mt-10">
            <Button variant="green" className="mr-4">
              Edit
            </Button>
            <Button to="/dashboard" variant="green">
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Delete Account Tab */}
      {activeTab === "delete" && (
        <div className="p-4 border rounded-lg shadow-sm space-y-4 w-1/2">
          <p className="text-red-500">
            This action cannot be undone. This will permanently delete your
            account.
          </p>
          <div className="mt-12">
            <Button to="/dashboard" variant="danger">
              Delete Account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
