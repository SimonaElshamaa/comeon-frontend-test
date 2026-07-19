import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../auth/useAuth";
import type { LoginCredentials } from "../types/auth";

import "./LoginPage.css";


export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/games" replace />;
  }

  const handleLogin = async (
    credentials: LoginCredentials,
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      await login(credentials);
      navigate("/games", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <header className="login-header">
          <img 
          className="login-logo"
          src="/images/logo.svg" 
          alt="ComeOn" />
      </header>

      <section className="login-panel">
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
      </section>
    </main>
  );
}