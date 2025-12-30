// import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useEffect, useState, useRef } from "react";
// import ChatInput from "./ChatInput";
// import { useAuth } from "@/Hooks/useAuth";
// import type { Message } from "@/Types/backendTypes";
// import { onValue, ref } from "firebase/database";
// import { db } from "@/firebase/firebaseConfig";
// import MessageBubble from "./MessageBubble";

// export default function Chat() {
//   const { user } = useAuth();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const messagesRef = ref(db, "messages");

//     const unsubscribe = onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (!data) {
//         setMessages([]);
//         return;
//       }

//       const formatted: Message[] = Object.entries(data).map(
//         ([id, value]: any) => ({
//           id,
//           ...value,
//         })
//       );

//       // ✅ ترتيب الرسائل حسب الوقت
//       formatted.sort((a, b) => a.createdAt - b.createdAt);

//       setMessages(formatted);
//     });
//     return () => unsubscribe();
//   }, []);
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth", //we can make this "auto"
//     });
//   }, [messages]);

//   return (
//     // <div className="flex justify-center items-center mt-5 p-5">
//     //   <Card className="w-full max-w-md flex flex-col ">
//     //     {/* Header */}
//     //     <div className="p-3 border-b font-semibold text-center">
//     //       Chat App 💬
//     //     </div>

//     //     {/* Messages */}
//     //     <ScrollArea className="flex-1 p-3">
//     //       {messages.map((msg) => (
//     //         <MessageBubble
//     //           key={msg.id}
//     //           message={msg.text}
//     //           senderName={msg.senderName}
//     //           isMe={msg.senderId === user?.uid}
//     //         />
//     //       ))}
//     //       <div ref={bottomRef} />
//     //     </ScrollArea>

//     //     {/* Input */}
//     //     <ChatInput />
//     //   </Card>
//     // </div>
//     <div className="flex justify-center items-center mt-5 p-5">
//       <Card className="w-full max-w-md h-125 flex flex-col">
//         {/* Header */}
//         <div className="p-3 border-b font-semibold text-center shrink-0">
//           Chat App 💬
//         </div>

//         {/* Messages */}
//         <ScrollArea className="flex-1 p-3 overflow-y-auto">
//           {messages.map((msg) => (
//             <MessageBubble
//               key={msg.id}
//               message={msg.text}
//               senderName={msg.senderName}
//               isMe={msg.senderId === user?.uid}
//             />
//           ))}
//           <div ref={bottomRef} />
//         </ScrollArea>

//         {/* Input */}
//         <div className="shrink-0">
//           <ChatInput />
//         </div>
//       </Card>
//     </div>
//   );
// }
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatSidebar from "./Sidebar";
import { useAuth } from "@/Hooks/useAuth";
import type { Message, ChatUser } from "@/Types/backendTypes";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import MessageBubble from "./MessageBubble";

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedUser) return;

    const messagesRef = ref(db, `messages/${user?.uid}_${selectedUser.uid}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessages([]);
        return;
      }

      const formatted = Object.entries(data as Record<string, Message>).map(
        ([id, value]) => ({
          id,
          ...value,
        })
      );

      formatted.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(formatted);
    });

    return () => unsubscribe();
  }, [selectedUser, user?.uid]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center p-5">
      <Card className="w-full max-w-4xl min-h-[70vh] md:h-[85vh] flex flex-col md:flex-row">
        {selectedUser && (
          <button
            onClick={() => setSelectedUser(null)}
            className="md:hidden text-sm text-blue-500"
          >
            ← Back
          </button>
        )}
        {/* Sidebar */}
        <div
          className={`
    ${selectedUser ? "hidden md:block" : "block"}
    w-full md:w-64 border-r
  `}
        >
          <ChatSidebar onSelectUser={setSelectedUser} />
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="p-3 border-b font-semibold shrink-0">
            {selectedUser ? selectedUser.username : "Select a chat"}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 overflow-y-auto p-1">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.text}
                senderName={msg.senderName}
                isMe={msg.senderId === user?.uid}
              />
            ))}
            <div ref={bottomRef} />
          </ScrollArea>

          {/* Input */}
          {selectedUser && <ChatInput selectedUser={selectedUser} />}
        </div>
      </Card>
    </div>
  );
}
