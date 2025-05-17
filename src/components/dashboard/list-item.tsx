"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

interface ListItemProps {
  title: string
  subtitle: string
  status?: string
  statusColor?: string
  onClick?: () => void
}

export function ListItem({ title, subtitle, status, statusColor, onClick }: ListItemProps) {
  return (
    <div className="flex items-center">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {status && <div className={`text-xs ${statusColor || ""}`}>{status}</div>}
        {onClick && (
          <Button variant="ghost" size="icon" onClick={onClick}>
            <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only">View details</span>
          </Button>
        )}
      </div>
    </div>
  )
}
