import { notFound } from 'next/navigation'
import books from '../../../data/books'
import ReaderPageClient from './ReaderClient'

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }))
}

export async function generateMetadata({ params }) {
  const book = books.find((b) => b.slug === params.slug)
  if (!book) return { title: 'Reader' }

  return {
    title: `Reading — ${book.title}`,
  }
}

export default function ReaderPage({ params }) {
  const book = books.find((b) => b.slug === params.slug)

  if (!book) {
    notFound()
  }

  return <ReaderPageClient book={book} />
}
