import type React from "react"
import { RouteGuard } from "@/components/auth/route-guard"

export default function LogisticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard allowedRoles={["transporter", "farmer"]}>{children}</RouteGuard>
}
