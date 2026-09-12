import { timelineEvents } from '#site/content'
import { TimelineCard } from '@/components/cards/timeline-card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Timeline', description: 'Milestones, in order.' }

export default function TimelinePage() {
  const sorted = [...timelineEvents].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )

  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-48">Timeline</h1>

        {sorted.length === 0 ? (
          <p className="font-body text-body-lg text-text-secondary">
            The next milestone starts with a question.
          </p>
        ) : (
          <div className="flex flex-col">
            {sorted.map((event) => (
              <TimelineCard
                key={event.slug}
                slug={event.slug}
                published={event.published}
                milestone={event.milestone}
                description={event.description}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}