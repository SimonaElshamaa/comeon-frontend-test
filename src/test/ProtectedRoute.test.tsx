import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { useAuth } from "../auth/useAuth";

vi.mock("../auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

const login = vi.fn();
const logout = vi.fn();

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={["/games"]}>
      <Routes>
        <Route
          path="/login"
          element={<h1>Login page</h1>}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/games"
            element={<h1>Games page</h1>}
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to login", async () => {
    vi.mocked(useAuth).mockReturnValue({
      player: null,
      isAuthenticated: false,
      login,
      logout,
    });

    renderProtectedRoute();

    expect(
      await screen.findByRole("heading", {
        name: /login page/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /games page/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders protected content for authenticated users", () => {
    vi.mocked(useAuth).mockReturnValue({
      player: {
        username: "rebecka",
        name: "Rebecka Awesome",
        avatar: "/images/avatar/rebecka.jpg",
        event: "",
      },
      isAuthenticated: true,
      login,
      logout,
    });

    renderProtectedRoute();

    expect(
      screen.getByRole("heading", {
        name: /games page/i,
      }),
    ).toBeInTheDocument();
  });
});