import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import { api } from "../../services/api";

import { Header } from "../../components/Header";

import styles from "./styles.module.scss";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, handleSetToken } = useAuth();

  const navigate = useNavigate();

  async function handleForm(e: FormEvent) {
    e.preventDefault();

    const res = await api.post("/users/login", {
      email,
      password,
    });

    handleSetToken(res.data.token);
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <Header />

      <h1 className={styles.title}>Login</h1>

      <form className={styles.form} onSubmit={handleForm}>
        <div className={`${styles.inputField} ${styles.emailInput}`}>
          <input
            className={styles.inputBox}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder=" "
          />
          <label className={styles.inputLabel} htmlFor="email">
            Email
          </label>
        </div>
        <div className={styles.inputField}>
          <input
            className={styles.inputBox}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder=" "
          />
          <label className={styles.inputLabel} htmlFor="password">
            Password
          </label>
        </div>
        
        <div className={styles.links}>
          <Link className={styles.forgotPassword} to="/forgot-password">
            Forgot your password? Click here
          </Link>
          <Link className={styles.registerLink} to="/register">
            Don't have an account yet? Create one
          </Link>
        </div>

        <button className={styles.loginButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
