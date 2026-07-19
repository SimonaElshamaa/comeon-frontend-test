import type { Game } from "../types/game";

type GameCardProps = {
   game: Game;
   onPlay: (gameCode: string) => void;
};

export function GameCard({
  game,
  onPlay,
}: GameCardProps) {
  return (
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









