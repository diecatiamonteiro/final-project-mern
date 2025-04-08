import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../contexts/Context";
import { updateAccount, logout } from "../../../api/usersApi";
import Button from "../../Button";
import LoadingSpinner from "../../LoadingSpinner";
import { USER_ACTIONS } from "../../../reducers/usersReducer";

export default function UserData() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { user, isLoading, error } = usersState;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [success, setSuccess] = useState(false);

  // Clear error when component mounts
  useEffect(() => {
    usersDispatch({ type: USER_ACTIONS.SET_ERROR, payload: null });
  }, []); // Empty dependency array means this runs once when component mounts

  const handleEditData = async (e) => {
    e.preventDefault();
    setSuccess(false);

    // Clear any existing errors
    usersDispatch({ type: USER_ACTIONS.SET_ERROR, payload: null });

    try {
      const response = await updateAccount(usersDispatch, formData);

      // Check if email was changed
      const isEmailChange = formData.email !== user.email;

      if (isEmailChange && response?.requireReauth) {
        setSuccess(true);
        // Give time for success message to show
        alert(
          "Email update initiated. Please check your email to verify your new email address. You will be redirected to login."
        );
        window.location.href = "/login";
      } else if (response?.data) {
        setSuccess(true);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        });
        setTimeout(() => {
          setIsEditing(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      // Don't show 401 errors as they're expected during logout
      if (error.response?.status !== 401) {
        const errorMessage = error.response?.data?.message || "Update failed";
        usersDispatch({
          type: USER_ACTIONS.SET_ERROR,
          payload: errorMessage,
        });
      }
    }
  };

  // Then handle other states
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

  //! If editing, show edit form
  if (isEditing) {
    return (
      <form onSubmit={handleEditData} className="max-w-2xl space-y-6">
        <div className="">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green/10 border-l-4 border-green p-4 mb-4">
              <p className="text-sm md:text-base text-green-700">
                {formData.email !== user.email
                  ? "Email update initiated. Please check your email to verify your new email address. You will be redirected to login..."
                  : "Profile updated successfully!"}
              </p>
            </div>
          )}
          <div className="mb-6">
            <p className="text-gray-500">Account Type</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>

          {/* First Name */}
          <div className="space-y-2 mb-6">
            <label htmlFor="firstName" className="block text-gray-500">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2 mb-6">
            <label htmlFor="lastName" className="block text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
            />
          </div>

          {/* Email */}
          <div className="space-y-2 mb-6">
            <label htmlFor="email" className="block text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
            />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex gap-3 mt-12">
            <Button
              variant="green"
              className="flex-1"
              type="submit"
              disabled={isLoading}
            >
              Save Changes
            </Button>
            <Button
              variant="white"
              className="flex-1"
              onClick={() => {
                setFormData({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    );
  } // End of editing form

  //! If not editing, show user data
  return (
    <div>
      <div>
        {/* Account Type */}
        <div className="mb-6">
          <p className="text-gray-500">Account Type</p>
          <p className="mt-1 font-medium text-gray-900">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
        </div>

        {/* Names & Email */}
        <div className="space-y-4">
          <div className="grid grid-cols-1">
            <div className="pb-6">
              <p className="text-gray-500">First Name</p>
              <p className="mt-1 font-medium text-gray-900">{user.firstName}</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-500">Last Name</p>
              <p className="mt-1 font-medium text-gray-900">{user.lastName}</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-500">Email</p>
              <p className="mt-1 font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <Button
          variant="green"
          className="w-full sm:w-auto"
          onClick={() => {
            setFormData({
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
