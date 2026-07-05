'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Scroll-driven shape wrapper ──
   Wraps each SVG shape in a <motion.g> that transforms based on
   scroll progress. The child shape keeps its idle floating animation,
   and the scroll transform is layered on top via the parent group.   */
function ScrollShape({
  progress,
  xRange,
  yRange,
  rotateRange = [0, 0],
  scaleRange = [1, 1],
  children,
}: {
  progress: MotionValue<number>
  xRange: [number, number]
  yRange: [number, number]
  rotateRange?: [number, number]
  scaleRange?: [number, number]
  children: React.ReactNode
}) {
  const x = useTransform(progress, [0, 1], xRange)
  const y = useTransform(progress, [0, 1], yRange)
  const rotate = useTransform(progress, [0, 1], rotateRange)
  const scale = useTransform(progress, [0, 1], scaleRange)

  return (
    <motion.g style={{ x, y, rotate, scale }}>
      {children}
    </motion.g>
  )
}

/* ─────────────────────────────────────────────────────────
   Concepts — Grid of pills & circles (Web3 building blocks)
   Scroll: shapes spread outward — top-row lifts, bottom sinks,
   left drifts left, right drifts right. Orange shapes scale up.
   ───────────────────────────────────────────────────────── */
export function ConceptsHeroGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="my-8"
    >
      <svg
        viewBox="-50 -40 900 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* ── Row 1 ── */}
        <ScrollShape progress={scrollYProgress} xRange={[20, -35]} yRange={[15, -25]} rotateRange={[3, -6]}>
          <motion.rect
            x="0" y="0" width="175" height="115" rx="57"
            fill="var(--foreground)"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-10, 15]} yRange={[18, -28]} rotateRange={[-2, 4]}>
          <motion.rect
            x="187" y="0" width="240" height="115" rx="57"
            fill="var(--foreground)"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-12, 22]} yRange={[12, -24]} rotateRange={[-10, 18]} scaleRange={[0.92, 1.14]}>
          <motion.circle
            cx="502" cy="57" r="57"
            fill="var(--accent)"
            animate={{ y: [0, -12, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-18, 40]} yRange={[14, -22]} rotateRange={[-3, 7]}>
          <motion.rect
            x="572" y="0" width="228" height="115" rx="57"
            fill="var(--foreground)"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        </ScrollShape>

        {/* ── Row 2 ── */}
        <ScrollShape progress={scrollYProgress} xRange={[25, -40]} yRange={[-18, 28]} rotateRange={[6, -14]} scaleRange={[0.94, 1.1]}>
          <motion.circle
            cx="57" cy="200" r="57"
            fill="var(--foreground)"
            animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[12, -18]} yRange={[-12, 22]} rotateRange={[2, -5]}>
          <motion.rect
            x="126" y="143" width="290" height="115" rx="57"
            fill="var(--foreground)"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-14, 25]} yRange={[-10, 30]} rotateRange={[-3, 6]} scaleRange={[0.96, 1.08]}>
          <motion.rect
            x="428" y="143" width="160" height="115" rx="57"
            fill="var(--accent)"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-22, 45]} yRange={[-15, 26]} rotateRange={[-4, 9]}>
          <motion.rect
            x="600" y="143" width="200" height="115" rx="57"
            fill="var(--foreground)"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
        </ScrollShape>
      </svg>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Prices — Flowing organic composition (market energy)
   Scroll: alternating wave — odd shapes drift left, even right,
   creating a horizontal S-curve as you scroll.
   ───────────────────────────────────────────────────────── */
