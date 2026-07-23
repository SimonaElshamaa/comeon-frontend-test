import { useNavigate } from "react-router-dom";

import { getGames } from "../api/casinoApi/gamesApi";
import { getCategories } from "../api/casinoApi/categoriesApi";

import { useGamesData } from "../hooks/useGamesData";
import { useGameFilters } from "../hooks/useGameFilters"; 

import { Header } from "../components/Header";
import { PlayerProfile } from "../components/PlayerProfile";
import { LogoutButton } from "../components/LogoutButton";
import { CategoryList } from "../components/CategoryList";
import { SearchBar } from "../components/SearchBar";
import { GamesList } from "../components/GameList";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingState } from "../components/LoadingState";

import "./Gamespage.css";


export function GamesPage() {

  const navigate = useNavigate();

   // First hook: loads games and categories from the API.
  const {
    games,
    categories,
    isLoading,
    error,
    reload,
  } = useGamesData({
    fetchGames: getGames,
    fetchCategories: getCategories});

  // Second hook: filters the games returned by the first hook.
  const {
    searchTerm,
    selectedCategoryId,
    setSearchTerm,
    setSelectedCategoryId,
    filteredGames,
  } = useGameFilters(games);

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
            <div className="games-actions">
              <LogoutButton />
            </div>
          </div>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </header>
        {isLoading ? (
        <LoadingState/>
      ) : error ? (
          <ErrorMessage 
          message={error} 
          onRetry={reload}
          />
      ) : (
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
      )}
      </section>
    </main>
  );
}