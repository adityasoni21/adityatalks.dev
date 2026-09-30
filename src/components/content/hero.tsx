'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
  <section className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-border">
    <div aria-hidden className="studio-grid pointer-events-none absolute inset-0 opacity-60" />
    <div aria-hidden className="studio-glow absolute -right-32 top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
    <div aria-hidden className="absolute right-[22%] top-[22%] hidden h-64 w-64 rounded-full bg-cyan/10 blur-3xl lg:block" />

    <div aria-hidden className="studio-float pointer-events-none absolute right-[8%] top-[18%] hidden h-[30rem] w-[30rem] lg:block">
      <div className="absolute inset-12 rounded-full border border-accent/30 bg-accent/5 shadow-[0_0_100px_rgb(124_131_255/0.2)]" />
      <div className="absolute inset-24 rounded-full border border-cyan/30" />
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright shadow-[0_0_40px_var(--color-accent)]" />
      <div className="absolute left-[14%] top-[28%] h-3 w-3 rounded-full bg-cyan shadow-[0_0_24px_var(--color-cyan)]" />
      <div className="absolute right-[12%] top-[42%] h-3 w-3 rounded-full bg-pink shadow-[0_0_24px_var(--color-pink)]" />
      <div className="absolute bottom-[18%] left-[34%] h-3 w-3 rounded-full bg-accent-bright shadow-[0_0_24px_var(--color-accent)]" />
      <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full">
        <circle cx="240" cy="240" r="160" fill="none" stroke="rgb(167 170 255 / .22)" strokeDasharray="2 12" />
        <path d="M110 150 240 240 390 205M240 240 205 385" fill="none" stroke="rgb(124 131 255 / .35)" />
      </svg>
    </div>

    <Container width="showcase" className="relative z-10">
      <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <p className="mb-24 font-mono text-caption uppercase tracking-[0.2em] text-accent-bright">
            Researcher · Builder · Founder
          </p>
          <h1 className="max-w-3xl font-display text-hero leading-[1.05] mb-24">
            I build things I can&apos;t stop thinking about.
          </h1>
          <p className="max-w-2xl font-body text-body-lg text-text-secondary mb-8">
            I&apos;m Aditya — I go by SANS. This is where the questions, the experiments, and the
            things I actually ship live in one place, connected to each other instead of scattered
            across folders.
          </p>
          <p className="max-w-2xl font-body text-body-lg text-text-secondary mb-48">
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