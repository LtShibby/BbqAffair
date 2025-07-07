'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

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

      // If Supabase is not configured, just set loading to false
      if (!isSupabaseConfigured || !supabase) {
        setLoading(false)
        return
      }

      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.warn('Supabase auth error:', error)
        setUser(null)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes only if Supabase is configured
    if (isSupabaseConfigured && supabase) {
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
    }
  }, [])

  const signOut = async () => {
    // Handle demo logout
    localStorage.removeItem('demo_admin_logged_in')
    
    // Only sign out from Supabase if it's configured
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    } else {
      setUser(null)
    }
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