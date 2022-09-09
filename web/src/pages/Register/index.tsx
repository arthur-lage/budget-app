import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
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
        <InputField
          inputId="name"
          inputType="text"
          labelText="name"
          valueState={name}
          setValueState={setName}
        />
        <InputField
          // className={}
          inputId="email"
          inputType="email"
          labelText="Email"
          valueState={email}
          setValueState={setEmail}
        />
        <InputField
          inputId="password"
          inputType="password"
          labelText="Password"
          valueState={password}
          setValueState={setPassword}
        />

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
