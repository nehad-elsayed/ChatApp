import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

export default function Navbar({ isLoggedIn, onLogout }: Props) {
  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg">
          Chat App 💬
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          ) : (
            <Button variant="destructive" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
