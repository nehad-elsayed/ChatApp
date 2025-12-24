import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
  onSend: (message: string) => void
}

export default function ChatInput({ onSend }: Props) {
  const [value, setValue] = useState("")

  const send = () => {
    if (!value.trim()) return
    onSend(value)
    toast.success("sent successfully")
    setValue("")
  }

  return (
    <div className="flex gap-2 p-3 border-t">
      <Input
        placeholder="write a message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      
      <Button variant="default"  onClick={send}>Send</Button>
    </div>
  )
}
