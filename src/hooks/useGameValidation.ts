import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../api/getErrorMessage";
import type { Game } from "../types/game";

type UseGameValidationDependencies = {
  fetchGames: () => Promise<Game[]>;
};

type UseGameValidationResult = {
  game: Game | null;
  isLoading: boolean;
  isNotFound: boolean;
  error: string | null;
  reload: () => void;
};

export function useGameValidation(
  gameCode: string | undefined,
  { fetchGames }: UseGameValidationDependencies,
): UseGameValidationResult {
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function validateGame() {
      setIsLoading(true);
      setGame(null);
      setError(null);
      setIsNotFound(false);

      if (!gameCode) {
        setIsNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const games = await fetchGames();

        if (isCancelled) {
          return;
        }

        const selectedGame = games.find(
          (game) => game.code === gameCode,
        );

        if (!selectedGame) {
          setIsNotFound(true);
          return;
        }

        setGame(selectedGame);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setError(
          getErrorMessage(
            error,
            "We could not verify the selected game.",
          ),
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void validateGame();

    return () => {
      isCancelled = true;
    };
  }, [gameCode, fetchGames, reloadKey]);

  return {
    game,
    isLoading,
    isNotFound,
    error,
    reload,
  };
}