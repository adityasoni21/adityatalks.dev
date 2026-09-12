import { learningNotes } from '#site/content'
import { LearningCard } from '@/components/cards/learning-card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning',
  description: 'What I am actively figuring out right now.',
}

export default function LearningPage() {
  const sorted = [...learningNotes].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )

  return (
    <Section>
      <Container>
        <h1 className="font-display text-h1 mb-48">Learning</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {sorted.map((note) => (
            <LearningCard
              key={note.slug}
              slug={note.slug}
              title={note.title}
              currentQuestion={note.currentQuestion}
              description={note.description}
              stage={note.stage}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}