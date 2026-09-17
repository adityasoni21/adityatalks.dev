'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-[90vh] flex items-center border-b border-border overflow-hidden">
      {/* Signature Graphic System — minimal node-and-connection motif, decorative only */}
      <svg
        aria-hidden
        viewBox="0 0 800 600"
        className="absolute right-0 top-0 h-full w-1/2 opacity-[0.08] pointer-events-none hidden lg:block"
      >
        <g stroke="var(--color-accent)" strokeWidth="1" fill="none">
          <line x1="120" y1="140" x2="340" y2="220" />
          <line x1="340" y1="220" x2="560" y2="160" />
          <line x1="340" y1="220" x2="300" y2="420" />
          <line x1="300" y1="420" x2="520" y2="480" />
          <line x1="560" y1="160" x2="700" y2="300" />
        </g>
        <g fill="var(--color-accent)">
          <circle cx="120" cy="140" r="4" />
          <circle cx="340" cy="220" r="5" />
          <circle cx="560" cy="160" r="4" />
          <circle cx="300" cy="420" r="4" />
          <circle cx="520" cy="480" r="4" />
          <circle cx="700" cy="300" r="4" />
        </g>
      </svg>

      <Container width="reading">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <h1 className="font-display text-hero leading-[1.05] mb-24">
            I build things I can&apos;t stop thinking about.
          </h1>
          <p className="font-body text-body-lg text-text-secondary mb-8">
            I&apos;m Aditya — I go by SANS. This is where the questions, the experiments, and the
            things I actually ship live in one place, connected to each other instead of scattered
            across folders.
          </p>
          <p className="font-body text-body-lg text-text-secondary mb-48">
            Not a portfolio. A running record of what I&apos;m building, learning, and figuring out.
          </p>
          <div className="flex flex-wrap gap-16">
            <Button href="/projects" variant="primary">
              Explore My Work
            </Button>
            <Button href="/now" variant="secondary">
              What I&apos;m Curious About
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}