import type { Game } from "../types/game";
import { GameCard } from "./GameCard";

type GamesListProps = {
  games: Game[];
  onPlay: (gameCode: string) => void;
};

export function GamesList({
  games,
  onPlay,
}: GamesListProps) {
  return (
    <section className="games-section">
        <h2 className="section-heading" id="games-heading">Games</h2>

        <div className="section-divider" />

        {games.length > 0 ? (
            <div className="games-list">
            {games.map((game) => (
                <GameCard
                    game={game}
                    onPlay={onPlay}
                    key={game.code}
                />
            ))}
            </div>
        ) : (
            <div className="ui message empty-games-message">
            <header>No games found</header>
            <p>Try another search term or choose a different category.</p>
            </div>
        )}
    </section>
  );
}
  