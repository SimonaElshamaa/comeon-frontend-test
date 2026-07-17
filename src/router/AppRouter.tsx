import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { GamesPage } from "../pages/GamesPage";
import { GamePage } from "../pages/GamePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/games/:gameCode" element={<GamePage />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
