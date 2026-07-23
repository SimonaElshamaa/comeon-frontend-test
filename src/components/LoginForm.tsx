import { useState, type SyntheticEvent } from "react";
import type { LoginCredentials } from "../types/auth";
import { ErrorMessage } from "./ErrorMessage";

type LoginFormProps = {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export function LoginForm({
  onSubmit,
  isLoading,
  error,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>,) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      return;
    }

    await onSubmit({
      username: trimmedUsername,
      password,
    });
  };

  return (
    <form className="ui form login-form" onSubmit={handleSubmit}>

      {error && (
        <ErrorMessage message={error} />
      )}

      <div className="required field">
        <div className="ui left icon input">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={isLoading}
          />

          <i className="user icon" aria-hidden="true" />
        </div>
      </div>

      <div className="required field">
        <div className="ui left icon input">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
          />

          <i className="lock icon" aria-hidden="true" />
        </div>
      </div>

      <button
        aria-label="Login"
        type="submit"
        className={`ui basic button login-button ${
          isLoading ? "loading disabled" : ""
        }`}
        disabled={isLoading || !username.trim() || !password}
      >
        Login
      </button>
    </form>
  );
}