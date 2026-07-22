import {
  useState,
  type ReactNode,
} from "react";

import { loginRequest, logoutRequest } from "../api/casinoApi/authApi";
import {
  getStoredPlayer,
  removeStoredPlayer,
  savePlayer,
} from "./AuthStorage";
import { AuthContext } from "./AuthContextDefinition";

import type {
  LoginCredentials,
  Player,
} from "../types/auth";



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

  const logout = async (player: Player) => {
    await logoutRequest(player.name);
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