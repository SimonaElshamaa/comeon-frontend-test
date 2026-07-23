import { request } from "../client";
import type {
  LoginCredentials,
  LoginResponse,
} from "../../types/auth";

export function loginRequest(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return request<LoginResponse>("/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export function logoutRequest(
  username: string,
): Promise<{ status: string }> {
  return request<{ status: string }>("/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
}