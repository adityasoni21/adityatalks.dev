import { ideas } from '#site/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { TopicPill } from '@/components/content/topic-pill'
import { ContinueExploring } from '@/components/content/continue-exploring'
import { renderMDX } from '../../../../lib/mdx-components'

export function generateStaticParams() {
  return ideas.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const idea = ideas.find((i) => i.slug === slug)
  if (!idea) return {}
  return { title: idea.title, description: idea.description, alternates: { canonical: `/ideas/${idea.slug}` } }
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const idea = ideas.find((i) => i.slug === slug)
  if (!idea) notFound()

  const body = await renderMDX(idea.content)

  return (
    <Section>
      <Container width="reading">
        <p className="font-mono text-caption text-accent mb-16">
          {idea.hiddenQuestion}
        </p>
        <h1 className="font-display text-h1 mb-24">{idea.title}</h1>
        <div className="flex flex-wrap gap-8 mb-48">
          {idea.topics.map((t) => (
            <TopicPill key={t} slug={t} label={t} />
          ))}
        </div>
        <article className="prose-content font-body text-body">{body}</article>
        <ContinueExploring id={`idea:${idea.slug}`} />
      </Container>
    </Section>
  )
}