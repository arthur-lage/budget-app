import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [loading, setLoading] = useState(true);
  const [hasBeenVerified, setHasBeenVerified] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.isEmailVerified) {
      return navigate("/");
    }

    async function verifyEmail() {
      try {
        const res = await api.get("/users/verify?code=" + code);

        setLoading(false);
        setHasBeenVerified(true);
        navigate("/");
      } catch (err) {
        console.error(err);
        setLoading(false);
        setHasBeenVerified(false);
      }
    }

    verifyEmail();
  }, []);

  return (
    <div>
      <h1>Verify Email</h1>

      {loading ? (
        <>
          <Loading />
          <p>Verifing email...</p>
        </>
      ) : (
        <>
          {hasBeenVerified ? (
            <h2>Email verified! Redirecting...</h2>
          ) : (
            <h2>Couldn't verify email. Try again!</h2>
          )}
        </>
      )}
    </div>
  );
}
