import { useCallback, useEffect, useState } from "react";

import { getGames } from "../api/casinoApi/gamesApi";
import { getCategories } from "../api/casinoApi/categoriesApi";

import type { Game } from "../types/game";
import type { Category } from "../types/category";

type UseGamesDataResult = {
  games: Game[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export function useGamesData(): UseGamesDataResult {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [gamesData, categoriesData] = await Promise.all([
        getGames(),
        getCategories(),
      ]);

      setGames(gamesData);
      setCategories(categoriesData);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "We could not load the games.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    games,
    categories,
    isLoading,
    error,
    reload,
  };
}