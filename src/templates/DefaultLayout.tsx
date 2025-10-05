import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const DefaultLayout = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
