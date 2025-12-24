import type { AuthContextType } from "@/Types/frontendTypes";
import { createContext, useState, type ReactNode } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
