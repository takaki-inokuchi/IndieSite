import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { DefaultLayout } from "../templates/DefaultLayout";
import { LoginPage } from "../Pages/LoginPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/LoginPage" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
