import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/Hooks/useAuth";
import type { ChatUser } from "@/Types/backendTypes";

type Props = {
  onSelectUser: (user: ChatUser) => void;
};

export default function ChatSidebar({ onSelectUser }: Props) {
  const { user } = useAuth();
  const [users, setUsers] = useState<ChatUser[]>([]);

  useEffect(() => {
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const formatted = Object.values(data as Record<string, ChatUser>).filter(
        (u) => u.uid !== user?.uid
      );

      setUsers(formatted);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <div className="w-64 border-r h-full">
      <div className="p-3 font-semibold border-b">Chats</div>

      <div className="overflow-y-auto">
        {users.map((u) => (
          <div
            key={u.uid}
            onClick={() => onSelectUser(u)}
            className="p-3 cursor-pointer hover:bg-muted transition"
          >
            {u.username}
          </div>
        ))}
      </div>
    </div>
  );
}
