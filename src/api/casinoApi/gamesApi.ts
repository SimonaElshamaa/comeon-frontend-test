import { request } from "../client";
import type { Game } from "../../types/game";

export function getGames() {
  return request<Game[]>("/games");
}

export function getGame(id: string) {
  return request<Game>(`/games/${id}`);
}