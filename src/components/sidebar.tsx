"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  ShoppingCart,
  ChevronsLeft,
  ChevronsRight,
  CloudSun,
  Sprout,
  Brain,
  Truck,
  Store,
  Route,
  ShoppingBag,
  ReceiptText,
  Box,
  Flower2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/userContext"
import { useSidebar } from "@/context/sidebarContext"
import { useState } from "react"


// Define navigation item type
interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  roles?: string[] 
// Which roles can see this item
}

interface SidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export function Sidebar({ onCollapseChange }: SidebarProps) {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [, setOpenSections] = useState<{[key: string]: boolean}>({})
  const { user } = useUser() // Get current user data including role
  const userRole = user?.role || "guest" // Default to guest if no role is set

  // Filter navigation items based on user role
  const filteredNavItems = getNavItemsByRole(userRole)


  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
    
    // Notify parent component through prop callback
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState)
    }
    
    // Also dispatch a custom event for components that can't receive props directly
    const event = new CustomEvent('sidebarStateChange', { 
      detail: { isCollapsed: newCollapsedState } 
    })
    window.dispatchEvent(event)
  }


  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-white backdrop-blur-sm lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-background",
          "transition-all duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "w-72",
        )}
      >
        <div className="flex h-14 items-center px-4">
          {!isCollapsed && <span className="text-xl font-bold text-agro-primary">AgroConnect</span>}
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={toggle}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden lg:flex ml-auto" 
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 overflow-auto py-2">
            <nav className={cn("grid gap-1", isCollapsed ? "px-1" : "px-2")}>
              {filteredNavItems.map((item, index) => (
                <div key={index} className="mb-1">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md text-sm font-medium hover:bg-agro-accent text-agro-text",
                      pathname === item.href ? "bg-agro-accent text-agro-primary" : "text-agro-text",
                      isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2",
                    )}
                    title={isCollapsed ? item.name : ""}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

// Define all navigation items with role restrictions
const allNavItems: NavItem[] = [
  // Common navigation items for all roles
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["farmer", "transporter", "buyer"],
  },
 

  // Farmer-specific navigation items
  {
    name: "Farm Management",
    href: "/farm-management",
    icon: Sprout,
    roles: ["farmer"],
  },
  {
    name: "Weather Alerts",
    href: "/weather",
    icon: CloudSun,
    roles: ["farmer"],
  },
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: Brain,
    roles: ["farmer"],
  },
  {
    name: "Logistics",
    href: "/logistics",
    icon: Truck,
    roles: ["farmer"],
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: Store,
    roles: ["farmer"],
  },

  // Transporter-specific navigation items
  {
    name: "Available Jobs",
    href: "/available-jobs",
    icon: ShoppingCart,
    roles: ["transporter"],
  },
  {
    name: "My Shipments",
    href: "/shipments",
    icon: Truck,
    roles: ["transporter"],
  },
  {
    name: "Route Planning",
    href: "/routes",
    icon: Route,
    roles: ["transporter"],
  },
  {
    name: "Transaction History",
    href: "/transactions",
    icon: ReceiptText,
    roles: ["transporter"],
  },

  // Buyer-specific navigation items
  {
    name: "Browse Produce",
    href: "/marketplace",
    icon: Flower2,
    roles: ["buyer"],
  },
  {
    name: "My Orders",
    href: "/marketplace/orders",
    icon: ShoppingBag,
    roles: ["buyer"],
  },
  {
    name: "Suppliers",
    href: "/marketplace/suppliers",
    icon: Users,
    roles: ["buyer"],
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Box,
    roles: ["buyer"],
  },

 
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["farmer", "transporter", "buyer"],
  },
]

// Function to get navigation items based on user role
function getNavItemsByRole(role: string): NavItem[] {
  // Filter items that either have no role restriction or include the current role
  return allNavItems.filter((item) => !item.roles || item.roles.includes(role.toLowerCase()))
}
