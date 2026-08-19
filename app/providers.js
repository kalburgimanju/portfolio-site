'use client'

import { AuthProvider } from './context/AuthContext'
import { CoverProvider } from './context/CoverContext'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CoverProvider>
        {children}
      </CoverProvider>
    </AuthProvider>
  )
}
