import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput"

export default function Chat() {
  const [messages, setMessages] = useState<
    { text: string; isMe: boolean }[]
  >([
    { text: "أهلاً 👋", isMe: false },
    { text: "أهلاً بيك!", isMe: true },
  ])

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { text, isMe: true }])
  }

  return (
    <Card className="w-full max-w-md h-[500px] flex flex-col">
      <div className="p-3 border-b font-semibold">
        Chat App 💬
      </div>

      <ScrollArea className="flex-1 p-3">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg.text}
            isMe={msg.isMe}
          />
        ))}
      </ScrollArea>

      <ChatInput onSend={handleSend} />
    </Card>
  )
}
