"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Menu, 
  ShoppingCart, 
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  MapPinHouse,
  NotepadText,
  ChartNoAxesCombined,
  Bell,
  SquareMenu,
  CloudSun,
  Sprout,
  PanelLeft,
  Brain,
  Truck,
  Store,
  Route,
  ShoppingBag,
  ReceiptText,
  Box,
  Flower2,
  UserCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"


import { useSidebar } from "@/context/sidebarContext"
import { useAuth } from "@/context/authContext"

interface SidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

// Define navigation item type
interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles?: string[]; // Which roles can see this item
}

export function Sidebar({ onCollapseChange }: SidebarProps) {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({})
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user } = useAuth() // Get current user data including role
  const userRole = user?.role || 'guest' // Default to guest if no role is set

  const toggleSection = (name: string) => {
    setOpenSections(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

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

  // Filter navigation items based on user role
  const filteredNavItems = getNavItemsByRole(userRole)

  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-background",
          "transition-all duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "w-72"
        )}
      >
        <div className="flex h-14 items-center px-4">
          {!isCollapsed && <span> <Image src="/images/logo.svg" alt="AgroConnect Logo" width={100} height={100}/></span>}
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
                  <div 
                    className={cn(
                      "flex items-center justify-between rounded-md text-sm font-medium hover:bg-[#FFC9C4] text-[#454545]",
                       !isCollapsed ? "cursor-pointer" : "",
                      pathname === item.href ? "bg-[#FFC9C4] text-[#454545]" : "text-[#454545]",
                      isCollapsed ? "px-2 py-2" : "px-3 py-2"
                    )}
                    onClick={() => !isCollapsed && toggleSection(item.name)}
                  >
                    <Link 
                      href={item.href} 
                      className={cn(
                        "flex items-center gap-3",
                        isCollapsed ? "justify-center" : "",
                        "flex-1"
                      )}
                      title={isCollapsed ? item.name : ""}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </div>
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
    name: "Profile",
    href: "/profile",
    icon: UserCircle,
    roles: ['farmer', 'transporter', 'buyer', 'admin']
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ['farmer', 'transporter', 'buyer', 'admin']
  },
  {
    name: "Support",
    href: "/support",
    icon: SquareMenu,
    roles: ['farmer', 'transporter', 'buyer', 'admin']
  },
  {
    name: "Logout",
    href: "/logout",
    icon: LogOut,
    roles: ['farmer', 'transporter', 'buyer', 'admin']
  },
  
  // Farmer-specific navigation items
  {
    name: "Dashboard",
    href: "/dashboard/farmer",
    icon: LayoutDashboard,
    roles: ['farmer']
  },
  {
    name: "Farm Management",
    href: "/farm-management",
    icon: Sprout,
    roles: ['farmer']
  },
  {
    name: "Crop Calendar",
    href: "/farm-management/crop-calendar",
    icon: PanelLeft,
    roles: ['farmer']
  },
  {
    name: "Weather Alerts",
    href: "/farm-management/weather-alerts",
    icon: CloudSun,
    roles: ['farmer']
  },
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: Brain,
    roles: ['farmer']
  },
  {
    name: "Logistics",
    href: "/logistics",
    icon: Truck,
    roles: ['farmer']
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: Store,
    roles: ['farmer']
  },
  
  // Transporter-specific navigation items
  {
    name: "Dashboard",
    href: "/dashboard/transporter",
    icon: LayoutDashboard,
    roles: ['transporter']
  },
  {
    name: "Available Jobs",
    href: "/logistics/available-jobs",
    icon: ShoppingCart,
    roles: ['transporter']
  },
  {
    name: "My Shipments",
    href: "/logistics/shipments",
    icon: Truck,
    roles: ['transporter']
  },
  {
    name: "Route Planning",
    href: "/logistics/routes",
    icon: Route,
    roles: ['transporter']
  },
  {
    name: "Transaction History",
    href: "/transactions",
    icon: ReceiptText,
    roles: ['transporter']
  },
  
  // Buyer-specific navigation items
  {
    name: "Dashboard",
    href: "/dashboard/buyer",
    icon: LayoutDashboard,
    roles: ['buyer']
  },
  {
    name: "Browse Produce",
    href: "/marketplace",
    icon: Flower2,
    roles: ['buyer']
  },
  {
    name: "My Orders",
    href: "/marketplace/orders",
    icon: ShoppingBag,
    roles: ['buyer']
  },
  {
    name: "Suppliers",
    href: "/marketplace/suppliers",
    icon: Users,
    roles: ['buyer']
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Box,
    roles: ['buyer']
  },
  
  // Admin items (for future use)
  {
    name: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
    roles: ['admin']
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: Users,
    roles: ['admin']
  },
  {
    name: "Reports & Analytics",
    href: "/reports-analytics",
    icon: ChartNoAxesCombined,
    roles: ['admin']
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    roles: ['admin']
  }
]

// Function to get navigation items based on user role
function getNavItemsByRole(role: string): NavItem[] {
  // Filter items that either have no role restriction or include the current role
  return allNavItems.filter(item => 
    !item.roles || item.roles.includes(role.toLowerCase())
  );
}

export default Sidebar