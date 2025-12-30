import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /* Login */
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("logged in successfully");
  };

  // /* Register */
  // const register = async (email: string, password: string,username:string) => {
  //   await createUserWithEmailAndPassword(auth, email, password);

  // };
  const register = async (
    email: string,
    password: string,
    username?: string
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // 🔥 حفظ الاسم في الـ profile
    await updateProfile(cred.user, {
      displayName: username,
    });

    await set(ref(db, `users/${cred.user.uid}`), {
      uid: cred.user.uid,
      username,
      email,
      createdAt: Date.now(),
    });
  };

  /* Logout */
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
