'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e)
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const trimmedEmail = (email || '').trim().toLowerCase()
    const trimmedPassword = (password || '').trim()

    if (!trimmedEmail || !trimmedPassword) {
      return { success: false, error: 'Email and password are required.' }
    }

    const isAdmin = trimmedEmail === 'admin' && trimmedPassword === 'admin'
    if (isAdmin) {
      const userData = { email: 'admin', name: 'Admin', role: 'admin' }
      setUser(userData)
      localStorage.setItem('portfolio_user', JSON.stringify(userData))
      return { success: true }
    }

    const users = JSON.parse(localStorage.getItem('portfolio_users') || '[]')
    const found = users.find(
      (u) => u.email === trimmedEmail && u.password === trimmedPassword
    )

    if (found) {
      const userData = { email: found.email, name: found.name, role: 'user' }
      setUser(userData)
      localStorage.setItem('portfolio_user', JSON.stringify(userData))
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password.' }
  }

  const register = (name, email, password) => {
    const trimmedName = (name || '').trim()
    const trimmedEmail = (email || '').trim().toLowerCase()
    const trimmedPassword = (password || '').trim()

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return { success: false, error: 'All fields are required.' }
    }

    const users = JSON.parse(localStorage.getItem('portfolio_users') || '[]')
    const exists = users.find((u) => u.email === trimmedEmail)

    if (exists) {
      return { success: false, error: 'Email already registered.' }
    }

    const newUser = { name: trimmedName, email: trimmedEmail, password: trimmedPassword }
    users.push(newUser)
    localStorage.setItem('portfolio_users', JSON.stringify(users))

    const userData = { email: trimmedEmail, name: trimmedName, role: 'user' }
    setUser(userData)
    localStorage.setItem('portfolio_user', JSON.stringify(userData))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('portfolio_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
