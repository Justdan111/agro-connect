"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import { UserRole, useUser } from "@/context/userContext"

interface RouteGuardProps {
  children: ReactNode
  allowedRoles?: UserRole[]
}

export function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user && !pathname.startsWith("/auth")) {
      router.push("/auth/login")
      return
    }

    // If user exists but doesn't have the required role
    if (!isLoading && user && allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.push("/dashboard")
      return
    }
  }, [isLoading, user, router, pathname, allowedRoles])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-agro-primary" />
      </div>
    )
  }

  // If we're on an auth page and user is logged in, redirect to dashboard
  if (!isLoading && user && pathname.startsWith("/auth")) {
    router.push("/dashboard")
    return null
  }

  // If we're checking roles and user doesn't have permission, show nothing (redirect will happen)
  if (!isLoading && user && allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
