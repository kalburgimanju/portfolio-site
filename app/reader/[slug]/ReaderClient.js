'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import books from '../../../data/books'

export default function ReaderPageClient() {
  const params = useParams()
  const { user, loading } = useAuth()
  const [content, setContent] = useState('')
  const [owned, setOwned] = useState(false)
  const [error, setError] = useState('')

  const slug = params?.slug
  const book = books.find((b) => b.slug === slug)

  useEffect(() => {
    if (!slug || !user) return

    const purchases = JSON.parse(localStorage.getItem('portfolio_purchases') || '[]')
    const hasPurchased = purchases.some(
      (p) => p.slug === slug && p.userEmail === user.email
    )
    setOwned(hasPurchased)

    if (hasPurchased && book) {
      setContent(
        `# ${book.title}\n\n` +
          `by ${book.author}\n\n` +
          `---\n\n` +
          `Thank you for purchasing this book. The full reading experience will be available here once the manuscript content is linked.\n\n` +
          `Meanwhile, you can download the PDF from your purchase confirmation.`
      )
    }
  }, [slug, user, book])

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
          <p className="text-slate-600 mb-6">Please log in to read this book.</p>
          <Link href="/login" className="btn-primary w-full text-center">
            Log In
          </Link>
        </div>
      </main>
    )
  }

  if (!book) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Book not found.</div>
      </main>
    )
  }

  if (!owned) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Not Purchased</h1>
          <p className="text-slate-600 mb-6">You need to purchase this book to read it online.</p>
          <Link href={`/books/${slug}`} className="btn-primary w-full text-center">
            View Book Page
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-500 hover:text-slate-700">
              ← My Library
            </Link>
            <span className="text-slate-300">|</span>
            <h1 className="font-bold text-slate-900 line-clamp-1">{book.title}</h1>
          </div>
          <div className="text-sm text-slate-500">Reading online</div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-line text-slate-700 leading-relaxed">
              {content || 'Loading content...'}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
