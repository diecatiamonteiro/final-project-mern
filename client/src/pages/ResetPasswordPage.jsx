import { useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../contexts/Context";
import { resetPassword } from "../api/usersApi";
import Button from "../components/Button";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading } = usersState;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(usersDispatch, { token, userId, newPassword: password });
      navigate("/login");
    } catch (error) {
      // Error handling is managed by the reducer
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-midnightBlack">
            Create New Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green focus:border-green focus:z-10 text-sm md:text-base"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOffOutline className="h-5 w-5" />
              ) : (
                <IoEyeOutline className="h-5 w-5" />
              )}
            </button>
          </div>
          <Button
            type="submit"
            variant="green"
            className="w-full"
            disabled={isLoading}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
} 