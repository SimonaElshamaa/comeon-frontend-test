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
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return games.filter((game) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        game.name.toLowerCase().includes(normalizedSearch) ||
        game.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategoryId === null ||
        game.categoryIds.includes(selectedCategoryId);

      return matchesSearch && matchesCategory;
    });
  }, [games, searchTerm, selectedCategoryId]);

  return {
    searchTerm,
    selectedCategoryId,
    setSearchTerm,
    setSelectedCategoryId,
    filteredGames,
  };
}