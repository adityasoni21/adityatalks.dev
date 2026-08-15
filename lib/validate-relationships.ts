import { projects, learningNotes, articles, artifacts, timelineEvents, experiments, books, ideas, topics } from '#site/content'
import { edges } from '../content/relationships'

function main() {
    const errors: string[] = []

    const allIds = new Set<string>([
        ...projects.map(p => `project: ${p.slug}`),
        ...articles.map(a => `article: ${a.slug}`),
        ...learningNotes.map(l => `learning: ${l.slug}`),
        ...experiments.map(e => `experiment: ${e.slug}`),
        ...artifacts.map(a => `artifact: ${a.slug}`),
        ...books.map(b => `book: ${b.slug}`),
        ...ideas.map(i => `idea: ${i.slug}`),
        ...timelineEvents.map(t => `timeline: ${t.slug}`)
    ])
    const topicRegistry = new Set(topics.map(t => t.slug))

    const seen = new Set<string>()
    for (const [a, b] of edges) {
        const key = [a, b].sort().join('|')
        if (seen.has(key)) errors.push(`Duplicate edge: ${a} <-> ${b}`)
        seen.add(key)
        if (!allIds.has(a)) errors.push(`Edge references missing content: "${a}"`)
        if (!allIds.has(b)) errors.push(`Edge references missing content: "${b}"`)
    }

    const allContent = [...projects, ...articles, ...learningNotes, ...experiments, ...artifacts, ...books, ...ideas, ...timelineEvents]
    for (const item of allContent) {
        for (const t of item.topics ?? []) {
            if (!topicRegistry.has(t)) {
                errors.push(`"${item.title}" references undefined topic "${t}" - add content/topics${t}.mdx or fix the typo`)
            }
        }
    }

    if (errors.length) {
        console.error(`\n❌ Relationship validation failed (${errors.length} issue${errors.length > 1 ? 's': ''}): \n`)
        errors.forEach(e => console.error(` - ${e}`))
        process.exit(1)
    }
    console.log(` Graph valid - ${edges.length} edges, ${allIds.size} entities, ${topicRegistry.size} topics.`)
}

main()