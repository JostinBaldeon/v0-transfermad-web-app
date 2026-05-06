"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Role = "user" | "admin"

type AppUser = {
  id: string
  user: string
  email: string
  role: Role
  coins: number
  createdAt: string
}

type AuthContextValue = {
  user: AppUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const LOCAL_ADMIN = {
  id: "local-admin-1",
  user: "admin1",
  email: "admin1@madleague.com",
  password: "123456",
  role: "admin" as const,
  coins: 99999,
  createdAt: new Date().toISOString(),
}

const STORAGE_KEY = "transfermad_session"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      setUser(JSON.parse(raw))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const normalized = email.trim().toLowerCase()

    if (normalized === LOCAL_ADMIN.email && password === LOCAL_ADMIN.password) {
      const adminUser: AppUser = {
        id: LOCAL_ADMIN.id,
        user: LOCAL_ADMIN.user,
        email: LOCAL_ADMIN.email,
        role: LOCAL_ADMIN.role,
        coins: LOCAL_ADMIN.coins,
        createdAt: LOCAL_ADMIN.createdAt,
      }
      setUser(adminUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser))
      return {}
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, user, email, password, role, coins, createdAt")
      .eq("email", normalized)
      .eq("password", password)
      .maybeSingle()

    if (error || !data) {
      return { error: "Credenciales inválidas" }
    }

    const appUser: AppUser = {
      id: data.id,
      user: data.user,
      email: data.email,
      role: data.role,
      coins: data.coins,
      createdAt: data.createdAt,
    }

    setUser(appUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser))
    return {}
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
