import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EmailLoginPage } from "../../Pages/EmailLoginPage";

const mockUser = {
  email: "test@example",
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
    expect(await screen.findByText(/ログイン成功/)).toBeInTheDocument();
    expect(await screen.getByText(/test@example/)).toBeInTheDocument();
  });
  test("メールアドレスが送信されるとメッセージ表示", async () => {
    render(<EmailLoginPage />);
    fireEvent.change(screen.getByPlaceholderText(/メールアドレス/), {
      target: { value: "user@example" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Link を送信/ }));

    await waitFor(() =>
      expect(screen.getByText(/メール送信完了！/)).toBeInTheDocument()
    );
  });
  test("不正なメールアドレスでエラーメッセージ表示", async () => {
    render(<EmailLoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /Link を送信/ }));
    await waitFor(() =>
      expect(screen.getByText(/メールアドレスは必須です。/)).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText(/メールアドレス/), {
      target: { value: "noEmail" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Link を送信/ }));
    await waitFor(() =>
      expect(
        screen.getByText(/有効なメールアドレスを入力してください/)
      ).toBeInTheDocument()
    );
  });
});
