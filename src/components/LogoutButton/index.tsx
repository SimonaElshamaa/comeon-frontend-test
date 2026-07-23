import {useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/useAuth";
import "./StyleSheet.css";

export function LogoutButton() {
  const { logout,player } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

async function handleLogout() {
    if (!player) {
      return;
    }
    try {
        setIsLoggingOut(true);

        await logout(player);

        navigate("/login", {
        replace: true,
        });
    } finally {
        setIsLoggingOut(false);
    }
}

  return (
    <button
       aria-label="Log out"
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