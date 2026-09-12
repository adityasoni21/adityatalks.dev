import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Now', description: 'What I am actually doing right now.' }

export default function NowPage() {
  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-8">Now</h1>
        <p className="font-body text-small text-text-secondary mb-48">
          Updated whenever something actually changes — not on a schedule.
        </p>

        <ul className="flex flex-col gap-24 font-body text-body">
          <li>Rebuilding Velocity properly with a co-founder — currently on the skill-graph rebuild.</li>
          <li>Starting GATE CS prep from scratch, working through core theory before any timed practice.</li>
          <li>Building this site — you&apos;re looking at the result of that in progress.</li>
        </ul>
      </Container>
    </Section>
  )
}