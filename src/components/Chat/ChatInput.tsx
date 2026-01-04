
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/Hooks/useAuth";
import { push, ref, runTransaction } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import type { ChatUser } from "@/Types/backendTypes";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { Smile } from "lucide-react";

export default function ChatInput({
  selectedUser,
}: {
  selectedUser: ChatUser;
}) {
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  if (!user) return null;

  const chatId =
    user.uid < selectedUser.uid
      ? `${user.uid}_${selectedUser.uid}`
      : `${selectedUser.uid}_${user.uid}`;

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prev) => prev + emojiData.emoji);
  };

  const handleSend = async () => {
    if (!value.trim()) return;

    await push(ref(db, `messages/${chatId}`), {
      text: value,
      senderId: user.uid,
      senderName: user.displayName,
      createdAt: Date.now(),
    });

    await runTransaction(
      ref(db, `unread/${selectedUser.uid}/${user.uid}`),
      (current) => (current || 0) + 1
    );

    setValue("");
    setShowEmojis(false);
  };

  return (
    <div className="relative flex gap-2 p-3 border-t items-center">
      {/* Emoji button */}
      <button
        type="button"
        onClick={() => setShowEmojis((p) => !p)}
        className="text-muted-foreground hover:text-foreground"
      >
        <Smile size={22} />
      </button>

      {/* Emoji picker */}
      {showEmojis && (
        <div className="absolute bottom-14 left-2 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={350}
            width={300}
          />
        </div>
      )}

      <Input
        placeholder="Write a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}
