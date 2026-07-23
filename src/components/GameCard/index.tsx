import type { Game } from "../../types/game";
import "./StyleSheet.css";

type GameCardProps = {
   game: Game;
   onPlay: (gameCode: string) => void;
};

export function GameCard({
  game,
  onPlay,
}: GameCardProps) {
  return (
    <article className="game-card">
        <div className="game-image-wrapper">
            <img
            className="game-image"
            src={game.icon}
            alt={`${game.name} game`}
            onClick={() => onPlay(game.code)}
            />
        </div>

        <div className="game-content">
            <h3 onClick={() => onPlay(game.code)}>
              {game.name}
            </h3>

            <p>{game.description}</p>

            <button
            aria-label={`Play ${game.name}`}
            className="ui black button play-button"
            type="button"
            onClick={() => onPlay(game.code)}
            >
            Play
            <i
                className="right chevron icon"
                aria-hidden="true"
            />
            </button>
        </div>
    </article>
  );
}









