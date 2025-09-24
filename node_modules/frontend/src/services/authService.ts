import { supabase } from './supabaseClient'
import { AuthError, User as SupabaseUser } from '@supabase/supabase-js'

export interface AuthResponse {
  success: boolean
  user?: SupabaseUser | null
  error?: string
}

export class AuthService {
  static async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      // Create user profile in our users table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            full_name: fullName
          })

        if (profileError) {
          console.error('Error creating profile:', profileError)
        }
      }

      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  static async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        return { success: false, error: error.message }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  static async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  static onAuthStateChange(callback: (user: SupabaseUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
}
