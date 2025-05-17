import type React from "react"
import { RouteGuard } from "@/components/auth/route-guard"

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard allowedRoles={["farmer", "buyer"]}>{children}</RouteGuard>
}
