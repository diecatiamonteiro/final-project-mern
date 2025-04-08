import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { DataContext } from "../contexts/Context";
import { register } from "../api/usersApi";
import ShowHidePassword from "../components/ShowHidePassword";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "artist", // Default to artist
  });
  const { usersState, usersDispatch } = useContext(DataContext);
  const { error, isLoading } = usersState;
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(usersDispatch, formData);
    setIsRegistered(true);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-midnightBlack">
              Check your email
            </h2>
            <div className="mt-4 text-center text-midnightBlack/70 text-base md:text-lg">
              <p className="mb-6">
                We've sent a verification email to:
                <span className="font-semibold block mt-1">
                  {formData.email}
                </span>
              </p>
              <p>
                Please check your <span className="font-bold">inbox</span> or <span className="font-bold">spam</span> and click the verification link to
                complete your registration.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl md:text-4xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm md:text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green/70 hover:text-green/90 underline"
            >
              Log in here
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm md:text-base text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "artist" }))
              }
              variant={formData.role === "artist" ? "black" : "outlineBlack"}
              type="button"
              disabled={isLoading}
            >
              I'm an Artist
            </Button>
            <Button
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "venue" }))
              }
              variant={formData.role === "venue" ? "black" : "outlineBlack"}
              type="button"
              disabled={isLoading}
            >
             I'm a Venue
            </Button>
          </div>

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green focus:border-green focus:z-10 text-sm md:text-base"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green focus:border-green focus:z-10 text-sm md:text-base"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                disabled={isLoading}
              />
            </div>
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
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                disabled={isLoading}
              />
              <ShowHidePassword
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              variant="green"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
