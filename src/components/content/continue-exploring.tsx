import Link from "next/link";
import { Rocket, FileText, Lightbulb, ImageIcon, Flag } from "lucide-react";
import { getRelated, type ContentKind } from "../../../lib/graph";

const kindMeta: Record<ContentKind, { label: string; icon:React.ElementType; hrefPrefix: string | null }> = {
    project: { label: 'Project', icon: Rocket, hrefPrefix: '/projects' },
    article: { label: 'Article', icon: FileText, hrefPrefix: '/writing' },
    learning: { label: 'Learning Note', icon: Lightbulb, hrefPrefix: '/learning' },
    experiment: { label: 'Experiment', icon: FileText, hrefPrefix: null },
    artifact: { label: 'Artifact', icon: ImageIcon, hrefPrefix: null },
    book: { label: 'Book', icon: FileText, hrefPrefix: null },
    idea: { label: 'Idea', icon: Lightbulb, hrefPrefix: null },
    timeline: { label: 'Timeline', icon: Flag, hrefPrefix: '/timeline' }
}

function reasonText(item: { source: 'explicit' | 'implicit'; label?: string }) {
    if (item.source === 'explicit' && item.label) {
        return item.label.replace(/-/g, ' ')
    }
    if (item.label) {
        return `Also explores ${item.label}`
    }
    return 'Connected'
}

export function ContinueExploring({ id }: { id: string }) {
    const related = getRelated(id)
    if (related.length === 0) return null

    return (
        <section className="mt-96 pt-48 border-t border-border">
            <h2 className="font-body text-h3 mb-32">Continue Exploring</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {related.map((item) => {
                    const meta = kindMeta[item.kind]
                    const Icon = meta.icon
                    const href = meta.hrefPrefix ? `${meta.hrefPrefix}/${item?.slug}` : undefined

                    const inner = (
                        <div className="flex items-start gap-16 p-24 rounded-(--radius-md) border border-border bg-surface/70 h-full transition-colors group-hover:border-accent/50">
                            <Icon size={18} className="text-accent-bright mt-4 shrink-0" aria-hidden />
                            <div className="flex flex-col gap-4">
                                <span className="text-caption text-text-secondary uppercase tracking-wide">
                                    {meta.label}
                                </span>
                                <span className="font-body text-body">{item?.title}</span>
                                <span className="text-small text-text-secondary capitalize">
                                    {reasonText(item)}
                                </span>
                            </div>
                        </div>
                    )

                    return href ? (
                        <Link key={item?.id} href={href} className="group hover:-translate-y-0.5 transition-transform duration-(--duration-standard)">
                            {inner}
                        </Link>
                    ) : (
                        <div key={item?.id}>{inner}</div>
                    )
                })}
            </div>
        </section>
    )
}