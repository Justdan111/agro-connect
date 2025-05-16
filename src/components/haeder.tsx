"use client"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import { Menu, Bell, UserCircle } from "lucide-react"
import React from "react"
import { useAuth } from "@/context/authContext"
import { useSidebar } from "@/context/sidebarContext"

export function Header() {
  const { user } = useAuth()
  const { toggle } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()
  
  // Get page title based on current route
  const getPageTitle = () => {
    // Extract the main section from the URL
    const path = pathname.split('/').filter(Boolean)
    
    if (path.length === 0) return "Dashboard"
    
    // Handle dashboard pages
    if (path[0] === 'dashboard') {
      const userType = path[1]
      if (userType) {
        return `${userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard`
      }
      return "Dashboard"
    }
    
    // Handle other pages by converting path to title case
    const section = path[0]
    return section
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const pageTitle = getPageTitle()
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-white border-b px-4 md:px-6">
      <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={toggle}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
        {user && (
          <p className="text-sm text-muted-foreground">
            Logged in as {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.push('/profile')}
        >
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  )
}