import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { DefaultLayout } from "../templates/DefaultLayout";
import { LoginPage } from "../Pages/LoginPage";
import { BoardPage } from "../Pages/BoardPage";
import { EmailLoginPage } from "../Pages/EmailLoginPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/BoardPage" element={<BoardPage />} />
          <Route path="/EmailLoginPage" element={<EmailLoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
