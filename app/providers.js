'use client'

import { AuthProvider } from './context/AuthContext'
import { CoverProvider } from './context/CoverContext'
import { CartProvider } from './context/CartContext'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CoverProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CoverProvider>
    </AuthProvider>
  )
}
