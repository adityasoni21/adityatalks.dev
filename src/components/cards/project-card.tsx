import { TopicPill } from "@/components/content/topic-pill";
import { Button } from "@/components/ui/button";

const statusColor = {
    shipped: 'var(--color-success)',
    building: 'var(--color-accent)',
    paused: 'var(--color-warning)'
} as const

export function ProjectCard({
    number,
    slug,
    title,
    oneSentenceStory,
    topics,
    projectStatus
}: {
    number: number
    slug: string
    title: string
    oneSentenceStory: string
    topics: string[]
    projectStatus: 'shipped' | 'paused' | 'building'
}) {
    return (
        <div className="group rounded-(--radius-md) border border-border bg-surface/80 p-32 md:p-32 sm:p-24 flex flex-col gap-16 backdrop-blur-sm hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_60px_rgb(0_0_0/0.2)] transition-all duration-(--duration-standard)">
            <span className="font-mono text-caption text-text-secondary ">
                {String(number).padStart(2, '0')}
            </span>
            <h3 className="font-display text-h3">{title}</h3>
            <p className="font-body text-body text-text-secondary ">
                {oneSentenceStory}
            </p>
            <div className="flex flex-wrap gap-8">
                {topics.map((t) => (
                    <TopicPill key={t} slug={t} label={t} />
                ))}
            </div>
            <div className="flex items-center gap-8">
                <span
                    className="inline-block w-8 h-8 rounded-full"
                    style={{backgroundColor: statusColor[projectStatus]}}
                    aria-hidden
                />
                <span className="text-small text-text-secondary capitalize">
                    {projectStatus}
                </span>
            </div>
            <Button href={`/projects/${slug}`} variant="text" className="mt-8">
                See How It Evolved
            </Button>
        </div>
    )
}