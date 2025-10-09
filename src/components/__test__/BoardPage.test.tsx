import { render, screen } from "@testing-library/react";
import { BoardPage } from "../../Pages/BoardPage";
import { UserContext } from "../../types/UserContextType";

jest.mock("../../lib/supabaseClient", () => {
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [], error: null }),
      insert: jest.fn().mockResolvedValue({ error: null }),
    }));
  }
});

describe("BorderPage", () => {
  test("未ログイン時メッセージ表示", () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: () => {} }}>
        <BoardPage />
      </UserContext.Provider>
    );
    expect(
      screen.getByText("掲示板を使用するにはログインしてください")
    ).toBeInTheDocument();
  });
});
