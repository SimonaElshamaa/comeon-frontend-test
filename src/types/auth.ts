export type LoginCredentials = {
  username: string;
  password: string;
};

export type Player = {
  name: string;
  avatar?: string;
  event?: string;
};

export interface LoginResponse {
  status: "success";
  player: Player;
}

export interface ErrorResponse {
  status: "fail";
  error: string;
}