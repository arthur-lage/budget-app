import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";

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
    <div>
      <Header/>

      <h1>Login</h1>

      <form onSubmit={handleForm}>
        <div className="inputField">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Your email. eg: example@mail.com"
          />
        </div>
        <div className="inputField">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <Link to="/forgot-password">Forgot your password? Click here</Link>
      <Link to="/register">Don't have an account yet? Create one</Link>
    </div>
  );
}
