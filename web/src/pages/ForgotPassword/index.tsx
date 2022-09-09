import { FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
import { api } from "../../services/api";

import EmailSentImage from '../../assets/email-sent.svg'

import styles from "./styles.module.scss";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [hasSentEmail, setHasSentEmail] = useState(false);

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    try {
      await api.post("/users/forgot-password", {
        email,
      });

      setHasSentEmail(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      {hasSentEmail ? (
        <main className={styles.hasSent}>
          <h1 className={styles.title}>Check your email!</h1>

          <p className={styles.description}>
            <span>We’ve sent a recover email to “example@email.com”!</span>
            <span>
              Click the “RESET PASSWORD” button in the email to proceed.
            </span>
          </p>

          <img src={EmailSentImage} className={styles.illustration} alt="Man looking at his emails on his phone" />
        </main>
      ) : (
        <main className={styles.notSent}>
          <h1 className={styles.title}>Forgot Password</h1>

          <p className={styles.description}>
            <span>Did you forget your password? Don't worry!</span>
            <span>
              Type the email you want to recover below so we can help you:
            </span>
          </p>

          <form onSubmit={submitForm}>
            <InputField
              inputId="email"
              inputType="email"
              labelText="Email"
              valueState={email}
              setValueState={setEmail}
            />

            <button className={styles.recoverAccount} type="submit">
              Recover Account
            </button>
          </form>
        </main>
      )}
    </div>
  );
}
