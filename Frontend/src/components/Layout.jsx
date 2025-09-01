import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />   {/* ✅ This will appear on all pages using AppLayout */}
      <main>
        <Outlet /> {/* 👈 This renders the child route (TodoApp, ProfilePage, etc.) */}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
