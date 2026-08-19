'use client'

import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

export default function BookActions({ book }) {
  const { user } = useAuth()

  const handleCheckout = () => {
    if (!book.stripeLink) {
      alert('This book is not yet available for purchase. Please check back later.')
      return
    }
    window.location.href = book.stripeLink
  }

  return (
    <div className="flex items-center gap-3">
      {book.hasPdf && book.stripeLink ? (
        <button
          onClick={handleCheckout}
          className="w-full btn-primary text-lg py-4 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Buy Now — Instant Download
        </button>
      ) : (
        <button
          disabled
          className="w-full bg-slate-300 text-slate-500 text-lg py-4 rounded-xl font-semibold cursor-not-allowed mb-4"
        >
          {book.hasPdf ? 'Coming Soon' : 'Not Yet Available'}
        </button>
      )}

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Secure payment via Stripe
      </div>
    </div>
  )
}
