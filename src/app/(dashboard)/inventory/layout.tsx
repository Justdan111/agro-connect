import type React from "react"
import { RouteGuard } from "@/components/auth/route-guard"

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard allowedRoles={["buyer"]}>{children}</RouteGuard>
}
