import { topics, projects, articles, learningNotes } from '#site/content'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Topics', description: 'The threads connecting everything on this site.' }

export default function TopicsPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-h1 mb-48">Topics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {topics.map((topic) => {
            const count =
              projects.filter((p) => p.topics.includes(topic.slug)).length +
              articles.filter((a) => a.topics.includes(topic.slug)).length +
              learningNotes.filter((l) => l.topics.includes(topic.slug)).length

            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="block p-24 rounded-(--radius-md) border border-border bg-surface hover:-translate-y-0.5 transition-transform duration-(--duration-standard)"
              >
                <h3 className="font-display text-h4">{topic.title}</h3>
                <p className="font-body text-small text-text-secondary mt-8">
                  {topic.overview}
                </p>
                <span className="text-caption text-accent mt-16 inline-block">
                  {count} {count === 1 ? 'connection' : 'connections'}
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}