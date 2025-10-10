import { fireEvent, render, screen, act } from "@testing-library/react";
import { EmailLoginPage } from "../../Pages/EmailLoginPage";

const mockUser = {
  email: "user@example.com",
};

jest.mock("../../lib/supabaseClient", () => {
  return {
    supabase: {
      auth: {
        getUser: jest.fn(() => Promise.resolve({ data: { user: mockUser } })),
        signInWithOtp: jest.fn(() => Promise.resolve({ error: null })),
      },
    },
  };
});

describe("EmailLoginPage", () => {
  test("ログイン済みでメッセージ表示", async () => {
    render(<EmailLoginPage />);
    expect(await screen.findByText(/ログイン済みです！/)).toBeInTheDocument();
  });

  test("メールアドレスが送信されるとメッセージ表示", async () => {
    render(<EmailLoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/メールアドレス/), {
      target: { value: "user@example.com" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Link を送信/ }));
    });

    expect(await screen.findByText(/メール送信完了/)).toBeInTheDocument();
  });

  test("不正なメールアドレスでエラーメッセージ表示", async () => {
    render(<EmailLoginPage />);

    // 空で送信
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Link を送信/ }));
    });
    expect(await screen.findByText(/メールアドレスは必須です/)).toBeInTheDocument();

    // 無効なメール形式で送信
    fireEvent.change(screen.getByPlaceholderText(/メールアドレス/), {
      target: { value: "noEmail" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Link を送信/ }));
    });
    expect(await screen.findByText(/有効なメールアドレスを入力してください/)).toBeInTheDocument();
  });
});
