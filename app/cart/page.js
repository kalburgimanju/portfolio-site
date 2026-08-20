'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import books from '../../data/books'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCheckout = () => {
    if (cart.length === 0) return
    const firstItem = cart[0]
    try {
      const raw = localStorage.getItem('portfolio_payment_connections')
      const connections = raw ? JSON.parse(raw) : null
      const activeKey = connections?.activeProvider || 'paypal'
      const provider = connections?.providers?.[activeKey]
      const link = provider?.links?.[firstItem.slug] || provider?.defaultLink || firstItem.paymentLink || firstItem.stripeLink
      if (link) {
        window.location.href = link
      } else {
        alert(`Payment links are not configured yet for ${activeKey}.`)
      }
    } catch (e) {
      const link = firstItem.paymentLink || firstItem.stripeLink
      if (link) {
        window.location.href = link
      } else {
        alert('Payment links are not configured yet.')
      }
    }
  }

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading cart...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-custom py-6">
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
          <p className="text-slate-600 text-sm mt-1">
            {cart.length > 0
              ? `${cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart`
              : 'Your cart is empty'}
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {cart.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-600 mb-6">Browse our collection and add some books to get started.</p>
            <Link href="/#books" className="btn-primary">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.slug} className="px-6 py-4 flex items-center gap-4">
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={item.coverPng}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 truncate">{item.title}</div>
                        <div className="text-sm text-slate-500">${item.price} {item.currency}</div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                        <button
                          onClick={() => removeFromCart(item.slug)}
                          className="text-sm text-red-600 hover:text-red-700 mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Items</span>
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
                <p className="text-xs text-slate-500 text-center mt-4">
                  Secure payment via Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
