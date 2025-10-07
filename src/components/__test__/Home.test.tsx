import { fireEvent, render, screen } from "@testing-library/react";
import { Home } from "../../Pages/Home";

globalThis.fetch = jest.fn();

const mockNewGames = [
  { appid: 1, name: "GameA", developers: ["Dev"], rank: 1 },
];

const mockPopularGames = [
  { appid: 2, name: "GameB", developers: ["Dev"], rank: 1 },
];

beforeEach(() => {
  jest.resetAllMocks(); // 前回のモックをリセット
  (fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes("new")) {
      return Promise.resolve({ json: () => Promise.resolve(mockNewGames) });
    }
    if (url.includes("popular")) {
      return Promise.resolve({ json: () => Promise.resolve(mockPopularGames) });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });
});

test("新作順タブのゲームを表示", async () => {
  render(<Home />);

  expect(
    await screen.findByRole("heading", { name: "新着順" })
  ).toBeInTheDocument();

  expect(await screen.findByText("GameA")).toBeInTheDocument();
});

test("人気順タブのゲームを表示", async () => {
  render(<Home />);

  const menuButton = screen.getByRole("button", { name: "新作順" });
  fireEvent.click(menuButton);

  expect(
    await screen.findByRole("heading", { name: "Indieゲームランキング" })
  ).toBeInTheDocument();

  expect(await screen.findByText("GameB")).toBeInTheDocument();

  const popularTab = screen.getByRole("menuitem", { name: "人気順" });
  fireEvent.click(popularTab);
});
