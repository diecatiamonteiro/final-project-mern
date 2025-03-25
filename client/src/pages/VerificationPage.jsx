import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "../contexts/Context";
import { verifyEmail } from "../api/usersApi";
import Button from "../components/Button";

export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const { usersDispatch } = useContext(DataContext);
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // "verifying", "success", "error"

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(usersDispatch, token, userId);
        setVerificationStatus("success");
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    verify();
  }, [token, userId, usersDispatch]);

  if (verificationStatus === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Verifying your email...</h2>
          <p>Please wait while we verify your email address.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-midnightBlack">
            {verificationStatus === "success"
              ? "Email Verified Successfully!"
              : "Email Verification Failed"}
          </h2>
          <p className="mt-4 text-center text-midnightBlack/70 text-base md:text-lg">
            {verificationStatus === "success"
              ? "Your email has been verified. You can now log in to your account."
              : "Sorry, we couldn't verify your email. Please try again or contact support."}
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              variant="green"
              onClick={() =>
                navigate("/login", {
                  state: {
                    message:
                      verificationStatus === "success"
                        ? "Email verified successfully. You can now log in."
                        : "Email verification failed. Please try again.",
                  },
                })
              }
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
