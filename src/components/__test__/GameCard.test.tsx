import { render, screen } from "@testing-library/react";
import { GameCard } from "../GameCard";
import type { IndieGame } from "../../types/types";

const mockGame: IndieGame = {
  appid: 1,
  name: "Mock Game",
  developers: ["A", "B"],
  header_image: "https://example.com/image.jpg",
  url: "https://example.com/game",
  release_date: "2025-1-1",
  short_description: "mock game description.",
  screenshots: [],
};

describe("GameCardコンポーネント", () => {
  test("ゲーム情報が表示される", () => {
    render(<GameCard game={mockGame} rank={1} />);

    expect(
      screen.getByText((content) => content.replace(/\s/g, "").includes("1"))
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Mock Game/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.replace(/\s/g, "").includes("製作者:A,B")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.replace(/\s/g, "").includes("リリース日:2025-1-1")
      )
    ).toBeInTheDocument();

    expect(screen.getByText("mock game description.")).toBeInTheDocument();

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com/game"
    );
  });
});
