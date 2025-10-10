import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BoardPage } from "../../Pages/BoardPage";
import { UserContext } from "../../types/UserContextType";
import type { User } from "@supabase/supabase-js";

jest.mock("../../lib/supabaseClient", () => {
  const mockedPosts = [
    {
      id: 1,
      username: "テストユーザー",
      content: "これはテスト投稿です。",
      gamename: "テストゲーム",
      created_at: "2023-01-01T00:00:00.000Z",
    },
  ];

  return {
    supabase: {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          order: jest.fn(() =>
            Promise.resolve({
              data: mockedPosts,
              error: null,
            })
          ),
        })),
        insert: jest.fn(() =>
          Promise.resolve({
            error: null,
          })
        ),
      })),
    },
  };
});

const mockUser = {
  id: "123",
  email: "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "2023-01-01T00:00:00.000Z",
} as User;

describe("BoardPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("ログインしていない場合、ログインを促すメッセージが表示される", () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
        <BoardPage />
      </UserContext.Provider>
    );

    expect(
      screen.getByText("掲示板を使用するにはログインしてください")
    ).toBeInTheDocument();
  });

  test("投稿が表示される", async () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
        <BoardPage />
      </UserContext.Provider>
    );

    expect(await screen.findByText("テストユーザー")).toBeInTheDocument();
    expect(screen.getByText("テストゲーム")).toBeInTheDocument();
    expect(screen.getByText("これはテスト投稿です。")).toBeInTheDocument();
  });

  test("投稿フォームに入力し、投稿できる", async () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
        <BoardPage />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("名前"), {
      target: { value: "投稿者" },
    });
    fireEvent.change(screen.getByPlaceholderText("ゲーム名"), {
      target: { value: "GameX" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Indiegameの情報を共有しよう!"),
      {
        target: { value: "これは面白いゲームです！" },
      }
    );

    fireEvent.click(screen.getByText("投稿"));

    await waitFor(() => {
      expect(screen.getByText("投稿しました!")).toBeInTheDocument();
    });
  });

  test("入力が空のときは投稿できない", async () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
        <BoardPage />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText("投稿"));

    await waitFor(() => {
      expect(screen.getByText("投稿に失敗しました")).toBeInTheDocument();
    });
  });
});
