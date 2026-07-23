import {
  API_ERRORS,
  getApiErrorMessage,
} from "./errors";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:3001";

type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);

    this.name = "ApiError";
    this.status = status;
  }
}

async function readErrorMessage(
  response: Response,
): Promise<string> {
  try {
    const data =
      (await response.json()) as ApiErrorResponse;

    return (
      data.message ??
      data.error ??
      getApiErrorMessage(response.status)
    );
  } catch {
    return getApiErrorMessage(response.status);
  }
}

export async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(
      `${API_BASE_URL}${path}`,
      options,
    );
  } catch {
    throw new ApiError(API_ERRORS.NETWORK);
  }

  if (!response.ok) {
    const message = await readErrorMessage(response);

    throw new ApiError(
      message,
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(
      API_ERRORS.INVALID_RESPONSE,
      response.status,
    );
  }
}