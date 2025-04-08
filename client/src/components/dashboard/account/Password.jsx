import { useState, useContext } from "react";
import { DataContext } from "../../../contexts/Context";
import { changePassword } from "../../../api/usersApi";
import Button from "../../../components/Button";
import { USER_ACTIONS } from "../../../reducers/usersReducer";
import ShowHidePassword from "../../ShowHidePassword";

export default function Password() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { error, isLoading } = usersState;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    // Clear any existing errors
    usersDispatch({ type: USER_ACTIONS.SET_ERROR, payload: null });

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      usersDispatch({
        type: USER_ACTIONS.SET_ERROR,
        payload: "New passwords do not match",
      });
      return;
    }

    // Validate new password is different from current
    if (formData.currentPassword === formData.newPassword) {
      usersDispatch({
        type: USER_ACTIONS.SET_ERROR,
        payload: "New password must be different from current password",
      });
      return;
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      usersDispatch({
        type: USER_ACTIONS.SET_ERROR,
        payload:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
      return;
    }

    try {
      const response = await changePassword(usersDispatch, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      // Only proceed if we got a successful response
      if (response?.requireReauth) {
        setSuccess(true);
        // Clear form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        // Redirect to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error) {
      // Get the error message from the error response
      const errorMessage =
        error.response?.data?.message || "Failed to change password";

      // Dispatch the error message to update the state
      usersDispatch({
        type: USER_ACTIONS.SET_ERROR,
        payload: errorMessage,
      });
    }
  };

  return (
    <div className="max-w-2xl">
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
            Password changed successfully. You will be redirected to login...
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <label htmlFor="currentPassword" className="block text-gray-500">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
              required
              disabled={isLoading}
            />
            <ShowHidePassword
              show={showCurrentPassword}
              onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-gray-500">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
              required
              disabled={isLoading}
            />
            <ShowHidePassword
              show={showNewPassword}
              onToggle={() => setShowNewPassword(!showNewPassword)}
            />
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-gray-500">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
              required
              disabled={isLoading}
            />
            <ShowHidePassword
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="green"
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}
