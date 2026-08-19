'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const [purchases, setPurchases] = useState([])
  const [progress, setProgress] = useState({})

  useEffect(() => {
    if (!user) return
    const all = JSON.parse(localStorage.getItem('portfolio_purchases') || '[]')
    const mine = all.filter((p) => p.userEmail === user.email)
    setPurchases(mine)

    const prog = JSON.parse(localStorage.getItem('portfolio_progress') || '{}')
    setProgress(prog[user.email] || {})
  }, [user])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h1>
          <p className="text-slate-600 mb-6">Please log in to view your dashboard.</p>
          <Link href="/login" className="btn-primary w-full text-center">
            Log In
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-custom py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
            <p className="text-slate-600 text-sm">Welcome, {user.name || user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-secondary text-sm px-4 py-2">
              Browse Books
            </Link>
            <button onClick={logout} className="btn-secondary text-sm px-4 py-2">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="text-sm text-slate-500 mb-1">Books Owned</div>
            <div className="text-3xl font-bold text-slate-900">{purchases.length}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="text-sm text-slate-500 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-brand-600">
              {Object.values(progress).filter((p) => p.started && !p.completed).length}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="text-sm text-slate-500 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">
              {Object.values(progress).filter((p) => p.completed).length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">My Library</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {purchases.length === 0 && (
              <div className="px-6 py-12 text-center text-slate-500">
                You haven&apos;t purchased any books yet.
              </div>
            )}
            {purchases.map((p) => (
              <div key={`${p.slug}-${p.date}`} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{p.title}</div>
                  <div className="text-sm text-slate-500">
                    Purchased on {new Date(p.date).toLocaleDateString()}
                  </div>
                </div>
                <Link
                  href={`/reader/${p.slug}`}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Read Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
