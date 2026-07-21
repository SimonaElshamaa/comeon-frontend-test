import { render, screen, waitFor } from "@testing-library/react";
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

import { LoginPage } from "..//pages/LoginPage";
import { useAuth } from "../auth/useAuth";

vi.mock("../auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

const login = vi.fn();
const logout = vi.fn();

function renderLoginPage() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/games"
          element={<h1>Games page</h1>}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAuth).mockReturnValue({
      player: null,
      isAuthenticated: false,
      login,
      logout,
    });
  });

  it("navigates to the games page after successful login", async () => {
    const user = userEvent.setup();

    login.mockResolvedValueOnce(undefined);

    renderLoginPage();

    await user.type(
      screen.getByPlaceholderText(/username/i),
      "  rebecka  ",
    );

    await user.type(
      screen.getByPlaceholderText(/password/i),
      "secret",
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: "rebecka",
        password: "secret",
      });
    });

    expect(
      await screen.findByRole("heading", {
        name: /games page/i,
      }),
    ).toBeInTheDocument();
  });

  it("displays an error when login fails", async () => {
    const user = userEvent.setup();

    login.mockRejectedValueOnce(
      new Error("Invalid username or password."),
    );

    renderLoginPage();

    await user.type(
      screen.getByPlaceholderText(/username/i),
      "wrong-user",
    );

    await user.type(
      screen.getByPlaceholderText(/password/i),
      "wrong-password",
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent(
      "Invalid username or password.",
    );

    expect(
      screen.queryByRole("heading", {
        name: /games page/i,
      }),
    ).not.toBeInTheDocument();
  });
});