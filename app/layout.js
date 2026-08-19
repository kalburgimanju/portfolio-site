import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Manjunath Kalburgi — Author & Innovator',
    template: '%s | Manjunath Kalburgi',
  },
  description: 'Explore books by Manjunath Kalburgi — practical guides on AI, business, personal growth, and technology. Download your copy today.',
  keywords: ['Manjunath Kalburgi', 'books', 'eBooks', 'AI agents', 'business', 'self-improvement', 'technology'],
  authors: [{ name: 'Manjunath Kalburgi' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://manjunathkalburgi.com',
    siteName: 'Manjunath Kalburgi',
    title: 'Manjunath Kalburgi — Author & Innovator',
    description: 'Explore books by Manjunath Kalburgi — practical guides on AI, business, personal growth, and technology.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manjunath Kalburgi — Author & Innovator',
    description: 'Explore books by Manjunath Kalburgi — practical guides on AI, business, personal growth, and technology.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className + ' bg-slate-50 text-slate-900 antialiased'}>
        {children}
      </body>
    </html>
  )
}
