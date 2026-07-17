export interface User {
  name: string;
  avatar: string;
  event: string;
}

export interface LoginResponse {
  status: "success";
  player: User;
}

export interface ErrorResponse {
  status: "fail";
  error: string;
}