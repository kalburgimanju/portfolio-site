'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CoverContext = createContext(null)

const STORAGE_KEY = 'portfolio_custom_covers'

export function CoverProvider({ children }) {
  const [covers, setCovers] = useState({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCovers(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load covers from localStorage', e)
    }
  }, [])

  const getCover = (slug) => {
    return covers[slug] || null
  }

  const setCover = (slug, dataUrl) => {
    const updated = { ...covers, [slug]: dataUrl }
    setCovers(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const removeCover = (slug) => {
    const updated = { ...covers }
    delete updated[slug]
    setCovers(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <CoverContext.Provider value={{ covers, getCover, setCover, removeCover }}>
      {children}
    </CoverContext.Provider>
  )
}

export function useCovers() {
  const context = useContext(CoverContext)
  if (!context) {
    throw new Error('useCovers must be used within a CoverProvider')
  }
  return context
}
