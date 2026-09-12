import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Impossible List', description: 'Goals that only make sense to write down before they seem realistic.' }

export default function ImpossiblePage() {
  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-16">Impossible List</h1>
        <p className="font-body text-body-lg text-text-secondary mb-48">
          Things I want to be true eventually, written down now so I can watch them stop sounding impossible.
        </p>
        <ul className="font-body text-body flex flex-col gap-16 list-none">
          <li>Build a vertically integrated technology company, not just a single product.</li>
          <li>Ship something with real, paying users that came out of Velocity&apos;s teaching engine.</li>
          <li>Get into an MS-by-Research program and actually do the research, not just clear the exam.</li>
        </ul>
      </Container>
    </Section>
  )
}