import { request } from "../client";
import type {
  LoginCredentials,
  LoginResponse
} from "../../types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:3001";

export async function loginRequest(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid username or password.");
    }

    throw new Error("Invalid username or password. Please try again.");
  }

  return (await response.json()) as LoginResponse;
}

export function logoutRequest(name: string) {
  return request<{ status: string }>("/logout", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
}