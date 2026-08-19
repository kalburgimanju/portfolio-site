import Image from 'next/image'
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
  if (!book) return { title: 'Book Not Found' }

  return {
    title: book.title,
    description: book.blurb,
    openGraph: {
      title: book.title,
      description: book.blurb,
      images: [book.coverPng],
    },
  }
}

export default function BookPage({ params }) {
  const book = books.find((b) => b.slug === params.slug)

  if (!book) {
    notFound()
  }

  const handleCheckout = () => {
    if (!book.stripeLink) {
      alert('This book is not yet available for purchase. Please check back later.')
      return
    }
    window.location.href = book.stripeLink
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate">{book.title}</span>
          </nav>
        </div>
      </div>

      {/* Book Details */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Cover Image */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="relative aspect-[2/3] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={book.coverPng}
                    alt={book.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="max-w-xl">
              <div className="mb-6">
                <span className="inline-block bg-brand-100 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  {book.hasPdf ? 'Available Now' : 'Coming Soon'}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-xl text-slate-600 mb-4">{book.subtitle}</p>
                )}
                <p className="text-lg text-slate-500">by {book.author}</p>
              </div>

              {/* Price & CTA */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 mb-8">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-slate-900">${book.price}</span>
                  <span className="text-slate-500">{book.currency}</span>
                </div>
                
                {book.hasPdf && book.stripeLink ? (
                  <button
                    onClick={handleCheckout}
                    className="w-full btn-primary text-lg py-4 mb-4"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Buy Now — Instant Download
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-300 text-slate-500 text-lg py-4 rounded-xl font-semibold cursor-not-allowed mb-4"
                  >
                    {book.hasPdf ? 'Coming Soon' : 'Not Yet Available'}
                  </button>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure payment via Stripe
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Book</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{book.blurb}</p>
              </div>

              {/* Chapters */}
              {book.chapters.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What's Inside</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
                    {book.chapters.map((chapter, idx) => (
                      <div key={idx} className="flex items-center gap-4 px-6 py-4">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-slate-700 font-medium">{chapter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Format Info */}
              <div className="mt-10 bg-slate-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">What You Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">High-quality PDF format — readable on any device</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">Instant download after purchase</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">Lifetime access — download anytime</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">Secure payment processing</span>
                  </li>
                </ul>
              </div>

              {/* Back to all books */}
              <div className="mt-10">
                <Link href="/#books" className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Back to all books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
