import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../contexts/Context";
import { resetPassword } from "../api/usersApi";
import Button from "../components/Button";
import ShowHidePassword from "../components/ShowHidePassword";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading } = usersState;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Store token and userId in state
  const [resetData, setResetData] = useState({
    token: searchParams.get("token"),
    userId: searchParams.get("userId")
  });

  // Verify we have necessary parameters
  useEffect(() => {
    if (!resetData.token || !resetData.userId) {
      navigate("/forgot-password");
    }
  }, [resetData.token, resetData.userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(usersDispatch, {
        token: resetData.token,
        userId: resetData.userId,
        newPassword: password,
      });
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
            <ShowHidePassword
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
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
