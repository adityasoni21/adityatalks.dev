import { projects } from "#site/content";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Products, experiments, and software I have built.'
}

export default function ProjectsPage() {
    const sorted = [...projects].sort(
        (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
    )

    return (
        <Section>
            <Container>
                <h1 className="font-display text-h1 mb-48">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                    {sorted.map((p, i) => (
                        <ProjectCard
                            key={p.slug}
                            number={i+1}
                            slug={p.slug}
                            title={p.title}
                            oneSentenceStory={p.oneSentenceStory}
                            topics={p.topics}
                            projectStatus={p.projectStatus}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    )
}