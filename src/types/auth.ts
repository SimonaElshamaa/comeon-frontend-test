export type LoginCredentials = {
  username: string;
  password: string;
};

export type PlayerResponse = {
  name: string;
  avatar: string;
  event: string;
};

export type Player = PlayerResponse & {
  username: string;
};

export interface LoginResponse {
  status: "success";
  player: Player;
}

export interface ErrorResponse {
  status: "fail";
  error: string;
}