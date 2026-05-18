import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickActionRail from "../components/QuickActionRail";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <QuickActionRail />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
