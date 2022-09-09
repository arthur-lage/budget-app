import { useEffect } from "react";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

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
    <div className={styles.container}>
      <Header />

      <main>
        <h1 className={styles.title}>Your email is not verified yet!</h1>

        <p className={styles.description}>
          If you didn't receive the activation link in your email, click the
          button below
        </p>

        <button
          className={styles.resendLink}
          type="button"
          onClick={handleResendLink}
        >
          Resend Link
        </button>
      </main>
    </div>
  );
}
