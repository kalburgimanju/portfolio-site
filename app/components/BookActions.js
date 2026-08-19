'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function BookActions({ book }) {
  const { addToCart, cart } = useCart()
  const [inCart, setInCart] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState('')
  const [previewLoading, setPreviewLoading] = useState(false)

  useEffect(() => {
    if (cart.some((item) => item.slug === book.slug)) {
      setInCart(true)
    }
  }, [cart, book.slug])

  const handleAddToCart = () => {
    addToCart(book)
    setInCart(true)
  }

  const openPreview = async () => {
    setShowPreview(true)
    setPreviewLoading(true)
    try {
      const res = await fetch(`/portfolio-site/content/${book.slug}/content.md`)
      if (!res.ok) throw new Error('Preview not available')
      const text = await res.text()
      setPreviewContent(text.substring(0, 3000) + '\n\n...\n\n[Preview truncated. Purchase to read the full book.]')
    } catch (e) {
      setPreviewContent('Preview not available for this book.')
    } finally {
      setPreviewLoading(false)
    }
  }

  const closePreview = () => {
    setShowPreview(false)
    setPreviewContent('')
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          onClick={handleAddToCart}
          disabled={!book.hasPdf || inCart}
          className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {inCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
        <button
          onClick={openPreview}
          disabled={!book.hasPdf}
          className="flex-1 btn-secondary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Preview Book
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Secure payment via Stripe
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
              <h3 className="text-lg font-bold text-slate-900">Preview: {book.title}</h3>
              <button
                onClick={closePreview}
                className="text-slate-500 hover:text-slate-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              {previewLoading ? (
                <div className="text-slate-600">Loading preview...</div>
              ) : (
                <div className="prose prose-slate max-w-none">
                  <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed font-sans text-sm">
                    {previewContent}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
