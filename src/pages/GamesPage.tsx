import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getGames } from "../api/casinoApi/gamesApi";
import { getCategories } from "../api/casinoApi/categoriesApi";
import type { Game } from "../types/game";
import type { Category } from "../types/category";

import { Header } from "../components/Header";
import "./Gamespage.css";
import { PlayerProfile } from "../components/PlayerProfile";
import { LogoutButton } from "../components/LogoutButton";



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

          <div className="search-area">
            <label className="sr-only" htmlFor="game-search">
              Search games
            </label>

            <div className="ui fluid icon input game-search">
              <input
                id="game-search"
                type="search"
                placeholder="Search Game"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              <i className="search icon" aria-hidden="true" />
            </div>
          </div>
        </header>

        <div className="games-layout">
          <section className="games-section">
            <h2 className="section-heading">Games</h2>

            <div className="section-divider" />

            {filteredGames.length > 0 ? (
              <div className="games-list">
                {filteredGames.map((game) => (
                  <article className="game-card" key={game.code}>
                    <div className="game-image-wrapper">
                      <img
                        className="game-image"
                        src={game.icon}
                        alt={`${game.name} game`}
                      />
                    </div>

                    <div className="game-content">
                      <h3>{game.name}</h3>

                      <p>{game.description}</p>

                      <button
                        className="ui black button play-button"
                        type="button"
                        onClick={() => handlePlay(game.code)}
                      >
                        Play
                        <i
                          className="right chevron icon"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ui message empty-games-message">
                <div className="header">No games found</div>
                <p>Try another search term or choose a different category.</p>
              </div>
            )}
          </section>

          <aside className="categories-section">
            <h2 className="section-heading">Categories</h2>

            <div className="section-divider" />

            <nav
              className="category-navigation"
              aria-label="Game categories"
            >
              {categories.map((category) => (
                <button
                  className={`category-button ${
                    selectedCategoryId === category.id ? "active" : ""
                  }`}
                  type="button"
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      </section>
    </main>
  );
}