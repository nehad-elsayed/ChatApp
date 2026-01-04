import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/Hooks/useAuth";
import { push, ref,  runTransaction } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import type { ChatUser } from "@/Types/backendTypes";

export default function ChatInput({
  selectedUser,
}: {
  selectedUser: ChatUser;
}) {
  const [value, setValue] = useState("");
  const { user } = useAuth();

  if (!user) return null;

  const chatId =
    user.uid < selectedUser.uid
      ? `${user.uid}_${selectedUser.uid}`
      : `${selectedUser.uid}_${user.uid}`;

  const sendMessage = async (text: string) => {
    if (!text.trim()) {
      toast.error("empty message");
      return;
    } else {
      toast.success("sent successfully");
    }
    //sending msg
    await push(ref(db, `messages/${chatId}`), {
      text,
      senderId: user.uid,
      senderName: user.displayName,
      createdAt: Date.now(),
    });

    // Increment unread counter for the recipient
    await runTransaction(
      ref(db, `unread/${selectedUser.uid}/${user.uid}`),
      (current) => (current || 0) + 1
    );
  };

  const handleSend = async () => {
    await sendMessage(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 p-3 border-t">
      <Input
        placeholder="write a message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}
