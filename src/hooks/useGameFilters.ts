import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type { Game } from "../types/game";

type UseGameFiltersResult = {
  searchTerm: string;
  selectedCategoryId: number | null;
  setSearchTerm: (value: string) => void;
  setSelectedCategoryId: (id: number | null) => void;
  filteredGames: Game[];
};

export function useGameFilters(games: Game[]): UseGameFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") ?? "";

  const categoryParam = searchParams.get("category");

  const selectedCategoryId =
    categoryParam !== null && categoryParam !== ""
      ? Number(categoryParam)
      : null;

  function setSearchTerm(value: string) {
    setSearchParams((currentParams) => {
      const newParams = new URLSearchParams(currentParams);

      if (value.trim()) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }

      return newParams;
    });
  }

  function setSelectedCategoryId(id: number | null) {
    setSearchParams((currentParams) => {
      const newParams = new URLSearchParams(currentParams);

      if (id === null) {
        newParams.delete("category");
      } else {
        newParams.set("category", String(id));
      }

      return newParams;
    });
  }

  const filteredGames = useMemo(() => {
  const query = searchTerm.trim().toLowerCase();

  // Apply the selected category first.
  const gamesInSelectedCategory =
    selectedCategoryId === null
      ? games
      : games.filter((game) =>
          game.categoryIds.includes(selectedCategoryId),
        );

  // Preserve the original order when there is no search.
  if (!query) {
    return gamesInSelectedCategory;
    }

    return gamesInSelectedCategory
      .map((game, originalIndex) => {
        const normalizedName = game.name.toLowerCase();
        const normalizedDescription =
          game.description.toLowerCase();

        let score: number | null = null;

        if (normalizedName === query) {
          // Highest relevance: exact game name.
          score = 0;
        } else if (normalizedName.startsWith(query)) {
          // Second: game name starts with the query.
          score = 1;
        } else if (normalizedName.includes(query)) {
          // Third: game name contains the query.
          score = 2;
        } else if (
          normalizedDescription.includes(query)
        ) {
          // Lowest relevance: description contains the query.
          score = 3;
        }

        return {
          game,
          score,
          originalIndex,
        };
      })
      .filter(
        (
          result,
        ): result is {
          game: Game;
          score: number;
          originalIndex: number;
        } => result.score !== null,
      )
      .sort(
        (firstResult, secondResult) =>
          firstResult.score - secondResult.score ||
          firstResult.originalIndex -
            secondResult.originalIndex,
      )
      .map(({ game }) => game);
  }, [games, searchTerm, selectedCategoryId]);

  return {
    searchTerm,
    selectedCategoryId,
    setSearchTerm,
    setSelectedCategoryId,
    filteredGames,
  };
}