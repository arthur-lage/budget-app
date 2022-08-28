import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleSetToken } = useAuth();

  async function handleForm(e: FormEvent) {
    e.preventDefault();

    const res = await api.post("/users", {
      name,
      email,
      password,
    });

    handleSetToken(res.data.token);
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleForm}>
        <div className="inputField">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            id="name"
            placeholder="Your name"
          />
        </div>
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
        <button type="submit">Register</button>
      </form>

      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}
