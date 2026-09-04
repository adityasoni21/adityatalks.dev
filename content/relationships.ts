// Explicit curated edges only - undirected, declared once
// Format: [id, id, optional relationship label]
// id format is `${kind}: ${slug}`  - kind matches lib/graph.ts's ContentKind

export const edges: Array<[string, string, string?]> = [
    ['project:velocity', 'article:why-relationships-over-folders', 'documents']
]