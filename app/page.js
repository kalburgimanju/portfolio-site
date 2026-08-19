import Link from 'next/link'
import Image from 'next/image'
import books from '../data/books'

export const metadata = {
  title: 'Manjunath Kalburgi — Author & Innovator',
  description: 'Explore books by Manjunath Kalburgi — practical guides on AI, business, personal growth, and technology. Download your copy today.',
}

export default function Home() {
  const featuredBooks = books.filter(b => b.hasPdf).slice(0, 6)
  const allBooks = books

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
        <div className="container-custom relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Ideas that{' '}
              <span className="text-brand-400">empower</span>
              , books that{' '}
              <span className="text-brand-400">transform</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Explore practical guides on AI, business strategy, personal growth, and technology — written by Manjunath Kalburgi.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#books" className="btn-primary text-lg px-8 py-4">
                Browse Books
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Link href="/about" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 text-lg px-8 py-4">
                About the Author
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600">{books.length}+</div>
              <div className="text-sm text-slate-500 mt-1">Books Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600">{books.filter(b => b.hasPdf).length}+</div>
              <div className="text-sm text-slate-500 mt-1">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600">10K+</div>
              <div className="text-sm text-slate-500 mt-1">Readers Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600">4.8/5</div>
              <div className="text-sm text-slate-500 mt-1">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="books" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Books
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dive into our most popular titles — practical knowledge delivered in clear, actionable formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <Link key={book.slug} href={`/books/${book.slug}`} className="book-card group">
                <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
                  <Image
                    src={book.coverPng}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ${book.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  {book.subtitle && (
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{book.subtitle}</p>
                  )}
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{book.blurb}</p>
                  <div className="flex items-center text-brand-600 font-semibold text-sm group-hover:text-brand-700">
                    View Details
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Books */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              All Books
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The complete collection — from AI and technology to personal growth and business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allBooks.map((book) => (
              <Link key={book.slug} href={`/books/${book.slug}`} className="book-card group">
                <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
                  <Image
                    src={book.coverPng}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 right-2 bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ${book.price}
                  </div>
                  {!book.hasPdf && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">Coming Soon</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-brand-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500">by {book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start reading?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Get instant access to practical guides that will help you grow, learn, and succeed.
          </p>
          <a href="#books" className="btn-primary text-lg px-10 py-4">
            Shop All Books
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-bold text-lg">Manjunath Kalburgi</h3>
              <p className="text-sm mt-1">Author & Innovator</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Manjunath Kalburgi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
