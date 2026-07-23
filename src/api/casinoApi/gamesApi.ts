import { request } from "../client";
import type { Game } from "../../types/game";

export function getGames(): Promise<Game[]> {
  return request<Game[]>("/games", {
    method: "GET",
  });
}