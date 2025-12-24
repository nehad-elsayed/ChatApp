import { useAuth } from "@/Hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg">
          Chat App 💬
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
              
                <Link
                  to="/login"
                  className="text-sm font-medium text-foreground  transition-colors"
                >
                  Login
                </Link>
              </Button>

              <Button asChild>
             
                <Link
                  to="/register"
                  className="text-sm font-medium "
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
