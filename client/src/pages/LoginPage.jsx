import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { DataContext } from "../contexts/Context";
import { login, googleLogin } from "../api/usersApi";
import ShowHidePassword from "../components/ShowHidePassword";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);
  const [error, setError] = useState("");
  const { isLoading } = usersState;
  const [showPassword, setShowPassword] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(usersDispatch, formData);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.message === "User not found") {
        setIsUserRegistered(false);
        setError("User not found. Please register first.");
      } else if (error.response?.data?.message === "Invalid credentials") {
        setError("Invalid email or password");
      } else {
        setError(error.response?.data?.message || "An error occurred");
      }
    }
  };

  // Clear error messages when component mounts or refreshes
  useEffect(() => {
    setError("");
    setIsUserRegistered(true);
  }, []);

  const handleGoogleSuccess = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await googleLogin(usersDispatch, tokenResponse.access_token);
        navigate("/dashboard");
      } catch (error) {
        if (error.response?.data?.message === "User not registered") {
          setIsUserRegistered(false);
        } else {
          setError(error.response?.data?.message || "An error occurred");
        }
      }
    },
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl md:text-4xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm md:text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-green/70 hover:text-green/90 underline"
            >
              Register here
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
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
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={isLoading}
              />
            </div>
            <div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green focus:border-green focus:z-10 text-sm md:text-base"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  disabled={isLoading}
                />
                <ShowHidePassword
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-green/70 hover:text-green/90 underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button type="submit" variant="green" fullWidth>
              Log in
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center mt-4">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm mt-4">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGoogleSuccess}
                className="flex items-center justify-center gap-2 w-full max-w-[280px] bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-sm md:text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                Log in with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
