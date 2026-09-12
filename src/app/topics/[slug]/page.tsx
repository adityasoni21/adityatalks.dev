import { topics, projects, articles, learningNotes, experiments, books, timelineEvents } from '#site/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ProjectCard } from '@/components/cards/project-card'
import { ArticleCard } from '@/components/cards/article-card'
import { LearningCard } from '@/components/cards/learning-card'
import { renderMDX } from '../../../../lib/mdx-components'

export function generateStaticParams() {
  return topics
    .filter((topic): topic is typeof topic & { slug: string } => Boolean(topic.slug))
    .map((topic) => ({
      slug: topic.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const topic = topics.find((t) => t.slug === slug)
  if (!topic) return {}
  return { title: topic.title, description: topic.overview, alternates: { canonical: `/topics/${topic.slug}` } }
}

function TopicSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-64">
      <h2 className="font-display text-h3 mb-24">{title}</h2>
      {children}
    </div>
  )
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = topics.find((t) => t.slug === slug)
  if (!topic) notFound()

  const relatedProjects = projects.filter((p) => p.topics.includes(slug))
  const relatedArticles = articles.filter((a) => a.topics.includes(slug))
  const relatedLearning = learningNotes.filter((l) => l.topics.includes(slug))
  const relatedExperiments = experiments.filter((e) => e.topics.includes(slug))
  const relatedBooks = books.filter((b) => b.topics.includes(slug))
  const relatedTimeline = timelineEvents.filter((t) => t.topics.includes(slug))

  const overview = await renderMDX(topic.content)

  return (
    <Section>
      <Container>
        <h1 className="font-display text-h1 mb-16">{topic.title}</h1>
        <p className="font-body text-body-lg text-text-secondary mb-16">
          {topic.overview}
        </p>
        <div className="prose-content font-body text-body mb-64">{overview}</div>

        {relatedProjects.length > 0 && (
          <TopicSection title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {relatedProjects.map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  number={i + 1}
                  slug={p.slug}
                  title={p.title}
                  oneSentenceStory={p.oneSentenceStory}
                  topics={p.topics}
                  projectStatus={p.projectStatus}
                />
              ))}
            </div>
          </TopicSection>
        )}

        {relatedArticles.length > 0 && (
          <TopicSection title="Writing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {relatedArticles.map((a) => (
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
          </TopicSection>
        )}

        {relatedLearning.length > 0 && (
          <TopicSection title="Learning Notes">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {relatedLearning.map((l) => (
                <LearningCard
                  key={l.slug}
                  slug={l.slug}
                  title={l.title}
                  currentQuestion={l.currentQuestion}
                  description={l.description}
                  stage={l.stage}
                />
              ))}
            </div>
          </TopicSection>
        )}

        {relatedExperiments.length > 0 && (
          <TopicSection title="Experiments">
            <ul className="flex flex-col gap-8">
              {relatedExperiments.map((e) => (
                <li key={e.slug}>
                  <a href={`/experiments/${e.slug}`} className="text-accent hover:underline">
                    {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </TopicSection>
        )}

        {relatedBooks.length > 0 && (
          <TopicSection title="Books">
            <ul className="flex flex-col gap-8">
              {relatedBooks.map((b) => (
                <li key={b.slug}>
                  <a href={`/books/${b.slug}`} className="text-accent hover:underline">
                    {b.title} — {b.author}
                  </a>
                </li>
              ))}
            </ul>
          </TopicSection>
        )}

        {relatedTimeline.length > 0 && (
          <TopicSection title="Timeline">
            <ul className="flex flex-col gap-8">
              {relatedTimeline.map((t) => (
                <li key={t.slug} className="text-text-secondary">
                  {new Date(t.published).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — {t.milestone}
                </li>
              ))}
            </ul>
          </TopicSection>
        )}
      </Container>
    </Section>
  )
}