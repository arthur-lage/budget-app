import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { currentUser, handleSetToken } = useAuth();

  async function handleForm(e: FormEvent) {
    e.preventDefault();

    const res = await api.post("/users", {
      name,
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

      <h1 className={styles.title}>Register</h1>

      <form className={styles.form} onSubmit={handleForm}>
        <div className={styles.inputField}>
          <input
            className={styles.inputBox}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            id="name"
            placeholder=" "
          />
          <label className={styles.inputLabel} htmlFor="name">
            Name
          </label>
        </div>
        <div className={styles.inputField}>
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

        <Link className={styles.loginLink} to="/login">
          Already have an account? Login
        </Link>

        <button className={styles.registerButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
