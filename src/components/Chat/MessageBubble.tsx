
type Props = {
  message: string;
  senderName: string;
  isMe: boolean;
};

export default function MessageBubble({
  message,
  senderName,
  isMe,
}: Props) {
  return (
    <div
      className={`mb-2 flex ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
          isMe
            ? "bg-blue-500 text-white"
            : "bg-muted text-foreground"
        }`}
      >
        {!isMe && (
          <p className="text-xs opacity-70 mb-1">
            {senderName}
          </p>
        )}
        {message}
      </div>
    </div>
  );
}
