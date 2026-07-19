import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export function PotectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}