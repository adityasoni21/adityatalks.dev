import { articles, books, experiments, ideas, learningNotes, projects, topics } from '#site/content'
import type { MetadataRoute } from 'next'

const baseUrl = 'https://adityatalks.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/books', '/contact', '/experiments', '/ideas', '/impossible', '/learning', '/now', '/projects', '/search', '/timeline', '/topics', '/uses', '/writing']
  const contentRoutes: { path: string; updated?: string }[] = [
    ...projects.map((item) => ({ path: `/projects/${item.slug}`, updated: item.updated ?? item.published })),
    ...articles.map((item) => ({ path: `/writing/${item.slug}`, updated: item.updated ?? item.published })),
    ...learningNotes.map((item) => ({ path: `/learning/${item.slug}`, updated: item.updated ?? item.published })),
    ...ideas.map((item) => ({ path: `/ideas/${item.slug}`, updated: item.updated ?? item.published })),
    ...books.map((item) => ({ path: `/books/${item.slug}`, updated: item.updated ?? item.published })),
    ...experiments.map((item) => ({ path: `/experiments/${item.slug}`, updated: item.updated ?? item.published })),
    ...topics.map((item) => ({ path: `/topics/${item.slug}` })),
  ]

  return [
    ...staticRoutes.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: 'monthly' as const })),
    ...contentRoutes.map((item) => ({
      url: `${baseUrl}${item.path}`,
      changeFrequency: 'yearly' as const,
      ...(item.updated ? { lastModified: new Date(item.updated) } : {}),
    })),
  ]
}
