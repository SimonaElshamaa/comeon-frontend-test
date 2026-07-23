export const API_ERRORS = {
  NETWORK:
    "We could not connect to the server. Please check your connection.",
  UNAUTHORIZED:
    "Invalid username or password.",
  NOT_FOUND:
    "The requested resource could not be found.",
  SERVER:
    "The server is currently unavailable. Please try again.",
  REQUEST_FAILED:
    "The request could not be completed.",
  INVALID_RESPONSE:
    "The server returned an invalid response.",
} as const;

export function getApiErrorMessage(status: number): string {
  if (status === 401) {
    return API_ERRORS.UNAUTHORIZED;
  }

  if (status === 404) {
    return API_ERRORS.NOT_FOUND;
  }

  if (status >= 500) {
    return API_ERRORS.SERVER;
  }

  return API_ERRORS.REQUEST_FAILED;
}