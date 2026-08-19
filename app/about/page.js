import Link from 'next/link'

export const metadata = {
  title: 'About Manjunath Kalburgi',
  description: 'Learn about Manjunath Kalburgi — author, innovator, and creator of practical guides on AI, business, and personal growth.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
        <div className="container-custom relative py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            About the Author
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Practical knowledge, clear writing, and a passion for helping others grow.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Bio */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-slate prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Hi, I'm Manjunath Kalburgi.</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                I write practical, no-fluff books that help people learn real skills and make better decisions. My work spans AI agents, business strategy, personal growth, and technology — topics I believe everyone should understand, regardless of their background.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Every book I publish is designed to be immediately useful. No jargon for the sake of jargon. No filler. Just clear explanations, actionable steps, and honest insights from someone who has been in the trenches.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                When I'm not writing, you'll find me experimenting with new AI tools, exploring startup ideas, or documenting what I learn so others can skip the mistakes I made.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center text-xl font-bold mb-4">01</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Clarity First</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Complex topics broken into simple, actionable steps. If you can't explain it clearly, you don't understand it well enough.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center text-xl font-bold mb-4">02</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Practical Over Theoretical</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every concept comes with real examples, exercises, or frameworks you can use immediately. No theory without application.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center text-xl font-bold mb-4">03</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Learn in Public</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  I document mistakes, dead ends, and breakthroughs. Transparency beats polished perfection every time.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to start learning?</h3>
              <p className="text-slate-600 mb-8">Browse the collection and find your next read.</p>
              <Link href="/#books" className="btn-primary text-lg px-10 py-4">
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
