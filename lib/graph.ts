// lib/graph.ts — full replacement
import { projects, articles, learningNotes, artifacts, timelineEvents } from '#site/content'
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

export interface RelatedEntity extends ContentEntity {
  source: 'explicit' | 'implicit'
  label?: string
}

function toEntities(): ContentEntity[] {
  return [
    ...projects.map((p) => ({ id: `project:${p.slug}`, kind: 'project' as const, slug: p.slug, title: p.title, topics: p.topics, published: p.published })),
    ...articles.map((a) => ({ id: `article:${a.slug}`, kind: 'article' as const, slug: a.slug, title: a.title, topics: a.topics, published: a.published })),
    ...learningNotes.map((l) => ({ id: `learning:${l.slug}`, kind: 'learning' as const, slug: l.slug, title: l.title, topics: l.topics, published: l.published })),
    ...artifacts.map((a) => ({ id: `artifact:${a.slug}`, kind: 'artifact' as const, slug: a.slug, title: a.title, topics: a.topics, published: a.published })),
    ...timelineEvents.map((t) => ({ id: `timeline:${t.slug}`, kind: 'timeline' as const, slug: t.slug, title: t.title, topics: t.topics, published: t.published })),
  ]
}

const DEFAULT_CAPS: Record<ContentKind, number> = {
  project: 1, article: 2, learning: 1, experiment: 0, artifact: 1, book: 0, idea: 0, timeline: 1,
}

export function getRelated(id: string, caps: Partial<Record<ContentKind, number>> = {}): RelatedEntity[] {
  const all = toEntities()
  const current = all.find((e) => e.id === id)
  if (!current) return []

  const explicitIds: string[] = []
  const explicit: RelatedEntity[] = []

  for (const [a, b, label] of edges) {
    if (a !== id && b !== id) continue
    const otherId = a === id ? b : a
    const entity = all.find((e) => e.id === otherId)
    if (entity) {
      explicitIds.push(otherId)
      explicit.push({ ...entity, source: 'explicit', label })
    }
  }

  const implicit: RelatedEntity[] = all
    .filter((e) => e.id !== id && !explicitIds.includes(e.id) && e.topics.some((t) => current.topics.includes(t)))
    .map((e) => ({ ...e, source: 'implicit' as const, label: e.topics.find((t) => current.topics.includes(t)) }))

  const limits = { ...DEFAULT_CAPS, ...caps }
  const counts: Partial<Record<ContentKind, number>> = {}

  return [...explicit, ...implicit].filter((e) => {
    counts[e.kind] = (counts[e.kind] ?? 0) + 1
    return counts[e.kind]! <= limits[e.kind]
  })
}