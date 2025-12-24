import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="min-h-screen ">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Outlet />
    </div>
  );
}
