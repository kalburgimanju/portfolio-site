'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

const CART_KEY = 'portfolio_cart'

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) {
        setCart(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
    }
    setMounted(true)
  }, [])

  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.slug === book.slug)
      if (exists) {
        return prev.map((item) =>
          item.slug === book.slug ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      const updated = [...prev, { ...book, quantity: 1 }]
      localStorage.setItem(CART_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const removeFromCart = (slug) => {
    const updated = cart.filter((item) => item.slug !== slug)
    setCart(updated)
    localStorage.setItem(CART_KEY, JSON.stringify(updated))
  }

  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      removeFromCart(slug)
      return
    }
    const updated = cart.map((item) =>
      item.slug === slug ? { ...item, quantity } : item
    )
    setCart(updated)
    localStorage.setItem(CART_KEY, JSON.stringify(updated))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem(CART_KEY)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        mounted,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
