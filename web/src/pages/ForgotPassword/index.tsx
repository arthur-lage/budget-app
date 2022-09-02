import { FormEvent, useState } from "react";
import { api } from "../../services/api";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    api.post("/users/forgot-password", {
      email,
    });
  }

  return (
    <div>
      <h1>Forgot Password</h1>

      <p>
        Did you forget your password? Don't worry! <br /> Type the email you
        want to recover below so we can help you:
      </p>

      <form onSubmit={submitForm}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
          />
        </div>

        <button type="submit">Recover account</button>
      </form>
    </div>
  );
}
