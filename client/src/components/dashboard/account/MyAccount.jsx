import { useState } from "react";
import UserData from "./UserData";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("userData");

  return (
    <div className="h-full w-full">
      {/* Sub-tabs for User Data, Password, and Delete Account */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Bookings Navigation">
          <button
            onClick={() => setActiveTab("userData")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm md:text-base
              ${
                activeTab === "userData"
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            User Data
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`
              py-4 px-1 border-b-2 font-medium ttext-sm md:text-base
              ${
                activeTab === "password"
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Change Password
          </button>
          <button
            onClick={() => setActiveTab("deleteAccount")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm md:text-base
              ${ 
                activeTab === "deleteAccount"
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Delete Account
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === "userData" && <UserData />}
      {activeTab === "password" && <Password />}
      {activeTab === "deleteAccount" && <DeleteAccount />}
    </div>
  );
}
