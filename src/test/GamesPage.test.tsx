import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { GamesPage } from "../pages/GamesPage";
import { getGames } from "../api/casinoApi/gamesApi";
import { getCategories } from "../api/casinoApi/categoriesApi";

import type { Game } from "../types/game";
import type { Category } from "../types/category";

vi.mock("../api/casinoApi/gamesApi", () => ({
  getGames: vi.fn(),
}));

vi.mock("../api/casinoApi/categoriesApi", () => ({
  getCategories: vi.fn(),
}));

// These components depend on authentication and are not
// relevant to the behaviours being tested here.
vi.mock("../components/Header", () => ({
  Header: () => null,
}));

vi.mock("../components/PlayerProfile", () => ({
  PlayerProfile: () => null,
}));

vi.mock("../components/LogoutButton", () => ({
  LogoutButton: () => null,
}));

const games: Game[] = [
  {
    code: "starburst",
    name: "Starburst",
    description: "A colourful slot game",
    icon: "/images/starburst.jpg",
    categoryIds: [1],
  },
];

const categories: Category[] = [
  {
    id: 1,
    name: "Slots",
  },
];

function OpenedGame() {
  const { gameCode } = useParams();

  return <h1>Opened game: {gameCode}</h1>;
}

function renderGamesPage() {
  return render(
    <MemoryRouter initialEntries={["/games"]}>
      <Routes>
        <Route
          path="/games"
          element={<GamesPage />}
        />

        <Route
          path="/games/:gameCode"
          element={<OpenedGame />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("GamesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getCategories).mockResolvedValue(
      categories,
    );
  });

  it("opens the correct game route when Play is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getGames).mockResolvedValueOnce(games);

    renderGamesPage();

    expect(
      await screen.findByRole("heading", {
        name: "Starburst",
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /play/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /opened game: starburst/i,
      }),
    ).toBeInTheDocument();
  });
});