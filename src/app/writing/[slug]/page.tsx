// src/app/writing/[slug]/page.tsx
import { articles } from '#site/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { TopicPill } from '@/components/content/topic-pill'
import { renderMDX } from '../../../../lib/mdx-components'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: { title: article.title, description: article.description, type: 'article' },
  }
}

export default async function ArticlePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const body = await renderMDX(article.content)
  const date = new Date(article.published).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-16">{article.title}</h1>
        <div className="flex items-center gap-16 text-small text-text-secondary mb-24">
          <span>{date}</span>
          <span aria-hidden>·</span>
          <span>{article.metadata.readingTime} min read</span>
        </div>
        <div className="flex flex-wrap gap-8 mb-48">
          {article.topics.map((t) => (
            <TopicPill key={t} slug={t} label={t} />
          ))}
        </div>
        <article className="prose-content font-body text-body">{body}</article>
      </Container>
    </Section>
  )
}