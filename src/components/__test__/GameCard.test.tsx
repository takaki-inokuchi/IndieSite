// import { render, screen } from "@testing-library/react";
// import { GameCard } from "../GameCard";
// import type { IndieGame } from "../../types/types";

// const mockGame: IndieGame = {
//   appid: 1,
//   name: "Mock Game",
//   developers: ["A", "B"],
//   header_image: "https://example.com/image.jpg",
//   url: "https://example.com/game",
//   release_date: "2025-1-1",
//   short_description: "mock game description.",
//   screenshots: [],
// };

// describe("GameCardコンポーネント", () => {
//   test("ゲーム情報が表示される", () => {
//     render(<GameCard game={mockGame} rank={1} />);

//     // ランク表示（#1位）
//     expect(
//       screen.getByText((content) => content.replace(/\s/g, "").includes("1位"))
//     ).toBeInTheDocument();

//     // ゲーム名
//     expect(
//       screen.getByRole("heading", { name: /Mock Game/i })
//     ).toBeInTheDocument();

//     // 製作者（空白を無視して検索）
//     expect(
//       screen.getByText((content) =>
//         content.replace(/\s/g, "").includes("製作者:A,B")
//       )
//     ).toBeInTheDocument();

//     // リリース日（空白を無視して検索）
//     expect(
//       screen.getByText((content) =>
//         content.replace(/\s/g, "").includes("リリース日:2025-1-1")
//       )
//     ).toBeInTheDocument();

//     // 簡単な説明文
//     expect(screen.getByText("mock game description.")).toBeInTheDocument();

//     // 外部リンクの href 確認
//     expect(screen.getByRole("link")).toHaveAttribute(
//       "href",
//       "https://example.com/game"
//     );
//   });
// });
