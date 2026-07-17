import { API_ERRORS } from "./errors";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";
  

export class ApiError extends Error {
  readonly status?: number;
  constructor(
    message: string, status?: number) {
    super(message);
    this.name = "ApiError";

    this.status = status;
  }
}


export async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  let response: Response;

  // Network errors
  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new ApiError(API_ERRORS.NETWORK_ERROR);
  }

  // HTTP errors (401, 404, 500...)
  if (!response.ok) {
    throw new ApiError(
      API_ERRORS.REQUEST_FAILED,
      response.status,
    );
  }

  // Invalid JSON
  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(
      API_ERRORS.INVALID_RESPONSE,
      response.status,
    );
  }
}