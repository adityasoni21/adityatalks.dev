import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact', description: 'Get in touch.' }

export default function ContactPage() {
  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-24">Contact</h1>
        <p className="font-body text-body-lg text-text-secondary mb-16">
          The fastest way to reach me is email.
        </p>
        <a
          href="mailto:adityasonikrb@outlook.com"
          className="font-mono text-body text-accent hover:underline"
        >
          adityasonikrb@outlook.com
        </a>
      </Container>
    </Section>
  )
}