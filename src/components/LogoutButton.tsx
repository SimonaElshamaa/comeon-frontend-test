import {useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/useAuth";

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

async function handleLogout() {
    try {
        setIsLoggingOut(true);

        await logout?.();

        navigate("/login", {
        replace: true,
        });
    } finally {
        setIsLoggingOut(false);
    }
}

  return (
    <button
        className={`ui black button logout-button ${
        isLoggingOut ? "loading disabled" : ""
        }`}
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
    >
        <i className="left chevron icon" aria-hidden="true" />
        Log Out
    </button>
  );
}