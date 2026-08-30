import { projects } from "#site/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TopicPill } from "@/components/content/topic-pill";
import { renderMDX } from "../../../lib/mdx-components";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug }  = await params
    const project = projects.find((p) => p.slug == slug)
    if (!project) return {}
    return {
        title: project.title,
        description: project.description,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: { title: project.title, description: project.description, type: 'article' }
    }
}

export default async function ProjectPage({
    params,
}: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = projects.find((p)=> p.slug == slug)
    if (!project) notFound()

    const body = await renderMDX(project.content)

    return (
        <Section>
            <Container width="reading">
                <p className="font-mono text-caption text-accent mb-16">
                    {project.startedFrom}
                </p>
                <h1 className="font-display text-h1 mb-16">{project.title}</h1>
                <p className="font-body text-body-lg text-text-secondary mb-24">
                    {project.oneSentenceStory}
                </p>
                <div className="flex flex-wrap gap-8 mb-16">
                    {project.topics.map((t) => (
                        <TopicPill key={t} slug={t} label={t} />
                    ))}
                </div>
                <div className="flex flex-wrap gap-8 mb-48 text-caption text-text-secondary">
                    {project.stack.map((tech) => (
                        <span key={tech} className="font-mono px-8 py-4 border border-border rounded-(--radius-sm) ">
                            {tech}
                        </span>
                    ))}
                </div>
                <article className="prose-content font-body text-body">{body}</article>
            </Container>
        </Section>
    )
}