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
        <div className="group rounded-(--radius-md) border border-border bg-surface/70 p-32 flex flex-col gap-16 transition-all duration-(--duration-standard) hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_60px_rgb(0_0_0/0.2)]">
            <span className="font-mono text-caption text-accent-bright uppercase tracking-[0.08em]">
                {title} . {stageLabel[stage]}
            </span>
            <p className="font-body text-h4">{currentQuestion}</p>
            <p className="font-body text-body text-text-secondary">
                {description}
            </p>
            <Button href={`/learning/${slug}`} variant="text" className="m-8">
                Continue Learning
            </Button>
        </div>
    )
}