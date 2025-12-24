import { useAuth } from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  if (!isLoggedIn) {
    toast.error("you should login frist");
    return <Navigate to="/login" replace />;
  }

  return children;
}
