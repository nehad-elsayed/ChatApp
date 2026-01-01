
// import { useAuth } from "@/Hooks/useAuth";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import toast from "react-hot-toast";

// export default function Navbar() {
//   const { isLoggedIn, logout, user } = useAuth();
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (isLoggedIn) {
//       navigate("/");
//     } else {
//       toast.error("Please login first");
//     }
//   };

//   return (
//     <nav className="w-full border-b bg-background">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
//         {/* Logo */}
//         <span
//           onClick={handleClick}
//           className="font-bold text-lg cursor-pointer text-center md:text-left"
//         >
//           Chat App 💬
//         </span>

//         {/* Logged In Info */}
//         {isLoggedIn && (
//           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
//             <span className="text-sm md:text-base capitalize font-bold">
//               Hi, {user?.displayName}
//             </span>

//             <Link
//               to="/chat"
//               className="text-sm font-semibold border rounded-md px-3 py-1 hover:bg-muted transition"
//             >
//               My Chats
//             </Link>
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex items-center justify-center md:justify-end gap-2">
//           {isLoggedIn ? (
//             <Button
//               variant="destructive"
//               onClick={logout}
//             >
//               Logout
//             </Button>
//           ) : (
//             <>
//               <Button variant="ghost" asChild>
//                 <Link to="/login">Login</Link>
//               </Button>

//               <Button asChild>
//                 <Link to="/register">Register</Link>
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import { useAuth } from "@/Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <span
          onClick={handleLogoClick}
          className="font-bold text-lg cursor-pointer"
        >
          Chat App 💬
        </span>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && (
            <>
              <span className="capitalize font-semibold">
                Hi, {user?.displayName}
              </span>

              <Link
                to="/chat"
                className="text-sm font-bold hover:underline"
              >
              All Chats
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem disabled>
                    Hi, {user?.displayName}
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/chat">My Chats</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
