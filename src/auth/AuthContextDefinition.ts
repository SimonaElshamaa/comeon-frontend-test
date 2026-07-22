
import { createContext } from "react";

import type {
  LoginCredentials,
  Player,
} from "../types/auth";

type AuthContextValue = {
  player: Player | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: (player: Player) => Promise<void>;
};

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);