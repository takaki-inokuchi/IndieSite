// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { supabase } from "../../lib/supabaseClient";
// import { UserContext } from "../../types/UserContextType";
// import { BoardPage } from "../../Pages/BoardPage";
// import type { User } from "@supabase/supabase-js";

// const mockedData = [
//   {
//     id: 1,
//     username: "test",
//     content: "hello",
//     created_at: "2023-01-01",
//     gamename: "game",
//   },
// ];

// jest.mock("../../lib/supabaseClient", () => ({
//   supabase: {
//     from: jest.fn(() => ({
//       select: jest.fn(() => ({
//         order: jest.fn(() => ({
//           then: jest.fn((cb) => cb({ data: mockedData, error: null })),
//           catch: jest.fn(),
//         })),
//       })),
//     })),
//   },
// }));

// describe("BoardPage", () => {
//   const mockUser = {
//     id: "123",
//     email: "test@example.com",
//     app_metadata: {},
//     user_metadata: {},
//     aud: "authenticated",
//     created_at: "2023-01-01T00:00:00.000Z",
//   } as User;

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("ログインしていない場合、ログインを促すメッセージが表示される", () => {
//     render(
//       <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
//         <BoardPage />
//       </UserContext.Provider>
//     );

//     expect(
//       screen.getByText("掲示板を使用するにはログインしてください")
//     ).toBeInTheDocument();
//   });

//   it("投稿が表示される", async () => {
//     const mockPosts = [
//       {
//         id: 1,
//         username: "テストユーザー",
//         content: "ゲームの感想",
//         gamename: "Indie Game 1",
//         created_at: new Date().toISOString(),
//       },
//     ];

//     (supabase.from as jest.Mock).mockReturnValueOnce({
//       select: jest.fn().mockReturnValueOnce({
//         order: jest.fn().mockReturnValueOnce({
//           select: jest
//             .fn()
//             .mockResolvedValueOnce({ data: mockPosts, error: null }),
//         }),
//       }),
//     });

//     render(
//       <UserContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
//         <BoardPage />
//       </UserContext.Provider>
//     );

//     expect(await screen.findByText("テストユーザー")).toBeInTheDocument();
//     expect(screen.getByText("Indie Game 1")).toBeInTheDocument();
//     expect(screen.getByText("ゲームの感想")).toBeInTheDocument();
//   });

//   it("投稿フォームに入力し、投稿できる", async () => {
//     (supabase.from as jest.Mock).mockReturnValue({
//       insert: jest.fn().mockResolvedValueOnce({ error: null }),
//       select: jest.fn().mockResolvedValueOnce({ data: [], error: null }),
//       order: jest.fn().mockReturnValue({
//         select: jest.fn().mockResolvedValueOnce({ data: [], error: null }),
//       }),
//     });

//     render(
//       <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
//         <BoardPage />
//       </UserContext.Provider>
//     );

//     fireEvent.change(screen.getByPlaceholderText("名前"), {
//       target: { value: "投稿者" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("ゲーム名"), {
//       target: { value: "GameX" },
//     });
//     fireEvent.change(
//       screen.getByPlaceholderText("Indiegameの情報を共有しよう!"),
//       {
//         target: { value: "これは面白いゲームです！" },
//       }
//     );

//     fireEvent.click(screen.getByText("投稿"));

//     await waitFor(() => {
//       expect(screen.getByText("投稿しました!")).toBeInTheDocument();
//     });
//   });

//   it("入力が空のときは投稿できない", async () => {
//     render(
//       <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
//         <BoardPage />
//       </UserContext.Provider>
//     );

//     fireEvent.click(screen.getByText("投稿"));

//     await waitFor(() => {
//       expect(screen.getByText("投稿に失敗しました")).toBeInTheDocument();
//     });
//   });
// });
