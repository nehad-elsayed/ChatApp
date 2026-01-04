
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
  const [unread, setUnread] = useState<Record<string, number>>({});

  // 🔹 Load users list
  useEffect(() => {
    if (!user?.uid) return;

    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setUsers([]);
        return;
      }

      const formatted = Object.values(data as Record<string, ChatUser>).filter(
        (u) => u.uid !== user.uid
      );

      setUsers(formatted);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // 🔹 Listen to unread counters
  useEffect(() => {
    if (!user?.uid) return;

    const unreadRef = ref(db, `unread/${user.uid}`);

    const unsubscribe = onValue(unreadRef, (snapshot) => {
      const data = snapshot.val() as Record<string, number> | null;
      setUnread(data || {});
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <div className="w-64 border-r h-full">
      <div className="p-3 font-semibold border-b">Chats</div>

      <div className="overflow-y-auto">
        {users.map((u) => {
          const count = unread[u.uid];

          return (
            <div
              key={u.uid}
              onClick={() => onSelectUser(u)}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-muted transition"
            >
              <span>{u.username}</span>

              {count > 0 && (
                <span className="min-w-5 h-5 px-1 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
                  {count}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
