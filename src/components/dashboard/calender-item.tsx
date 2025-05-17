import { Calendar } from "lucide-react"

interface CalendarItemProps {
  title: string
  subtitle: string
  status?: string
  statusColor?: string
}

export function CalendarItem({ title, subtitle, status, statusColor }: CalendarItemProps) {
  return (
    <div className="flex items-center">
      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-agro-accent">
        <Calendar className="h-5 w-5 text-agro-primary" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {status && <div className={`ml-auto text-xs ${statusColor || ""}`}>{status}</div>}
    </div>
  )
}
