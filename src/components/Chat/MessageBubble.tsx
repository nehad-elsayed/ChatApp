import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Props = {
  message: string
  isMe?: boolean
}

export default function MessageBubble({ message, isMe }: Props) {
  return (
    <div
      className={cn(
        "flex gap-2 mb-3",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {!isMe && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-xs rounded-lg px-3 py-2 text-sm",
          isMe
            ? "bg-blue-500 text-white"
            : "bg-muted text-foreground"
        )}
      >
        {message}
      </div>
    </div>
  )
}
