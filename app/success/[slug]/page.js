import Link from 'next/link'
import { notFound } from 'next/navigation'
import books from '../../../data/books'

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }))
}

export async function generateMetadata({ params }) {
  const book = books.find((b) => b.slug === params.slug)
  if (!book) return { title: 'Order Confirmed' }

  return {
    title: `Order Confirmed — ${book.title}`,
  }
}

export default function SuccessPage({ params }) {
  const book = books.find((b) => b.slug === params.slug)

  if (!book || !book.driveLink) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Order Confirmed!
          </h1>
          <p className="text-lg text-slate-600">
            Thank you for purchasing <strong>{book.title}</strong>.
          </p>
        </div>

        {/* Download Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-24 rounded-lg overflow-hidden shadow-md flex-shrink-0">
              <img
                src={book.coverPng}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{book.title}</h2>
              <p className="text-slate-500 text-sm">by {book.author}</p>
              <p className="text-brand-600 font-semibold text-sm mt-1">${book.price} {book.currency}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Your Download is Ready</h3>
            <p className="text-slate-600 text-sm mb-6">
              Click the button below to download your PDF copy. The link will also be sent to your email.
            </p>
            <a
              href={book.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF Now
            </a>
            <p className="text-xs text-slate-400 text-center mt-4">
              Having trouble? Copy this link: <br />
              <code className="break-all text-slate-500">{book.driveLink}</code>
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <h3 className="font-bold text-slate-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-600 font-bold">1.</span>
              Download your PDF using the button above
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600 font-bold">2.</span>
              Check your email for the download link and receipt
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600 font-bold">3.</span>
              Enjoy your new book! Share your thoughts with us.
            </li>
          </ul>
        </div>

        {/* Back to store */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
