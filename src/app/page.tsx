import {
  projects,
  articles,
  learningNotes,
  ideas,
  timelineEvents,
  topics,
} from '#site/content'
import { Hero } from '@/components/content/hero'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ProjectCard } from '@/components/cards/project-card'
import { ArticleCard } from '@/components/cards/article-card'
import { LearningCard } from '@/components/cards/learning-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function SectionHeader({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-32 flex items-end justify-between gap-24 border-b border-border pb-16">
      <h2 className="font-body text-h2 tracking-[-0.025em]">{title}</h2>
      {href && linkLabel && (
        <Button href={href} variant="text" className="shrink-0 text-small text-text-secondary">
          {linkLabel}
        </Button>
      )}
    </div>
  )
}

function CurrentCuriosities() {
  const activeLearning = learningNotes
    .filter((n) => n.stage !== 'consolidating')
    .map((n) => ({ question: n.currentQuestion, href: `/learning/${n.slug}`, published: n.published, kind: 'Learning' }))

  const openIdeas = ideas.map((i) => ({
    question: i.hiddenQuestion,
    href: `/ideas/${i.slug}`,
    published: i.published,
    kind: 'Idea',
  }))

  const curiosities = [...activeLearning, ...openIdeas]
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 3)

  if (curiosities.length === 0) return null

  return (
    <Section size="small" className="border-b border-border/60">
      <Container>
        <SectionHeader title="Current Curiosities" />
        <div className="flex flex-col gap-24">
          {curiosities.map((c, index) => (
            <Link key={c.href} href={c.href} className="group grid grid-cols-[auto_1fr] items-start gap-16 border-b border-border/60 pb-24 last:border-0 last:pb-0">
            <span className="font-mono text-caption text-accent-bright mt-4 shrink-0">
              {String(index + 1).padStart(2, '0')}
              </span>
            <span className="font-body text-h4 transition-colors group-hover:text-accent-bright">
                {c.question}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function FeaturedProject() {
  const sorted = [...projects].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
  const building = sorted.find((p) => p.projectStatus === 'building')
  const featured = building ?? sorted[0]
  if (!featured) return null

  return (
    <Section size="small">
      <Container>
        <SectionHeader title="Featured Project" href="/projects" linkLabel="See All Projects" />
        <div className="max-w-3xl">
          <ProjectCard
            number={1}
            slug={featured.slug}
            title={featured.title}
            oneSentenceStory={featured.oneSentenceStory}
            topics={featured.topics}
            projectStatus={featured.projectStatus}
          />
        </div>
      </Container>
    </Section>
  )
}

function LatestWriting() {
  const sorted = [...articles].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()).slice(0, 3)
  if (sorted.length === 0) return null

  return (
    <Section size="small">
      <Container>
        <SectionHeader title="Latest Writing" href="/writing" linkLabel="See All Writing" />
        <div className="grid grid-cols-1 gap-24 md:grid-cols-3">
          {sorted.map((a) => (
            <ArticleCard
              key={a.slug}
              slug={a.slug}
              title={a.title}
              description={a.description}
              readingTime={a.metadata.readingTime}
              published={a.published}
              primaryTopic={a.topics[0]!}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Learning() {
  const sorted = [...learningNotes].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()).slice(0, 2)
  if (sorted.length === 0) return null

  return (
    <Section size="small">
      <Container>
        <SectionHeader title="Learning" href="/learning" linkLabel="See All Learning" />
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
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

function RecentlyShipped() {
  const shipped = projects
    .filter((p) => p.projectStatus === 'shipped')
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 3)
  if (shipped.length === 0) return null

  return (
    <Section size="small">
      <Container>
        <SectionHeader title="Recently Shipped" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {shipped.map((p, i) => (
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
      </Container>
    </Section>
  )
}

function ExploreTopics() {
  if (topics.length === 0) return null

  return (
    <Section size="small">
      <Container>
        <SectionHeader title="Explore Topics" href="/topics" linkLabel="See All Topics" />
        <div className="flex flex-wrap gap-12">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="px-16 py-8 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
            >
              {t.title}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function TimelineSnapshot() {
  const sorted = [...timelineEvents].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()).slice(0, 4)
  if (sorted.length === 0) return null // no empty state on the homepage — the dedicated /timeline page owns that

  return (
    <Section size="small">
      <Container width="reading">
        <SectionHeader title="Timeline" href="/timeline" linkLabel="See Full Timeline" />
        <div className="flex flex-col gap-16">
          {sorted.map((event) => (
            <div key={event.slug} className="flex items-baseline gap-16">
              <span className="font-mono text-caption text-text-secondary w-80 shrink-0">
                {new Date(event.published).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
              <span className="font-body text-body">{event.milestone}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Connect() {
  return (
    <Section>
      <Container width="reading" className="text-center">
        <h2 className="font-display text-h2 mb-16">Say hello</h2>
        <p className="font-body text-body-lg text-text-secondary mb-32">
          If something here connected with something you&apos;re building, learning, or stuck on — reach out.
        </p>
        <Button href="/contact" variant="primary">
          Get in Touch
        </Button>
      </Container>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <CurrentCuriosities />
      <FeaturedProject />
      <LatestWriting />
      <Learning />
      <RecentlyShipped />
      <ExploreTopics />
      <TimelineSnapshot />
      <Connect />
    </>
  )
}