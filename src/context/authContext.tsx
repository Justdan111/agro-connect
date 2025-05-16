"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Define user type
type UserRole = 'farmer' | 'transporter' | 'buyer' | 'admin' | 'guest'

interface User {
  id?: string
  name?: string
  email?: string
  role: UserRole
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUserRole: (role: UserRole) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('agroconnect_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      // In a real app, this would be an API call to your auth endpoint
      // For now, we'll simulate a successful login
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock user - in a real app this would come from your API
      const loggedInUser: User = {
        id: '123',
        name: 'Test User',
        email: email,
        role: 'guest' // Initially set as guest until role selection
      }
      
      // Store in state and localStorage
      setUser(loggedInUser)
      localStorage.setItem('agroconnect_user', JSON.stringify(loggedInUser))
      
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      setLoading(true)
      // Clear user from state and storage
      setUser(null)
      localStorage.removeItem('agroconnect_user')
      // In a real app, you might also call an API endpoint to invalidate the session
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // Function to set user role after initial login
  const setUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem('agroconnect_user', JSON.stringify(updatedUser))
    }
  }

  const value = {
    user,
    login,
    logout,
    setUserRole,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}