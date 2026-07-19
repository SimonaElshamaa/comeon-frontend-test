import { request } from "../client";
import type { Game } from "../../types/game";

export function getGames() {
  return request<Game[] >("/games",{ method: 'get'});
}

export function getGame(id: string) {
  return request<Game>(`/games/${id}`);
}