// src/components/Login.tsx
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  type User,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { app } from "../firebase";
import { useEffect, useState } from "react";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const Login = () => {
  const [user, setUser] = useState<User | null>(null);

  const isMobileBrowser = () => {
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent
    );
  };

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);

      if (isMobileBrowser()) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        console.log("ログイン成功:", result.user.displayName);
      }
    } catch (error) {
      console.error("ログイン失敗:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log("ログアウトしました");
    } catch (error) {
      console.error("ログアウト失敗:", error);
    }
  };

  useEffect(() => {
    const fetchRedirectUser = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
          console.log("リダイレクト後ログイン成功:", result.user.displayName);
        }
      } catch (error) {
        console.error("リダイレクトログイン失敗:", error);
      }
    };
    fetchRedirectUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>ようこそ、{user.displayName} さん！</p>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#DB4437",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Googleでログイン
        </button>
      )}
    </div>
  );
};
