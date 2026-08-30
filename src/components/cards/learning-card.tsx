import { Button } from "@/components/ui/button";

const stageLabel = {
    exploring: 'Exploring',
    active: 'Actively Learning',
    consolidating: 'Consolidating'
} as const

export function LearningCard({
    slug,
    title,
    currentQuestion,
    description,
    stage
}: {
    slug: string
    title: string
    currentQuestion: string
    description: string
    stage: 'exploring' | 'active' | 'consolidating'
}) {
    return (
        <div className="rounded-(--radius-md) border border-border bg-surface p-32 flex flex-col gap-16">
            <span className="text-caption text-accent uppercase tracking-wide">
                {title} . {stageLabel[stage]}
            </span>
            <p className="font-display text-h4">{currentQuestion}</p>
            <p className="font-body text-body text-text-secondary">
                {description}
            </p>
            <Button href={`/learning/${slug}`} variant="text" className="m-8">
                Continue Learning
            </Button>
        </div>
    )
}