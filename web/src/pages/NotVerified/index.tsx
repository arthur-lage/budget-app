import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

export function NotVerified() {
  const { currentUser, checkUserAuth } = useAuth();

  async function handleResendLink() {
    const res = await api.patch("/users/new-email-validation-code");

    console.log("Email resent succesfully. Please check your inbox :).");
  }

  useEffect(() => {
    checkUserAuth();

    if (currentUser?.isEmailVerified) {
      window.location.href = "/";
    }
  }, [currentUser]);

  return (
    <div>
      <h1>You email is not verified yet!</h1>

      <p>
        If you didn't receive the activation link in your email, click the
        button below
      </p>

      <button onClick={handleResendLink}>Resend Link</button>
    </div>
  );
}
