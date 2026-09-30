import { articles, books, experiments, ideas, learningNotes, projects, topics } from '#site/content'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'
import { SearchResults } from './search-results'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search projects, writing, learning notes, and ideas.',
}

export default function SearchPage() {
  const items = [
    ...projects.map((item) => ({ title: item.title, description: item.description, href: `/projects/${item.slug}`, type: 'Project' })),
    ...articles.map((item) => ({ title: item.title, description: item.description, href: `/writing/${item.slug}`, type: 'Writing' })),
    ...learningNotes.map((item) => ({ title: item.title, description: item.description, href: `/learning/${item.slug}`, type: 'Learning' })),
    ...ideas.map((item) => ({ title: item.title, description: item.description, href: `/ideas/${item.slug}`, type: 'Idea' })),
    ...books.map((item) => ({ title: item.title, description: item.description, href: `/books/${item.slug}`, type: 'Book' })),
    ...experiments.map((item) => ({ title: item.title, description: item.description, href: `/experiments/${item.slug}`, type: 'Experiment' })),
    ...topics.map((item) => ({ title: item.title, description: item.overview, href: `/topics/${item.slug}`, type: 'Topic' })),
  ]

  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-16">Search</h1>
        <p className="font-body text-body-lg text-text-secondary mb-32">
          Find something across the work, writing, and questions collected here.
        </p>
        <SearchResults items={items} />
      </Container>
    </Section>
  )
}
