import { experiments } from "#site/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: 'Experiments', description: 'Hypotheses, tried and tested.' }

export default function ExperimentsPage() {
    const sorted = [...experiments].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

    return (
        <Section>
            <Container>
                <h1 className="font-display text-h1 mb-48">Experiments</h1>
                <div className="flex flex-col gap-24">
                    {sorted.map((e) => (
                        <Link
                            key={e.slug}
                            href={`/experiments/${e.slug}`}
                            className="block p-24 rounded-(--radius-md) border border-border bg-surface hover:-translate-y-0.5 transition-transform duration-(--duration-standard)"
                        >
                            <h3 className="font-display text-h4">{e.title}</h3>
                            <p className="font-body text-body text-text-secondary mt-8">
                                {e.hypothesis}
                            </p>
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    )
}