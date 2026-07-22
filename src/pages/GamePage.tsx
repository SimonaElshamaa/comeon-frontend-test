import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../components/Header";
import { LogoutButton } from "../components/LogoutButton";
import { PlayerProfile } from "../components/PlayerProfile";
import "./GamePage.css";
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

        <div
          id="game-launch"
          className="game-launch"
        />
      </section>
    </main>
  );
}
