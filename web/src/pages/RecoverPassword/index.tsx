import { FormEvent, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

export function RecoverPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasChangedPassword, setHasChangedPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    try {
      await api.post("/users/recover?code=" + code, {
        password,
        confirmPassword,
      });

      setHasChangedPassword(true);
    } catch (err) {
      console.error(err);
    }
  }

  function goToLogin () {
    navigate("/login")
  }

  return (
    <div className={styles.container}>
      <Header />

      {hasChangedPassword ? (
        <main className={styles.passwordRecovered}>
          <h1 className={styles.title}>OK!</h1>

          <p className={styles.description}>
            Your password has been updated succesfully!
          </p>

          <button className={styles.goToLogin} type="button" onClick={goToLogin}>
            Login
          </button>
        </main>
      ) : (
        <main className={styles.passwordNotRecovered}>
          <h1 className={styles.title}>Recover Password</h1>

          <p className={styles.description}>Type your new password below: </p>

          <form onSubmit={handleSubmitForm}>
            <InputField
              inputType="password"
              inputId="password"
              labelText="Password"
              valueState={password}
              setValueState={setPassword}
            />
            <InputField
              inputType="password"
              inputId="confirm-password"
              labelText="Confirm Password"
              valueState={confirmPassword}
              setValueState={setConfirmPassword}
            />

            <button className={styles.resetPassword} type="submit">
              Reset Password
            </button>
          </form>
        </main>
      )}
    </div>
  );
}
