import { books } from '#site/content'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Books', description: 'What I am reading, and what it connects to.' }

const statusLabel = { reading: 'Reading', finished: 'Finished', wishlist: 'Wishlist' } as const

export default function BooksPage() {
  const sorted = [...books].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

  return (
    <Section>
      <Container>
        <h1 className="font-display text-h1 mb-48">Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {sorted.map((book) => (
            <Link
              key={book.slug}
              href={`/books/${book.slug}`}
              className="block p-24 rounded-(--radius-md) border border-border)] bg-surface hover:-translate-y-0.5 transition-transform duration-(--duration-standard)"
            >
              <span className="text-caption text-text-secondary uppercase">
                {statusLabel[book.readStatus]}
              </span>
              <h3 className="font-display text-h4 mt-8">{book.title}</h3>
              <p className="font-body text-small text-text-secondary">
                {book.author}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}