import { projects, articles, learningNotes, artifacts, timelineEvents, experiments, books, ideas } from '#site/content'
import { edges } from '../content/relationships'

export type ContentKind = 'project' | 'article' | 'learning' | 'experiment' | 'artifact' | 'book' | 'idea' | 'timeline'

export interface ContentEntity {
    id: string
    kind: ContentKind
    slug: string
    title: string
    topics: string[]
    published: string
}

function toEntities(): ContentEntity[] {
    return [
        ...projects.map(p => ({ id: `project:${p.slug}`, kind: 'project' as const, slug: p.slug, title: p.title, topics: p.topics, published: p.published })),
        ...articles.map(a => ({ id: `article:${a.slug}`, kind: 'article' as const, slug: a.slug, title: a.title, topics: a.topics, published: a.published })),
        ...learningNotes.map(l => ({ id: `learning:${l.slug}`, kind: 'learning' as const, slug: l.slug, title: l.title, topics: l.topics, published: l.published })),
        ...experiments.map(e => ({ id: `experiment:${e.slug}`, kind: 'experiment' as const, slug: e.slug, title: e.title, topics: e.topics, published: e.published })),
        ...artifacts.map(a => ({ id: `artifact:${a.slug}`, kind: 'artifact' as const, slug: a.slug, title: a.title, topics: a.topics, published: a.published })),
        ...books.map(b => ({ id: `book:${b.slug}`, kind: 'book' as const, slug: b.slug, title: b.title, topics: b.topics, published: b.published })),
        ...ideas.map(i => ({ id: `idea:${i.slug}`, kind: 'idea' as const, slug: i.slug, title: i.title, topics: i.topics, published: i.published })),
        ...timelineEvents.map(t => ({ id: `timeline:${t.slug}`, kind: 'timeline' as const, slug: t.slug, title: t.title, topics: t.topics, published: t.published }))
    ]
}

const DEFAULT_CAPS: Record<ContentKind, number> = {
    project: 1, article: 2, learning: 1, experiment: 0, artifact: 1, book: 0, idea: 0, timeline: 1
}

export function getRelated(id: string, caps: Partial<Record<ContentKind, number>> = {}) {
    const all = toEntities()
    const current = all.find(e => e.id === id)
    if (!current) return []

    const explicitIds = edges.filter(([a, b]) => a === id || b === id).map(([a, b]) => (a === id ? b : a))

    const explicit = edges
        .filter(([a, b]) => a === id || b=== id)
        .map(([a, b, label]) => {
            const otherId = a === id ? b : a
            const entity = all.find((e) => e.id === otherId)
            return entity ? {...entity, source: 'explicit' as const, label} : null
        })
        .filter((e): e is ContentEntity & { source: 'explicit'; label?: string} => Boolean(e))
    
    const implicit = all
        .filter(e => e.id !== id && !explicitIds.includes(e.id) && e.topics.some((t) => current.topics.includes(t)))
        .map((e) => {
            const sharedTopic = e.topics.find((t) => current.topics.includes(t))
            return {...e, source: 'implicit' as const, label: sharedTopic}
        })

    const limits = { ...DEFAULT_CAPS, ...caps }
    const counts: Partial<Record<ContentKind, number>> = {}

    return [...explicit, ...implicit].filter(e => {
        counts[e.kind] = (counts[e.kind] ?? 0) + 1
        return counts[e.kind]! <= limits[e.kind]
    })
}