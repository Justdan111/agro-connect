"use client"


import BuyerDashboard from "@/components/dashboard/buyer-dashboard"
import FarmerDashboard from "@/components/dashboard/farmer-dashboard"
import TransporterDashboard from "@/components/dashboard/transporter-dashboard"

import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/context/userContext"

export default function DashboardPage() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-md" />
            ))}
        </div>
        <Skeleton className="h-[400px] rounded-md" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case "farmer":
      return <FarmerDashboard />
    case "buyer":
      return <BuyerDashboard />
    case "transporter":
      return <TransporterDashboard />
    default:
      return <div>Unknown user role</div>
  }
}