export function PricesHeroGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="my-8"
    >
      <svg
        viewBox="-50 -40 900 330"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* ── Row 1 ── */}
        <ScrollShape progress={scrollYProgress} xRange={[20, -30]} yRange={[14, -20]} rotateRange={[4, -8]} scaleRange={[0.96, 1.06]}>
          <motion.circle
            cx="52" cy="52" r="52"
            fill="var(--foreground)"
            animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-8, 18]} yRange={[18, -22]} rotateRange={[-2, 3]}>
          <motion.rect
            x="116" y="0" width="340" height="104" rx="52"
            fill="var(--foreground)"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[10, -20]} yRange={[10, -26]} rotateRange={[-12, 20]} scaleRange={[0.9, 1.18]}>
          <motion.circle
            cx="522" cy="52" r="52"
            fill="var(--accent)"
            animate={{ y: [0, -14, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-15, 35]} yRange={[16, -18]} rotateRange={[2, -5]}>
          <motion.rect
            x="586" y="0" width="214" height="104" rx="52"
            fill="var(--foreground)"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
        </ScrollShape>

        {/* ── Row 2 ── */}
        <ScrollShape progress={scrollYProgress} xRange={[18, -35]} yRange={[-12, 24]} rotateRange={[-3, 7]} scaleRange={[0.95, 1.08]}>
          <motion.rect
            x="0" y="116" width="200" height="104" rx="52"
            fill="var(--accent)"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-12, 22]} yRange={[-15, 20]} rotateRange={[3, -6]}>
          <motion.rect
            x="212" y="116" width="160" height="104" rx="52"
            fill="var(--foreground)"
            animate={{ y: [0, -11, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[14, -18]} yRange={[-10, 26]} rotateRange={[-5, 10]} scaleRange={[0.94, 1.1]}>
          <motion.circle
            cx="436" cy="168" r="52"
            fill="var(--foreground)"
            animate={{ y: [0, -9, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-20, 40]} yRange={[-14, 22]} rotateRange={[2, -4]}>
          <motion.rect
            x="500" y="116" width="300" height="104" rx="52"
            fill="var(--foreground)"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </ScrollShape>

        {/* ── Row 3 — depth hints ── */}
        <ScrollShape progress={scrollYProgress} xRange={[10, -20]} yRange={[-6, 14]} rotateRange={[1, -2]}>
          <motion.rect
            x="0" y="232" width="280" height="40" rx="20"
            fill="var(--foreground)"
            opacity={0.15}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-5, 10]} yRange={[-4, 10]} scaleRange={[0.96, 1.06]}>
          <motion.rect
            x="292" y="232" width="180" height="40" rx="20"
            fill="var(--accent)"
            opacity={0.2}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-12, 25]} yRange={[-5, 12]} rotateRange={[-1, 3]}>
          <motion.rect
            x="484" y="232" width="316" height="40" rx="20"
            fill="var(--foreground)"
            opacity={0.15}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </ScrollShape>
      </svg>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Simulator — Block-chain grid (connected blocks)
   Scroll: blocks pull apart horizontally (chain stretching),
   chain-link connectors scale up as the gap widens.
   ───────────────────────────────────────────────────────── */
export function SimulatorHeroGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="my-8"
    >
      <svg
        viewBox="-50 -40 900 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* ── Row 1 — blocks pulling apart with chain links ── */}
        <ScrollShape progress={scrollYProgress} xRange={[25, -40]} yRange={[10, -16]} rotateRange={[3, -5]}>
          <motion.rect
            x="0" y="0" width="155" height="115" rx="28"
            fill="var(--foreground)"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </ScrollShape>

        {/* Chain link 1 — stretches as blocks separate */}
        <ScrollShape progress={scrollYProgress} xRange={[12, -8]} yRange={[10, -16]} scaleRange={[0.8, 1.4]}>
          <motion.rect
            x="163" y="45" width="24" height="25" rx="6"
            fill="var(--accent)"
            animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[8, -12]} yRange={[14, -22]} rotateRange={[-2, 3]}>
          <motion.rect
            x="195" y="0" width="220" height="115" rx="28"
            fill="var(--foreground)"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </ScrollShape>

        {/* Chain link 2 */}
        <ScrollShape progress={scrollYProgress} xRange={[-2, 8]} yRange={[14, -22]} scaleRange={[0.8, 1.4]}>
          <motion.rect
            x="423" y="45" width="24" height="25" rx="6"
            fill="var(--accent)"
            animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-10, 20]} yRange={[12, -24]} rotateRange={[-8, 14]} scaleRange={[0.94, 1.1]}>
          <motion.rect
            x="455" y="0" width="155" height="115" rx="28"
            fill="var(--accent)"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </ScrollShape>

        {/* Chain link 3 */}
        <ScrollShape progress={scrollYProgress} xRange={[-8, 18]} yRange={[12, -24]} scaleRange={[0.8, 1.4]}>
          <motion.rect
            x="618" y="45" width="24" height="25" rx="6"
            fill="var(--accent)"
            animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-20, 45]} yRange={[10, -18]} rotateRange={[-3, 8]}>
          <motion.rect
            x="650" y="0" width="150" height="115" rx="28"
            fill="var(--foreground)"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
        </ScrollShape>

        {/* ── Row 2 — wider blocks ── */}
        <ScrollShape progress={scrollYProgress} xRange={[22, -38]} yRange={[-16, 28]} rotateRange={[4, -8]}>
          <motion.rect
            x="0" y="143" width="250" height="115" rx="28"
            fill="var(--foreground)"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[10, -15]} yRange={[-12, 24]} rotateRange={[-10, 16]} scaleRange={[0.92, 1.14]}>
          <motion.circle
            cx="318" cy="200" r="57"
            fill="var(--accent)"
            animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-14, 28]} yRange={[-14, 22]} rotateRange={[2, -5]}>
          <motion.rect
            x="387" y="143" width="200" height="115" rx="28"
            fill="var(--foreground)"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-22, 42]} yRange={[-12, 26]} rotateRange={[-4, 10]}>
          <motion.rect
            x="599" y="143" width="201" height="115" rx="28"
            fill="var(--foreground)"
            animate={{ y: [0, -11, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </ScrollShape>
      </svg>
    </motion.div>
  )
}
