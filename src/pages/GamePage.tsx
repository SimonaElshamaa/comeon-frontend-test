import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getGames } from "../api/casinoApi/gamesApi";

import { useGameValidation } from "../hooks/useGameValidation";

import { Header } from "../components/Header";
import { LogoutButton } from "../components/LogoutButton";
import { PlayerProfile } from "../components/PlayerProfile";

import "./GamePage.css";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingState } from "../components/LoadingState";

export  function GamePage() {
  const { gameCode } = useParams();
  const navigate = useNavigate();

  const {
    game,
    isLoading,
    isNotFound,
    error: validationError,
    reload,
  } = useGameValidation(gameCode, {
    fetchGames: getGames,
  });

  const [launchError, setLaunchError] =
    useState<string | null>(null);
  const [launchAttempt, setLaunchAttempt] = useState(0);

  useEffect(() => {
    if (!game) {
      return;
    }
    const gameContainer =
      document.getElementById("game-launch");

    setLaunchError(null);

    try {
      gameContainer?.replaceChildren();
      comeon.game.launch(game.code);
    } catch {
      setLaunchError(
        "The game could not be started. Please try again.",
      );
    }

    return () => {
      gameContainer?.replaceChildren();
    };
  }, [game, launchAttempt]);

  function retryLaunch() {
    setLaunchAttempt(
      (currentAttempt) => currentAttempt + 1,
    );
  }

  return (
     <main className="game-page">
      <Header />

      <section className="game-shell">
        <div className="game-toolbar">
          <PlayerProfile />
          <div className="game-actions">
            <LogoutButton />            
            <button
            aria-label="Back to games"
              type="button"
              className="ui black button game-back-button"
              onClick={() => navigate("/games")}
            >
              <i
                className="left chevron icon"
                aria-hidden="true"
              />
              Back to games
            </button>
          </div>
         
        </div>
        {isLoading && (
          <LoadingState />
        )}

        {validationError && (
          <div role="alert">
            <ErrorMessage message={validationError} onRetry={reload} />
          </div>
        )}

        {isNotFound && (
          <ErrorMessage message="The requested game could not be found." />
        )}

        {game && (
          <>
            {launchError && (<ErrorMessage message={launchError} onRetry={retryLaunch} />)}
            <div
              id="game-launch"
              aria-label={`${game.name} game area`}
            />
          </>
        )}
      </section>
    </main>
  );
}
