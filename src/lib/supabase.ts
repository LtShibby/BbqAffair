import { createClient } from '@supabase/supabase-js'

// Handle missing environment variables gracefully
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create real client if both values are properly set
const isConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Export helper to check if Supabase is configured
export const isSupabaseConfigured = isConfigured 