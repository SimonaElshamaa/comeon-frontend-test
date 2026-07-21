import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../components/Header";
import { LogoutButton } from "../components/LogoutButton";
import { PlayerProfile } from "../components/PlayerProfile";

export  function GamePage() {
  const { gameCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameCode) return;

    comeon.game.launch(gameCode);
    return () => {
    // Clean up the game container to prevent the previous game from remaining mounted.
    document.getElementById("game-launch")?.replaceChildren();
  };
    
  }, [gameCode]);

  return (
    <main className="games-page">
      <Header />

      <section className="games-shell">
          <PlayerProfile />
          <LogoutButton />
          <button
          type="button"
          className="ui black button logout-button"
          onClick={() => navigate("/games")}
        >
          Back to games
        </button>
        <div id="game-launch" />
      </section>
    </main>
  );
}
