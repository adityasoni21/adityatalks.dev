import { defineConfig, defineCollection, s } from 'velite'

// Shared fields every content type carries
const base = {
    title: s.string().max(99),
    description: s.string().max(300),
    published: s.isodate(),
    updated: s.isodate().optional(),
    topics: s.array(s.string()).min(1), // validated against the topic registry
    featuredImage: s.image().optional(),
    status: s.enum(['draft', 'published', 'archived']).default('published'),
    content: s.mdx(),  // compiled MDX body
    metadata: s.metadata(),  // auto computes { readingTime, wordCount } 
}

const projects = defineCollection({
    name: 'Project',
    pattern: 'content/projects/**/*.mdx',
    schema: s.object({
        ...base,
        slug: s.slug('projects'),
        oneSentenceStory: s.string(),
        readCaseStudyUrl: s.string().optional(),
        stack: s.array(s.string()),
        projectStatus: s.enum(['shipped', 'building', 'paused']),
        startedFrom: s.string()  // the question that sparked it
    })
})

const articles = defineCollection({
    name: 'Article',
    pattern: 'content/articles/**/*.mdx',
    schema: s.object({
        ...base,
        slug: s.slug('articles'),
        series: s.string().optional()
    })
})

const learningNotes = defineCollection({
    name: 'LearningNote',
    pattern: 'content/learning/**/*.mdx',
    schema: s.object({
        ...base,
        slug: s.slug('learning'),
        currentQuestion: s.string(),
        stage: s.enum(['exploring', 'active', 'consolidating']),
        nextMilestone: s.string().optional()
    })
})

const experiments = defineCollection({
    name: 'Experiments',
    pattern: 'content/experiments/**.*mdx',
    schema: s.object({
        ...base,
        slug: s.slug('experiments'),
        hypothesis: s.string(),
        outcome: s.string().optional()
    })
})

const artifacts = defineCollection({
    name: 'Artifact',
    pattern: 'content/artifacts/**/*.mdx',
    schema: s.object({
        ...base,
        slug: s.slug('artifacts'),
        image: s.image(),
        context: s.string(),
        capturedAt: s.isodate()
    })
})

const books = defineCollection({
    name: 'Book',
    pattern: 'content/books/**/*.mdx',
    schema: s.object({
        ...base,
        slug: s.slug('books'),
        author: s.string(),
        readStatus: s.enum(['reading', 'finished', 'wishlist']),
        rating: s.number().min(1).max(5).optional()
    })
})

const ideas = defineCollection({
    name: 'Idea',
    pattern: 'content/ideas/**/*.mdx',
    schema: s.object({
        ...base,
        slug: s.slug('ideas'),
        hiddenQuestion: s.string()
    })
})

const timelineEvents = defineCollection({
    name: 'TimelineEvent',
    pattern: 'content/timeline/**/*.mdx',
    schema: s.object({
        ...base,
        slug: s.slug('timeline'),
        milestone: s.string(),
        autolinked: s.boolean().default(false)
    })
})

const topics = defineCollection({
    name: 'Topic',
    pattern: 'content/topics/**/*.mdx',
    schema: s.object({
        title: s.string(),
        slug: s.slug('topics'),
        overview: s.string(),
        content: s.mdx()
    })
})

export default defineConfig({
    root: '.',
    output: { data: '.velite', assets: 'public/static', base: '/static/'},
    collections: { projects, articles, learningNotes, experiments, artifacts, books, ideas, timelineEvents, topics}
})