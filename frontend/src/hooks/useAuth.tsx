import React, { useState, useEffect, useContext, createContext } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { AuthService } from '../services/authService'

interface AuthContextType {
  user: SupabaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    AuthService.getCurrentUser().then(setUser).finally(() => setLoading(false))

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const result = await AuthService.signIn(email, password)
    setLoading(false)
    return result
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true)
    const result = await AuthService.signUp(email, password, fullName)
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await AuthService.signOut()
    setLoading(false)
    return result
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}