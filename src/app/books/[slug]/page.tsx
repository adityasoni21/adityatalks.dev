// src/app/books/[slug]/page.tsx
import { books } from '#site/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ContinueExploring } from '@/components/content/continue-exploring'
import { renderMDX } from '../../../../lib/mdx-components'

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const book = books.find((b) => b.slug === slug)
  if (!book) return {}
  return { title: `${book.title} — ${book.author}`, description: book.description, alternates: { canonical: `/books/${book.slug}` } }
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = books.find((b) => b.slug === slug)
  if (!book) notFound()

  const body = await renderMDX(book.content)

  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-8">{book.title}</h1>
        <p className="font-body text-body-lg text-text-secondary mb-48">
          {book.author}
        </p>
        <article className="prose-content font-body text-body">{body}</article>
        <ContinueExploring id={`book:${book.slug}`} />
      </Container>
    </Section>
  )
}