import { experiments } from '#site/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { TopicPill } from '@/components/content/topic-pill'
import { ContinueExploring } from '@/components/content/continue-exploring'
import { renderMDX } from '../../../../lib/mdx-components'

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const experiment = experiments.find((e) => e.slug === slug)
  if (!experiment) return {}
  return {
    title: experiment.title,
    description: experiment.description,
    alternates: { canonical: `/experiments/${experiment.slug}` },
  }
}

export default async function ExperimentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experiment = experiments.find((e) => e.slug === slug)
  if (!experiment) notFound()

  const body = await renderMDX(experiment.content)

  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-16">{experiment.title}</h1>

        <div className="p-24 rounded-(--radius-md) border border-border bg-surface mb-24">
          <span className="text-caption text-accent uppercase tracking-wide">
            Hypothesis
          </span>
          <p className="font-body text-body mt-4">{experiment.hypothesis}</p>
        </div>

        {experiment.outcome && (
          <div className="p-24 rounded-(--radius-md) border border-border bg-surface mb-24">
            <span className="text-caption text-success uppercase tracking-wide">
              Outcome
            </span>
            <p className="font-body text-body mt-4">{experiment.outcome}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-8 mb-48">
          {experiment.topics.map((t) => (
            <TopicPill key={t} slug={t} label={t} />
          ))}
        </div>

        <article className="prose-content font-body text-body">{body}</article>
        <ContinueExploring id={`experiment:${experiment.slug}`} />
      </Container>
    </Section>
  )
}