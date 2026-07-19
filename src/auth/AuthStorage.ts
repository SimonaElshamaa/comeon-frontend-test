import type { Player } from "../types/auth";

const PLAYER_STORAGE_KEY = "player";

export function savePlayer(player: Player): void {
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(player));
}

export function getStoredPlayer(): Player | null {
  const storedPlayer = localStorage.getItem(PLAYER_STORAGE_KEY);

  if (!storedPlayer) {
    return null;
  }

  try {
    return JSON.parse(storedPlayer) as Player;
  } catch {
    localStorage.removeItem(PLAYER_STORAGE_KEY);
    return null;
  }
}

export function removeStoredPlayer(): void {
  localStorage.removeItem(PLAYER_STORAGE_KEY);
}