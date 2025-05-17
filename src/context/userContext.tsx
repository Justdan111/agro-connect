"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "farmer" | "buyer" | "transporter"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would check for an authenticated session
    // For demo purposes, we'll simulate loading a user
    const loadUser = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo, we'll use localStorage to persist the user between refreshes
        const savedUser = localStorage.getItem("agroconnect-user")

        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      localStorage.setItem("agroconnect-user", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("agroconnect-user")
    }
  }

  const logout = () => {
    handleSetUser(null)
    // In a real app, you would also call your logout API
    window.location.href = "/auth/login"
  }

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, isLoading, logout }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
