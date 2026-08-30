// src/app/page.tsx — temporary, replaced properly in the homepage step
import { projects } from '#site/content'
import { ProjectCard } from '@/components/cards/project-card'
import { Container } from '@/components/ui/container'

export default function Home() {
  return (
    <Container className="py-64">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            number={i + 1}
            slug={p.slug}
            title={p.title}
            oneSentenceStory={p.oneSentenceStory}
            topics={p.topics}
            projectStatus={p.projectStatus}
          />
        ))}
      </div>
    </Container>
  )
}