'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for demo login first
    const checkDemoLogin = () => {
      const isDemoLoggedIn = localStorage.getItem('demo_admin_logged_in')
      if (isDemoLoggedIn === 'true') {
        // Create a mock user object for demo purposes
        const demoUser = {
          id: 'demo-user',
          email: 'demo@bbqaffair.com',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as User
        setUser(demoUser)
        setLoading(false)
        return true
      }
      return false
    }

    // Get initial session
    const getInitialSession = async () => {
      // First check demo login
      if (checkDemoLogin()) return

      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Check demo login on auth state change
        if (!checkDemoLogin()) {
          setUser(session?.user ?? null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    // Handle demo logout
    localStorage.removeItem('demo_admin_logged_in')
    await supabase.auth.signOut()
  }

  const value = {
    user,
    loading,
    signOut,
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