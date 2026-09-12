import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Researcher, builder, founder — and why this site exists.',
}

export default function AboutPage() {
  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-24">About</h1>

        <div className="prose-content font-body text-body flex flex-col gap-24">
          <p>
            I&apos;m Aditya — I go by SANS. I&apos;m a student at Hansraj College, and most of my time outside
            classes goes into building things I&apos;d want to use myself: Velocity, a DSA learning
            platform I&apos;m rebuilding properly with a co-founder; this site; and whatever question
            happens to be occupying me at the moment.
          </p>
          <p>
            I think about my work through three lenses — researcher, builder, founder — not because
            it sounds good, but because that&apos;s genuinely how ideas move through my head. A question
            turns into a learning note, the learning note turns into an experiment, and if the
            experiment holds up, it turns into something I ship.
          </p>
          <p>
            Long-term, I want to build a real, vertically integrated technology company — one that
            ships products people actually pay for, not just a research lab. Velocity is the first
            concrete piece of that. I&apos;m also preparing for GATE CS, aiming at MS-by-Research programs,
            because I want the theoretical foundation to be as solid as the shipping instinct.
          </p>
          <p>
            This site exists because I got tired of portfolios that show the finished thing and hide
            the actual process. Everything here — projects, writing, learning notes, even the
            half-formed ideas — is meant to show the process, not just the result.
          </p>
        </div>
      </Container>
    </Section>
  )
}