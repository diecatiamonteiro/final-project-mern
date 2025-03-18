import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  console.log(token, userId);

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/auth/verify-email?token=${token}&userId=${userId}`
      );

      console.log(response);

      if (response.status === 200) {
        navigate("/login");
      }
    };

    verifyEmail();
  }, []);

  return <div>VerificationPage</div>;
}
