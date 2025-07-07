'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark that we're on the client side to prevent hydration mismatch
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only run auth check on client side to prevent hydration issues
    if (!isClient) return

    const checkDemoLogin = () => {
      try {
        const isDemoLoggedIn = localStorage.getItem('demo_admin_logged_in')
        const demoUser = localStorage.getItem('demo_user')
        
        if (isDemoLoggedIn === 'true' && demoUser) {
          setUser(JSON.parse(demoUser))
        }
      } catch (error) {
        // Handle localStorage errors gracefully
        console.warn('Error reading from localStorage:', error)
      }
      setLoading(false)
    }

    checkDemoLogin()
  }, [isClient])

  const signIn = async (email: string, password: string) => {
    // Demo authentication - accept demo@bbqaffair.com with any password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = password; // Password not validated in demo
    if (email === 'demo@bbqaffair.com' || email === 'admin@bbqaffair.com') {
      const demoUser = {
        id: 'demo-user',
        email: email,
      }
      
      setUser(demoUser)
      try {
        localStorage.setItem('demo_admin_logged_in', 'true')
        localStorage.setItem('demo_user', JSON.stringify(demoUser))
      } catch (error) {
        console.warn('Error saving to localStorage:', error)
      }
      
      return {}
    } else {
      return { error: 'Invalid credentials. Use demo@bbqaffair.com or admin@bbqaffair.com' }
    }
  }

  const signOut = async () => {
    try {
      localStorage.removeItem('demo_admin_logged_in')
      localStorage.removeItem('demo_user')
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
    }
    setUser(null)
  }

  const value = {
    user,
    loading,
    signOut,
    signIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 