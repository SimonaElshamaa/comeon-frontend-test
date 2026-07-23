import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ApiError,
  request,
} from "../api/client";

describe("request", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed JSON for a successful response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({ name: "Starburst" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(
      request<{ name: string }>("/games"),
    ).resolves.toEqual({
      name: "Starburst",
    });
  });

  it("throws a network error when fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new TypeError("Failed to fetch"),
    );

    await expect(
      request("/games"),
    ).rejects.toMatchObject({
      name: "ApiError",
      message:
        "We could not connect to the server. Please check your connection.",
      status: undefined,
    });
  });

  it("throws an unauthorized error for status 401", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(null, {
        status: 401,
      }),
    );

    await expect(
      request("/login"),
    ).rejects.toMatchObject({
      name: "ApiError",
      message: "Invalid username or password.",
      status: 401,
    });
  });

  it("uses an API-provided error message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          message: "Account is temporarily locked.",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(
      request("/login"),
    ).rejects.toMatchObject({
      message: "Account is temporarily locked.",
      status: 403,
    });
  });

  it("throws an error when successful JSON is invalid", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("not-json", {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
    
    await expect(
      request("/games"),
    ).rejects.toMatchObject({
      message:
        "The server returned an invalid response.",
    });
  });
});