'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Magnetic } from '@/components/motion'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  return (
    <section ref={ref} className="relative border-b">
      <div className="mx-auto max-w-[1400px] px-5 pt-14 md:px-8 md:pt-20">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-6 flex flex-wrap items-center gap-2"
        >
          {['Layer 2', 'Optimistic Rollups', 'Ethereum'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-label text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Massive headline */}
        <motion.div style={{ y: titleY }} className="relative z-10">
          <h1 className="text-mega">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              >
                Scaling
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block pl-[8vw]"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.22 }}
              >
                Ethereum<span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Sub row */}
        <div className="relative z-10 mt-8 flex flex-col justify-between gap-6 pb-10 md:mt-10 md:flex-row md:items-end md:pb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="max-w-md text-pretty leading-relaxed text-muted-foreground"
          >
            An educational deep-dive into Arbitrum and Layer 2 — why Ethereum
            needed to scale, how rollups work, and what it means for the next
            generation of the web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
            className="flex items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/concepts"
                className="btn-wipe inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors"
              >
                Explore concepts
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/simulator"
                className="btn-wipe inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-medium text-foreground transition-colors"
              >
                Mine a block ↗
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Hero image with parallax */}
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
          className="img-zoom relative aspect-[16/8] overflow-hidden border"
        >
          <motion.img
            src="/images/hero-layers.png"
            alt="Abstract illustration of stacked black layers on an orange background, representing blockchain layers"
            className="h-[120%] w-full object-cover"
            style={{ y: imgY }}
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-background px-3 py-1 text-label">
            Fig. 01 — Layers of trust
          </span>
        </motion.div>
      </div>
    </section>
  )
}
