import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/Context";
import { deleteAccount } from "../../../api/usersApi";
import Button from "../../Button";
import LoadingSpinner from "../../LoadingSpinner";

export default function DeleteAccount() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading } = usersState;
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDeleteAccount = async () => {
    await deleteAccount(usersDispatch);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-gray-700 mb-4">
          <span className="font-bold">Warning:</span> This action cannot be
          undone. This will permanently delete your account and remove all
          associated data, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Your profile information</li>
          <li>All your bookings (received and sent)</li>
          <li>Your uploaded images and media</li>
          <li>Your favourites list</li>
          <li>All other account-related data</li>
        </ul>

        {!showConfirmation ? (
          <Button
            variant="danger"
            onClick={() => setShowConfirmation(true)}
            className="w-full sm:w-auto"
          >
            Delete My Account
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">
              Please type "DELETE" to confirm account deletion:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              placeholder="Type DELETE"
            />
            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={confirmText !== "DELETE" || isLoading}
                className="flex-1"
              >
                Confirm Deletion
              </Button>
              <Button
                variant="white"
                onClick={() => {
                  setShowConfirmation(false);
                  setConfirmText("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
