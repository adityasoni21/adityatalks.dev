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
    <div className="group relative overflow-hidden rounded-(--radius-md) border border-border bg-surface/70 p-32 flex flex-col gap-16 backdrop-blur-sm hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_60px_rgb(0_0_0/0.2)] transition-all duration-(--duration-standard)">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <h3 className="font-body text-h3 tracking-[-0.025em]">
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