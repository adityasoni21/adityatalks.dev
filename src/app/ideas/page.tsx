import { ideas } from '#site/content'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ideas', description: 'Unfinished thoughts, kept anyway.' }

export default function IdeasPage() {
  const sorted = [...ideas].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-48">Ideas</h1>
        <div className="flex flex-col gap-32">
          {sorted.map((idea) => (
            <Link key={idea.slug} href={`/ideas/${idea.slug}`} className="block group">
              <p className="font-display text-h4 group-hover:text-accent transition-colors">
                {idea.title}
              </p>
              <p className="font-body text-body text-text-secondary mt-4">
                {idea.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}