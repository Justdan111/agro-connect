import type React from "react"
import { RouteGuard } from "@/components/auth/route-guard"

export default function RoutePlanningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard allowedRoles={["transporter"]}>{children}</RouteGuard>
}
