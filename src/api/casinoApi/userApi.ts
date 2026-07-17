import { request } from "../client";
import type { LoginResponse } from "../../types/user";

export function login(username: string, password: string) {
  return request<LoginResponse>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}

export function logout(username: string) {
  return request<{ status: string }>("/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
}