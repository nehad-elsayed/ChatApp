import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      Not Found
      <Button variant="outline" onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  )
}
