// import { useEffect, useState } from "react";
// import { onValue, ref } from "firebase/database";
// import { db } from "@/firebase/firebaseConfig";
// import { useAuth } from "@/Hooks/useAuth";
// import type { ChatUser } from "@/Types/backendTypes";

// type Props = {
//   onSelectUser: (user: ChatUser) => void;
// };

// export default function ChatSidebar({ onSelectUser }: Props) {
//   const { user } = useAuth();
//   const [users, setUsers] = useState<ChatUser[]>([]);

//   useEffect(() => {
//     const usersRef = ref(db, "users");

//     const unsubscribe = onValue(usersRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) return;

//       const formatted = Object.values(data as Record<string, ChatUser>).filter(
//         (u) => u.uid !== user?.uid
//       );

//       setUsers(formatted);
//     });

//     return () => unsubscribe();
//   }, [user?.uid]);

//   return (
//     <div className="w-64 border-r h-full">
//       <div className="p-3 font-semibold border-b">Chats</div>

//       <div className="overflow-y-auto">
//         {users.map((u) => (
//           <div
//             key={u.uid}
//             onClick={() => onSelectUser(u)}
//             className="p-3 cursor-pointer hover:bg-muted transition"
//           >
//             {u.username}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
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
  // const [unread, setUnread] = useState<Record<string, boolean>>({});
  const [unread, setUnread] = useState<Record<string, number>>({});
  // users list
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

  // unread listener - listen to unread counter
  useEffect(() => {
    if (!user) return;

    const unreadRef = ref(db, `unread/${user.uid}`);

    const unsubscribe = onValue(unreadRef, (snapshot) => {
      const data = snapshot.val();
      console.log("🔍 Unread data from Firebase:", data);
      console.log("🔍 Current user:", user.uid);

      // Convert to Record<string, number>
      const unreadData: Record<string, number> = {};
      if (data) {
        Object.keys(data).forEach((uid) => {
          const count = data[uid];
          console.log(
            `🔍 Unread for user ${uid}:`,
            count,
            "type:",
            typeof count
          );
          // Handle both number and boolean (for backward compatibility)
          if (typeof count === "number") {
            if (count > 0) {
              unreadData[uid] = count;
            }
          } else if (count === true) {
            // If it's true, treat it as 1
            unreadData[uid] = 1;
          }
        });
      }
      console.log("🔍 Processed unread data:", unreadData);
      setUnread(unreadData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="w-64 border-r h-full">
      <div className="p-3 font-semibold border-b">Chats</div>

      <div className="overflow-y-auto">
        {users.map((u) => (
          <div
            key={u.uid}
            onClick={() => onSelectUser(u)}
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-muted transition"
          >
            <span>{u.username}</span>
            {(() => {
              const count = unread[u.uid];
              console.log(
                `🔍 Rendering user ${u.username} (${u.uid}): unread count =`,
                count
              );
              return count !== undefined && count > 0 ? (
                <span className="min-w-5 h-5 px-1 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
                  {count}
                </span>
              ) : null;
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}
