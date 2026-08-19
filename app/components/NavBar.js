'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function NavBar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900 hover:text-brand-600 transition-colors">
          Manjunath Kalburgi
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/#books" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Books
          </Link>
          <Link href="/cart" className="relative text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-brand-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary text-sm px-4 py-2">
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
