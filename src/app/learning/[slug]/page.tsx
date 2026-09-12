// src/app/learning/[slug]/page.tsx
import { learningNotes } from '#site/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { TopicPill } from '@/components/content/topic-pill'
import { ContinueExploring } from '@/components/content/continue-exploring'
import { renderMDX } from '../../../../lib/mdx-components'

export function generateStaticParams() {
  return learningNotes.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = learningNotes.find((l) => l.slug === slug)
  if (!note) return {}
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/learning/${note.slug}` },
  }
}

const stageLabel = {
  exploring: 'Exploring',
  active: 'Actively learning',
  consolidating: 'Consolidating',
} as const

export default async function LearningNotePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = learningNotes.find((l) => l.slug === slug)
  if (!note) notFound()

  const body = await renderMDX(note.content)

  return (
    <Section>
      <Container width="reading">
        <span className="text-caption text-accent uppercase tracking-wide">
          {stageLabel[note.stage]}
        </span>

        <h1 className="font-display text-h1 mt-8 mb-16">{note.title}</h1>

        <p className="font-body text-body-lg text-text-secondary mb-24">
          {note.currentQuestion}
        </p>

        <div className="flex flex-wrap gap-8 mb-48">
          {note.topics.map((t) => (
            <TopicPill key={t} slug={t} label={t} />
          ))}
        </div>

        <article className="prose-content font-body text-body">{body}</article>

        {note.nextMilestone && (
          <div className="mt-48 p-24 rounded-(--radius-md) border border-border bg-surface">
            <span className="text-caption text-accent uppercase tracking-wide">
              Next Milestone
            </span>
            <p className="font-body text-body mt-4">{note.nextMilestone}</p>
          </div>
        )}

        <ContinueExploring id={`learning:${note.slug}`} />
      </Container>
    </Section>
  )
}