import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getGames } from "../api/casinoApi/gamesApi";
import { getCategories } from "../api/casinoApi/categoriesApi";
import type { Game } from "../types/game";
import type { Category } from "../types/category";

import { Header } from "../components/Header";
import { PlayerProfile } from "../components/PlayerProfile";
import { LogoutButton } from "../components/LogoutButton";
import { CategoryList } from "../components/CategoryList";
import "./Gamespage.css";
import { SearchBar } from "../components/SearchBar";
import { GamesList } from "../components/GameList";

export function GamesPage({} ) {
  const navigate = useNavigate();

  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    async function loadPageData() {
      try {
        setIsLoading(true);
        setError(null); 

        const [gamesData, categoriesData] =
          await Promise.all([
            getGames(),
            getCategories(),
          ]);

        setGames(gamesData);
        setCategories(categoriesData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        ); 
      } finally {
        setIsLoading(false);
      }
    }

    void loadPageData();
  }, []);

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

  function handlePlay(gameCode: string) {
    navigate(`/games/${gameCode}`);
  }

 

  return (
    <main className="games-page">
      <Header />
      <section className="games-shell">
        <header className="games-header">
          <div className="player-area">
            <PlayerProfile />
            <LogoutButton />
          </div>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </header>

        <div className="games-layout">
          <GamesList
            games={filteredGames}
            onPlay={handlePlay}
          />

            <CategoryList
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
        </div>
      </section>
    </main>
  );
}