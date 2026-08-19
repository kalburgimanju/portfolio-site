'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, register, user } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re already logged in</h1>
          <p className="text-slate-600 mb-6">Logged in as <strong>{user.email}</strong></p>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard" className="btn-primary w-full text-center">
              Go to Dashboard
            </Link>
            <Link href="/admin" className="btn-secondary w-full text-center">
              Admin Panel
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setError('Email and password are required.')
      setSubmitting(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 300))

    let result
    if (isRegister) {
      const trimmedName = name.trim()
      if (!trimmedName) {
        setError('Name is required.')
        setSubmitting(false)
        return
      }
      result = register(trimmedName, trimmedEmail, trimmedPassword)
    } else {
      result = login(trimmedEmail, trimmedPassword)
    }

    if (result.success) {
      window.location.href = '/dashboard'
      return
    }

    setError(result.error || 'Something went wrong.')
    setSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-600 text-sm">
              {isRegister
                ? 'Sign up to track your purchases and read online.'
                : 'Log in to access your library.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none"
                placeholder="you@example.com or admin"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3 disabled:opacity-50"
            >
              {submitting ? 'Please wait...' : isRegister ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              {isRegister ? 'Already have an account? Log in' : 'Need an account? Register'}
            </button>
          </div>

          <div className="mt-4 text-center text-xs text-slate-500">
            <p>Admin login: <strong>admin</strong> / <strong>admin</strong></p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Back to store
          </Link>
        </div>
      </div>
    </main>
  )
}
