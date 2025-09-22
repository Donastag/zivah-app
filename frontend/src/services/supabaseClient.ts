import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  personality_preferences?: any
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  message: string
  is_from_user: boolean
  created_at: string
}