import { useEffect, useState } from "react";

import type { Game } from "../types/game";
import type { Category } from "../types/category";

type UseGamesDataDependencies = {
  fetchGames: () => Promise<Game[]>;
  fetchCategories: () => Promise<Category[]>;
};

type UseGamesDataResult = {
  games: Game[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

export function useGamesData({
  fetchGames,
  fetchCategories,
}: UseGamesDataDependencies): UseGamesDataResult {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    let isCancelled = false;

    async function loadGamesData() {
      try {
        const [gamesData, categoriesData] =
          await Promise.all([
            fetchGames(),
            fetchCategories(),
          ]);

        if (isCancelled) {
          return;
        }

        setGames(gamesData);
        setCategories(categoriesData);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "We could not load the games.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadGamesData();

    return () => {
      isCancelled = true;
    };
  }, [fetchGames, fetchCategories]);


  return {
    games,
    categories,
    isLoading,
    error,
  };
}