import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface StockLevelIndicatorProps {
  level: string
}

// Stock level color mapping
const stockLevelColors = {
  high: "bg-green-100 text-green-800",
  medium: "bg-blue-100 text-blue-800",
  low: "bg-yellow-100 text-yellow-800",
  critical: "bg-red-100 text-red-800",
}

// Stock level progress mapping
const stockLevelProgress = {
  high: 90,
  medium: 60,
  low: 30,
  critical: 10,
}

export function StockLevelIndicator({ level }: StockLevelIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge className={stockLevelColors[level]}>{level.charAt(0).toUpperCase() + level.slice(1)}</Badge>
      <Progress value={stockLevelProgress[level]} className="w-16 h-2" />
    </div>
  )
}
