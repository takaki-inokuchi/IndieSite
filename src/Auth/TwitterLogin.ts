import { supabaseTwitter } from "../lib/supabaseClient";

export const TwitterLogin = async () => {
  const { data, error } = await supabaseTwitter.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      queryParams: { prompt: "select_account" },
      redirectTo: "https://qvcugzjpejbstvupxjuj.supabase.co/auth/v1/callback"
    },
  });

  if (error) {
    console.error("Twitterログイン失敗", error);
    return;
  }

  console.log("Twitterログイン成功", data);
  if (data.url) window.location.href = data.url;
};