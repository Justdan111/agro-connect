"use client"
import { RouteGuard } from "@/components/auth/route-guard"
import { Header } from "@/components/haeder"
import { Sidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/context/sidebarContext"

import type React from "react"
import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Track the collapsed state of sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      setIsSidebarCollapsed(e.detail.isCollapsed)
    }
    
    window.addEventListener('sidebarStateChange' as any, handleSidebarChange as EventListener)
    
    return () => {
      window.removeEventListener('sidebarStateChange' as any, handleSidebarChange as EventListener)
    }
  }, [])

  return (
    <RouteGuard>
      <SidebarProvider>
        <div className="min-h-screen bg-background">
          <Sidebar onCollapseChange={setIsSidebarCollapsed} />
          <div
            className={`transition-all duration-300 ease-in-out ${
              isSidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
            }`}
          >
            <Header />
            <main className="p-4 md:p-6 lg:p-8 bg-gray-50">{children}</main>
          </div>
        </div>
      </SidebarProvider>
      </RouteGuard>
  )
}