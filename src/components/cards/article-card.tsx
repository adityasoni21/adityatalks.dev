// src/components/cards/article-card.tsx
import Link from 'next/link'
import { TopicPill } from '@/components/content/topic-pill'

export function ArticleCard({
  slug,
  title,
  description,
  readingTime,
  published,
  primaryTopic,
}: {
  slug: string
  title: string
  description: string
  readingTime: number
  published: string
  primaryTopic: string
}) {
  const date = new Date(published).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <div className="relative rounded-(--radius-md) border border-border bg-surface p-32 flex flex-col gap-16 hover:-translate-y-0.5 transition-transform duration-(--duration-standard)">
      <h3 className="font-display text-h3">
        <Link href={`/writing/${slug}`} className="static after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>

      <p className="font-body text-body text-text-secondary">
        {description}
      </p>

      <div className="flex items-center gap-16 text-caption text-text-secondary">
        <span>{readingTime} min read</span>
        <span aria-hidden>·</span>
        <span>{date}</span>
      </div>

      <div className="relative z-10 w-fit">
        <TopicPill slug={primaryTopic} label={primaryTopic} />
      </div>
    </div>
  )
}