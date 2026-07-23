import { render, screen, within } from "@testing-library/react";
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
    description: "A colourful space slot game",
    icon: "/images/starburst.jpg",
    categoryIds: [1],
  },
  {
    code: "book-of-ra",
    name: "Book of Ra",
    description: "Explore an ancient Egyptian adventure",
    icon: "/images/book-of-ra.jpg",
    categoryIds: [1, 2],
  },
  {
    code: "blackjack",
    name: "Blackjack",
    description: "Classic casino card game",
    icon: "/images/blackjack.jpg",
    categoryIds: [2],
  },
];

const categories: Category[] = [
  { id: 1, name: "Slots" },
  { id: 2, name: "Table games" },
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

    vi.mocked(getGames).mockResolvedValue(games);
    vi.mocked(getCategories).mockResolvedValue(
      categories,
    );
  });

  it("opens the correct game route when Play is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getGames).mockResolvedValueOnce(games);

    renderGamesPage();

      const starburstHeading =
    await screen.findByRole("heading", {
      name: "Starburst",
    });

  const gameCard =
    starburstHeading.closest("article");

  expect(gameCard).not.toBeNull();

  await user.click(
    within(gameCard as HTMLElement).getByRole(
      "button",
      {
        name: /play/i,
      },
    ),
  );

   expect(
    await screen.findByRole("heading", {
      name: /opened game:\s*starburst/i,
    }),
  ).toBeInTheDocument();
});

  it("filters games by search text", async () => {
    const user = userEvent.setup();

    renderGamesPage();

    expect(
      await screen.findByRole("heading", {
        name: "Starburst",
      }),
    ).toBeInTheDocument();

    const searchInput = screen.getByRole("searchbox", {
      name: "Search games",
    });

    await user.type(searchInput, "book");

    expect(
      screen.getByRole("heading", {
        name: "Book of Ra",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Starburst",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Blackjack",
      }),
    ).not.toBeInTheDocument();
  });

  it("combines search and category filters", async () => {
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
        name: /table games/i,
      }),
    );

    await user.type(
      screen.getByRole("searchbox"),
      "book",
    );

    expect(
      screen.getByRole("heading", {
        name: "Book of Ra",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Blackjack",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Starburst",
      }),
    ).not.toBeInTheDocument();
  });

  it("shows an error when games cannot be loaded", async () => {
    vi.mocked(getGames).mockRejectedValueOnce(
      new Error("Unable to load games."),
    );

    renderGamesPage();

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Unable to load games.");

    expect(
      screen.queryByRole("heading", {
        name: "Starburst",
      }),
    ).not.toBeInTheDocument();
  });

  it("shows a loading state while data is being fetched", () => {
    vi.mocked(getGames).mockReturnValue(
      new Promise(() => {}),
    );

    vi.mocked(getCategories).mockReturnValue(
      new Promise(() => {}),
    );

    renderGamesPage();

    expect(
      screen.getByText(/loading.../i),
    ).toBeInTheDocument();
  });
});