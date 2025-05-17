import type React from "react"
import { RouteGuard } from "@/components/auth/route-guard"

export default function FarmManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard allowedRoles={["farmer"]}>{children}</RouteGuard>
}
