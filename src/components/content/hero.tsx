'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const nodes = [
  { slug: 'programming', label: 'Programming', x: '14%', y: '22%', tone: 'cyan', size: 'sm' },
  { slug: 'entrepreneurship', label: 'Building', x: '75%', y: '18%', tone: 'violet', size: 'lg' },
  { slug: 'quantum-computing', label: 'Quantum', x: '82%', y: '51%', tone: 'amber', size: 'md' },
  { slug: 'artificial-intelligence', label: 'AI', x: '22%', y: '70%', tone: 'pink', size: 'md' },
  { slug: 'productivity', label: 'Learning', x: '65%', y: '78%', tone: 'cyan', size: 'sm' },
  { slug: 'cybersecurity', label: 'Security', x: '36%', y: '11%', tone: 'violet', size: 'sm' },
] as const

const nodeToneClasses = {
  cyan: 'bg-cyan/20 border-cyan/70 text-cyan',
  violet: 'bg-accent/20 border-accent/70 text-accent',
  amber: 'bg-warning/20 border-warning/70 text-warning',
  pink: 'bg-pink/20 border-pink/70 text-pink',
} as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* THESIS: This homepage is a living map of one person's questions, not a portfolio grid.
          OWN-WORLD: Observatory black, editorial ivory, violet/cyan/amber signals, mono metadata,
          and thin relationship lines give the content a recognizable constellation grammar.
          STORY: Visitors meet Aditya, see the topics orbiting his work, and choose a path into them.
          FIRST VIEWPORT: Editorial introduction left; real topic constellation right; two actions below.
          FORM: Connected constellation, staged as an editorial knowledge map rather than a dashboard. */}
      <div aria-hidden className="studio-grid pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden className="absolute -right-48 top-0 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />

      <Container width="showcase" className="relative z-10 py-64 md:py-96 lg:py-128">
        <div className="grid items-center gap-48 lg:grid-cols-[0.9fr_1.1fr] lg:gap-64">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="max-w-2xl font-body text-[clamp(3.2rem,7vw,6rem)] leading-[0.94] tracking-[-0.035em]">
              I build things I can&apos;t stop <em className="text-accent-bright">thinking about.</em>
            </h1>
            <p className="mt-32 max-w-xl font-body text-body-lg leading-relaxed text-text-secondary">
              I&apos;m Aditya — I go by SANS. This is where the questions, experiments, and things I
              actually ship live in one place, connected to each other instead of scattered across folders.
            </p>
            <div className="mt-40 flex flex-wrap gap-16">
              <Button href="/projects" variant="primary">Explore my work</Button>
              <Button href="/now" variant="secondary">What I&apos;m curious about</Button>
            </div>
          </motion.div>

          <div className="constellation-shell relative mx-auto aspect-square w-full max-w-[620px]" aria-label="Topics connected to Aditya's work">
            <div aria-hidden className="absolute inset-[8%] rounded-full border border-accent/25 shadow-[0_0_80px_rgb(124_131_255/0.12)]" />
            <div aria-hidden className="absolute inset-[22%] rounded-full border border-cyan/20 border-dashed" />
            <svg aria-hidden viewBox="0 0 600 600" className="absolute inset-0 h-full w-full">
              <path d="M95 132 300 300 450 108M300 300 494 306M300 300 390 488M300 300 132 436M300 300 216 74" fill="none" stroke="rgb(124 131 255 / .34)" strokeWidth="1" />
              <path d="M95 132 132 436M450 108 494 306M216 74 390 488" fill="none" stroke="rgb(69 217 232 / .15)" strokeDasharray="4 10" />
            </svg>
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent-bright/70 bg-background shadow-[0_0_45px_rgb(124_131_255/0.38)]">
              <span className="font-mono text-small text-text-primary">SANS</span>
            </div>
            {nodes.map((node) => (
              <Link
                key={node.slug}
                href={`/topics/${node.slug}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left: node.x, top: node.y }}
              >
                <span className={`mx-auto mb-8 block rounded-full border shadow-[0_0_22px_currentColor] transition-transform duration-(--duration-standard) group-hover:scale-125 ${node.size === 'lg' ? 'h-16 w-16' : node.size === 'md' ? 'h-12 w-12' : 'h-8 w-8'} ${nodeToneClasses[node.tone]}`} />
                <span className="block whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary transition-colors group-hover:text-text-primary">
                  {node.label}
                </span>
              </Link>
            ))}
            <p className="absolute bottom-[2%] right-[6%] max-w-40 rotate-[-5deg] font-body text-small italic text-text-secondary">
              Different parts of my curiosity, all connected.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}