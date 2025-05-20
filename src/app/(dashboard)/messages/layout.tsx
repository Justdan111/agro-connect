import type React from "react"
import { RouteGuard } from "@/components/auth/route-guard"

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard>{children}</RouteGuard>
}
