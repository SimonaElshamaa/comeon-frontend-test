import {
  createContext,
  useState,
  type ReactNode,
} from "react";

import { loginRequest } from "../api/casinoApi/authApi";
import {
  getStoredPlayer,
  removeStoredPlayer,
  savePlayer,
} from "./AuthStorage";
import type {
  LoginCredentials,
  Player,
} from "../types/auth";

type AuthContextValue = {
  player: Player | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [player, setPlayer] = useState<Player | null>(() =>
    getStoredPlayer(),
  );


  const login = async (
    credentials: LoginCredentials,
  ): Promise<void> => {
    const result = await loginRequest(credentials);
    const player = result.player;
    savePlayer(player);
    setPlayer(player);
  };

  function logout() {
    removeStoredPlayer();
    setPlayer(null);
  }

  return (
    <AuthContext.Provider
      value={{
        player,
        isAuthenticated: player !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}