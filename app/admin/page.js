'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useCovers } from '../context/CoverContext'
import books from '../../data/books'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const { setCover, getCover, removeCover } = useCovers()
  const [purchases, setPurchases] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [editorContent, setEditorContent] = useState('')
  const [editorCoverPreview, setEditorCoverPreview] = useState('')
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!user || user.role !== 'admin') return
    const all = JSON.parse(localStorage.getItem('portfolio_purchases') || '[]')
    setPurchases(all)
  }, [user])

  const totalRevenue = purchases.reduce((sum, p) => sum + (p.price || 0), 0)
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const monthlySales = purchases.filter((p) => {
    const d = new Date(p.date)
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear
  })
  const monthlyRevenue = monthlySales.reduce((sum, p) => sum + (p.price || 0), 0)

  const openEditor = (book) => {
    setSelectedBook(book)
    setEditorContent(`# ${book.title}\n\nAdd your updated content here.`)
    const existingCover = getCover(book.slug)
    setEditorCoverPreview(existingCover || '')
    setMessage('')
  }

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setEditorCoverPreview(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const saveBookUpdate = () => {
    if (!selectedBook) return
    if (editorCoverPreview) {
      setCover(selectedBook.slug, editorCoverPreview)
    }
    setMessage('Book updated successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </main>
    )
  }

  if (!user || user.role !== 'admin') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-6">You need admin privileges to view this page.</p>
          <Link href="/login" className="btn-primary w-full text-center">
            Log In as Admin
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
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 text-sm">Logged in as {user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-secondary text-sm px-4 py-2">
              View Store
            </Link>
            <Link href="/dashboard" className="btn-secondary text-sm px-4 py-2">
              My Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {message && (
          <div className="mb-6 bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3">
            {message}
          </div>
        )}

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'overview'
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'books'
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Books
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'purchases'
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Purchases
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="text-sm text-slate-500 mb-1">Total Books</div>
              <div className="text-3xl font-bold text-slate-900">{books.length}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="text-sm text-slate-500 mb-1">Total Sales</div>
              <div className="text-3xl font-bold text-slate-900">{purchases.length}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="text-sm text-slate-500 mb-1">Monthly Sales</div>
              <div className="text-3xl font-bold text-brand-600">{monthlySales.length}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="text-sm text-slate-500 mb-1">Monthly Revenue</div>
              <div className="text-3xl font-bold text-green-600">${monthlyRevenue.toFixed(2)}</div>
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">All Books</h2>
              <span className="text-sm text-slate-500">{books.length} total</span>
            </div>
            <div className="divide-y divide-slate-100">
              {books.map((book) => (
                <div key={book.slug} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <CoverImage
                        slug={book.slug}
                        src={book.coverPng}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{book.title}</div>
                      <div className="text-sm text-slate-500">
                        ${book.price} {book.currency} · {book.hasPdf ? 'PDF ready' : 'No PDF'}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditor(book)}
                      className="text-sm px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100"
                    >
                      Edit / Upload
                    </button>
                    <Link
                      href={`/books/${book.slug}`}
                      className="text-sm px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">All Purchases</h2>
              <span className="text-sm text-slate-500">{purchases.length} total</span>
            </div>
            <div className="divide-y divide-slate-100">
              {purchases.length === 0 && (
                <div className="px-6 py-12 text-center text-slate-500">
                  No purchases yet.
                </div>
              )}
              {purchases.map((p, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{p.title}</div>
                    <div className="text-sm text-slate-500">
                      {p.userEmail} · ${p.price} {p.currency} · {new Date(p.date).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
                    Paid
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedBook && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Edit Book</h3>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedBook.title}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    rows={12}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 font-mono text-sm"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Upload New Cover
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 text-sm"
                  />
                  {editorCoverPreview && (
                    <div className="mt-3">
                      <p className="text-sm text-slate-500 mb-2">Preview:</p>
                      <img
                        src={editorCoverPreview}
                        alt="Cover preview"
                        className="w-32 h-48 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setEditorCoverPreview('')
                          if (selectedBook) removeCover(selectedBook.slug)
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove Cover
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={saveBookUpdate} className="btn-primary flex-1">
                    Save Changes
                  </button>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
