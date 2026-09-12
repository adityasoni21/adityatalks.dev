import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Uses', description: 'The tools I actually work in.' }

const stack = [
  { category: 'Environment', items: ['WSL / Ubuntu on Windows', 'VS Code'] },
  { category: 'This site', items: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Velite'] },
  { category: 'Velocity', items: ['FastAPI', 'Supabase (Postgres + pgvector)', 'Next.js 15', 'Clerk'] },
]

export default function UsesPage() {
  return (
    <Section>
      <Container width="reading">
        <h1 className="font-display text-h1 mb-48">Uses</h1>
        <div className="flex flex-col gap-32">
          {stack.map((group) => (
            <div key={group.category}>
              <h2 className="font-display text-h4 mb-8 text-accent">
                {group.category}
              </h2>
              <ul className="font-mono text-small text-text-secondary flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}