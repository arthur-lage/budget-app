import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    async function verifyEmail() {
      try {
        const res = await api.get("/users/verify?code=" + code);

        // navigate("/");
        console.log("success", res)
      } catch (err) {
        console.error(err);
      }
    }

    verifyEmail();
  }, []);

  return (
    <div>
      <h1>Verify Email</h1>

      <p>Verifing email...</p>
    </div>
  );
}
