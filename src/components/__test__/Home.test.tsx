import { render, waitFor, screen } from "@testing-library/react";
import { Home } from "../../Pages/Home";

globalThis.fetch = jest.fn();

const mookNewgames = [
  { appid: 1, name: "GameA", developers: ["Dev"], rank: 1 },
];

const populargames = [
  { appid: 1, name: "GameB", developers: ["Dev"], rank: 1 },
];

beforeEach(() => {
  (fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes("new")) {
      return Promise.resolve({ json: () => Promise.resolve(mookNewgames) });
    }
    if (url.includes("popular")) {
      return Promise.resolve({ json: () => Promise.resolve(populargames) });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });
});



test("新作順ゲームを表示", async () => {
  render(<Home />);
  await waitFor(() => {
    expect(screen.getByText("GameA")).toBeInTheDocument();
  });
});

test("人気順を表示", async () => {
  render(<Home />);
  await waitFor(() => {
    expect(screen.getByText("GameB")).toBeInTheDocument();
  });
});
