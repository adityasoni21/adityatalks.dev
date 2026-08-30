// src/app/writing/page.tsx
import { articles } from '#site/content'
import { ArticleCard } from '@/components/cards/article-card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Writing', description: 'Essays, notes, and things I learned by shipping.' }

export default function WritingPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )

  return (
    <Section>
      <Container>
        <h1 className="font-display text-h1 mb-48">Writing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {sorted.map((a) => (
            <ArticleCard
              key={a.slug}
              slug={a.slug}
              title={a.title}
              description={a.description}
              readingTime={a.metadata.readingTime}
              published={a.published}
              primaryTopic={a.topics[0]}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}