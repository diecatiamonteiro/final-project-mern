import React, { useContext, useState } from "react";
import { DataContext } from "../../../contexts/Context";
import { updateAccount } from "../../../api/usersApi";
import Button from "../../Button";
import LoadingSpinner from "../../LoadingSpinner";

export default function UserData() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user, isLoading, error } = usersState;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    publicName: user?.name || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  console.log(user);

  const handleEditData = async () => {
    error.preventDefault();
    try {
      await updateAccount(usersDispatch, formData);
      setIsEditing(false);
    } catch (error) {
      // Error handling is managed by the reducer
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  //! If editing, show the edit form
  if (isEditing) {
    return (
      <form onSubmit={handleEditData} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {/* Public Name */}
          <div className="space-y-2">
            <label htmlFor="publicName" className="block text-sm font-medium text-gray-700">
              Public Name
            </label>
            <input
              type="text"
              id="publicName"
              value={formData.publicName}
              onChange={(e) => setFormData(prev => ({ ...prev, publicName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
            />
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="white" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="green" disabled={isLoading}>
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    );
  }

  //! If not editing, show the user data
  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="px-4 py-2 mb-6 bg-midnightBlack/50 w-fit">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {user.role === "venue" ? `I'm a ${user.role} owner` : `I'm an ${user.role}`}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="border-b border-gray-200 pb-4">
              <p className="text-gray-500">Public Name</p>
              <p className="mt-1 font-medium text-gray-900">{user.name}</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="text-gray-500">First Name</p>
              <p className="mt-1 font-medium text-gray-900">{user.firstName}</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="text-gray-500">Last Name</p>
              <p className="mt-1 font-medium text-gray-900">{user.lastName}</p>
            </div>
            <div className="pb-4">
              <p className="text-gray-500">Email</p>
              <p className="mt-1 font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>
        <Button
            variant="white"
            onClick={() => {
              setFormData({
                publicName: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              });
              setIsEditing(true);
            }}
          >
            Edit Data
          </Button>
      </div>
    </div>
  );
}
