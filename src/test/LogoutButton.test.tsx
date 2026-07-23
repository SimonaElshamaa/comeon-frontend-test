import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
import { LogoutButton } from "../components/LogoutButton";
import { useAuth } from "../auth/useAuth";

vi.mock("../auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

const login = vi.fn();
const logout = vi.fn();

const player = {
  username: "rebecka",
  name: "Rebecka Awesome",
  avatar: "/images/avatar/rebecka.jpg",
  event: "",
};

function renderLogoutButton() {
  return render(
    <MemoryRouter initialEntries={["/games"]}>
      <Routes>
        <Route
          path="/games"
          element={<LogoutButton />}
        />

        <Route
          path="/login"
          element={<h1>Login page</h1>}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("LogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAuth).mockReturnValue({
      player,
      isAuthenticated: true,
      login,
      logout,
    });
  });

  it("logs out the player and returns to login", async () => {
    const user = userEvent.setup();

    logout.mockResolvedValueOnce(undefined);

    renderLogoutButton();

    await user.click(
      screen.getByRole("button", {
        name: /log out/i,
      }),
    );

    expect(logout).toHaveBeenCalledWith(player);

    expect(
      await screen.findByRole("heading", {
        name: /login page/i,
      }),
    ).toBeInTheDocument();
  });

  it("disables the button while logout is pending", async () => {
    const user = userEvent.setup();

    logout.mockReturnValue(
      new Promise(() => {}),
    );

    renderLogoutButton();

    const button = screen.getByRole("button", {
      name: /log out/i,
    });

    await user.click(button);

    expect(button).toBeDisabled();
  });
});