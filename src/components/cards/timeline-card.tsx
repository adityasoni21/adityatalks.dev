import { Button } from "@/components/ui/button";

export function TimelineCard({
    slug,
    published,
    milestone,
    description
}: {
    slug: string
    published: string
    milestone: string
    description: string
}) {
    const date = new Date(published).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
        <div className="flex flex-col gap-8 py-24 border-b border-border">
            <span className="font-mono text-caption text-text-secondary">
                {date}
            </span>
            <h4 className="font-body text-h4">{milestone}</h4>
            <p className="font-body text-body text-text-secondary">
                {description}
            </p>
            <Button href={`/timeline#${slug}`} variant="text" className="mt-4 self-start">
                Explore
            </Button>
        </div>
    )
}