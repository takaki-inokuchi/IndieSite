import { supabase } from "../lib/supabaseClient";

type Provider = "google" | "github";

export const AllLogin = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: { prompt: "select_account" }, // これで毎回アカウント選択画面
    },
  });
  if (error) {
    console.log("ログイン失敗", error);
  } else {
    console.log("ログイン成功", data);
    window.location.href = data.url;
  }
};
export const Logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("ログアウト失敗", error);
  } else {
    console.log("ログアウト成功");
    window.location.href = "/";
  }
};
