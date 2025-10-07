import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "../../Pages/Home";

globalThis.fetch = jest.fn();

beforeAll(() => {
  window.HTMLElement.prototype.scrollTo = jest.fn();
});

const mockNewGames = [
  { appid: 1, name: "GameA", developers: ["Dev"], rank: 1 },
];

const mockPopularGames = [
  { appid: 2, name: "GameB", developers: ["Dev"], rank: 1 },
];

beforeEach(() => {
  jest.resetAllMocks();
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
  expect(await screen.findByRole("heading", { name: "新着順" })).toBeInTheDocument();
  expect(await screen.findByText("GameA")).toBeInTheDocument();
});

test("人気順タブのゲームを表示", async () => {
  render(<Home />);
  const user = userEvent.setup();

  const menuButton = await screen.findByRole("button", { name: "新作順" });
  await user.click(menuButton);

  const popularTab = await screen.findByRole("menuitem", { name: "人気順" });
  await user.click(popularTab);

  expect(await screen.findByRole("heading", { name: "Indieゲームランキング" })).toBeInTheDocument();
  expect(await screen.findByText("GameB")).toBeInTheDocument();
});
