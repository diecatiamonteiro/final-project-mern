import { useState, useContext } from "react";
import { DataContext } from "../contexts/Context";
import { forgotPassword } from "../api/usersApi";
import Button from "../components/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading } = usersState;
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(usersDispatch, { email });
      setEmailSent(true);
    } catch (error) {
      // Error handling is managed by the reducer
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-midnightBlack">
              Check your email
            </h2>
            <div className="mt-4 text-center text-midnightBlack/70 text-base md:text-lg">
              <p className="mb-6">
                We've sent a password reset link to:
                <span className="font-semibold block mt-1">{email}</span>
              </p>
              <p>Please check your <span className="font-bold">inbox</span> or <span className="font-bold">spam</span> to reset your password.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-midnightBlack">
            Reset Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green focus:border-green focus:z-10 text-sm md:text-base"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            variant="green"
            className="w-full"
            disabled={isLoading}
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
} 