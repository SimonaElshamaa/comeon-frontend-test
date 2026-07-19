import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { GamesPage } from "../pages/GamesPage";
import { GamePage } from "../pages/GamePage";
import { PotectedRoute } from "../auth/ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PotectedRoute />}>
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:gameCode" element={<GamePage />} />
      </Route>
      

      <Route path="/" element={<Navigate to="/games" replace />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
