import Link from 'next/link'

export function TopicPill({ slug, label }:{ slug: string; label: string }) {
    return (
        <Link
            href={`/topics/${slug}`}
            className="text-caption px-8 py-4 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
        >
            {label}
        </Link>
    )
}