import { FormEvent, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";

export function RecoverPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    const res = await api.post("/users/recover?code=" + code, {
      password,
      confirmPassword,
    });

    if (res.status == 200) {
      navigate("/");
    }
  }

  return (
    <div>
      <h1>Recover Password</h1>

      <p>Type your new password below: </p>

      <form onSubmit={handleSubmitForm}>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
        </div>

        <div className="input-field">
          <label htmlFor="confirm-password">Confirm your password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="confirm-password"
          />
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
