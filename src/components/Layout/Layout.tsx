import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "@/Hooks/useAuth";
import Spinner from "../ui/Spinner";

export default function Layout() {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
