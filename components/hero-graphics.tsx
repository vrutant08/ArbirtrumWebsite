'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Scroll-driven shape wrapper ──
   Wraps each SVG shape in a <motion.g> that transforms based on
   scroll progress. The child shape keeps its idle floating and hover animations,
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

/* ── Interactive SVG Rect Component ──
   Wraps standard rect mouse events in state and separates infinite floating y-transforms 
   from state-driven hover color swaps and scaling. */
function InteractiveRect({
  x, y, width, height, rx,
  fill,
  isAccent = false,
  yOffset,
  duration,
  delay = 0,
  opacity = 1,
}: {
  x: string | number
  y: string | number
  width: string | number
  height: string | number
  rx: string | number
  fill: string
  isAccent?: boolean
  yOffset: number
  duration: number
  delay?: number
  opacity?: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      opacity={opacity}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transformOrigin: 'center', cursor: 'pointer' }}
      className={isAccent 
        ? "fill-[var(--accent)] hover:fill-[var(--foreground)] transition-colors duration-300" 
        : "fill-[var(--foreground)] hover:fill-[var(--accent)] transition-colors duration-300"
      }
      animate={{
        y: [0, yOffset, 0],
        scale: hovered ? 1.08 : 1,
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: 'easeInOut', delay },
        scale: { duration: 0.25, type: 'spring', stiffness: 350, damping: 15 },
      }}
    />
  )
}

/* ── Interactive SVG Circle Component ── */
function InteractiveCircle({
  cx, cy, r,
  fill,
  isAccent = false,
  yOffset,
  duration,
  delay = 0,
  scaleAnimate = false,
  scaleAmplitude = 1.06,
}: {
  cx: string | number
  cy: string | number
  r: string | number
  fill: string
  isAccent?: boolean
  yOffset: number
  duration: number
  delay?: number
  scaleAnimate?: boolean
  scaleAmplitude?: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transformOrigin: 'center', cursor: 'pointer' }}
      className={isAccent 
        ? "fill-[var(--accent)] hover:fill-[var(--foreground)] transition-colors duration-300" 
        : "fill-[var(--foreground)] hover:fill-[var(--accent)] transition-colors duration-300"
      }
      animate={{
        y: [0, yOffset, 0],
        scale: scaleAnimate 
          ? (hovered ? 1.08 : [1, scaleAmplitude, 1]) 
          : (hovered ? 1.08 : 1),
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: 'easeInOut', delay },
        scale: scaleAnimate && !hovered
          ? { duration: duration, repeat: Infinity, ease: 'easeInOut', delay }
          : { duration: 0.25, type: 'spring', stiffness: 350, damping: 15 },
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────
   Concepts — Grid of pills & circles (Web3 building blocks)
   Scroll: shapes spread outward — top-row lifts, bottom sinks,
   left drifts left, right drifts right. Orange shapes scale up.
   Interactive hover: shapes react to cursor hover with color-swap + scale.
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
          <InteractiveRect
            x="0" y="0" width="175" height="115" rx="57"
            fill="var(--foreground)"
            yOffset={-10}
            duration={5}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-10, 15]} yRange={[18, -28]} rotateRange={[-2, 4]}>
          <InteractiveRect
            x="187" y="0" width="240" height="115" rx="57"
            fill="var(--foreground)"
            yOffset={-8}
            duration={5.5}
            delay={0.5}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-12, 22]} yRange={[12, -24]} rotateRange={[-10, 18]} scaleRange={[0.92, 1.14]}>
          <InteractiveCircle
            cx="502" cy="57" r="57"
            fill="var(--accent)"
            isAccent
            yOffset={-12}
            duration={4}
            delay={0.3}
            scaleAnimate
            scaleAmplitude={1.06}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-18, 40]} yRange={[14, -22]} rotateRange={[-3, 7]}>
          <InteractiveRect
            x="572" y="0" width="228" height="115" rx="57"
            fill="var(--foreground)"
            yOffset={-6}
            duration={6}
            delay={0.8}
          />
        </ScrollShape>

        {/* ── Row 2 ── */}
        <ScrollShape progress={scrollYProgress} xRange={[25, -40]} yRange={[-18, 28]} rotateRange={[6, -14]} scaleRange={[0.94, 1.1]}>
          <InteractiveCircle
            cx="57" cy="200" r="57"
            fill="var(--foreground)"
            yOffset={-8}
            duration={5}
            delay={0.4}
            scaleAnimate
            scaleAmplitude={1.04}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[12, -18]} yRange={[-12, 22]} rotateRange={[2, -5]}>
          <InteractiveRect
            x="126" y="143" width="290" height="115" rx="57"
            fill="var(--foreground)"
            yOffset={-10}
            duration={5.5}
            delay={0.6}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-14, 25]} yRange={[-10, 30]} rotateRange={[-3, 6]} scaleRange={[0.96, 1.08]}>
          <InteractiveRect
            x="428" y="143" width="160" height="115" rx="57"
            fill="var(--accent)"
            isAccent
            yOffset={-7}
            duration={4.5}
            delay={0.2}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-22, 45]} yRange={[-15, 26]} rotateRange={[-4, 9]}>
          <InteractiveRect
            x="600" y="143" width="200" height="115" rx="57"
            fill="var(--foreground)"
            yOffset={-9}
            duration={5}
            delay={0.7}
          />
        </ScrollShape>
      </svg>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Prices — Flowing organic composition (market energy)
   Scroll: alternating wave — odd shapes drift left, even right.
   Interactive hover: shapes react to cursor hover with color-swap + scale.
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
          <InteractiveCircle
            cx="52" cy="52" r="52"
            fill="var(--foreground)"
            yOffset={-10}
            duration={4.5}
            scaleAnimate
            scaleAmplitude={1.05}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-8, 18]} yRange={[18, -22]} rotateRange={[-2, 3]}>
          <InteractiveRect
            x="116" y="0" width="340" height="104" rx="52"
            fill="var(--foreground)"
            yOffset={-7}
            duration={5.5}
            delay={0.4}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[10, -20]} yRange={[10, -26]} rotateRange={[-12, 20]} scaleRange={[0.9, 1.18]}>
          <InteractiveCircle
            cx="522" cy="52" r="52"
            fill="var(--accent)"
            isAccent
            yOffset={-14}
            duration={3.5}
            delay={0.2}
            scaleAnimate
            scaleAmplitude={1.08}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-15, 35]} yRange={[16, -18]} rotateRange={[2, -5]}>
          <InteractiveRect
            x="586" y="0" width="214" height="104" rx="52"
            fill="var(--foreground)"
            yOffset={-6}
            duration={6}
            delay={0.7}
          />
        </ScrollShape>

        {/* ── Row 2 ── */}
        <ScrollShape progress={scrollYProgress} xRange={[18, -35]} yRange={[-12, 24]} rotateRange={[-3, 7]} scaleRange={[0.95, 1.08]}>
          <InteractiveRect
            x="0" y="116" width="200" height="104" rx="52"
            fill="var(--accent)"
            isAccent
            yOffset={-8}
            duration={5}
            delay={0.3}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-12, 22]} yRange={[-15, 20]} rotateRange={[3, -6]}>
          <InteractiveRect
            x="212" y="116" width="160" height="104" rx="52"
            fill="var(--foreground)"
            yOffset={-11}
            duration={4.5}
            delay={0.6}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[14, -18]} yRange={[-10, 26]} rotateRange={[-5, 10]} scaleRange={[0.94, 1.1]}>
          <InteractiveCircle
            cx="436" cy="168" r="52"
            fill="var(--foreground)"
            yOffset={-9}
            duration={5.5}
            delay={0.1}
            scaleAnimate
            scaleAmplitude={1.04}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-20, 40]} yRange={[-14, 22]} rotateRange={[2, -4]}>
          <InteractiveRect
            x="500" y="116" width="300" height="104" rx="52"
            fill="var(--foreground)"
            yOffset={-7}
            duration={5}
            delay={0.5}
          />
        </ScrollShape>

        {/* ── Row 3 — depth hints ── */}
        <ScrollShape progress={scrollYProgress} xRange={[10, -20]} yRange={[-6, 14]} rotateRange={[1, -2]}>
          <InteractiveRect
            x="0" y="232" width="280" height="40" rx="20"
            fill="var(--foreground)"
            opacity={0.15}
            yOffset={-4}
            duration={6}
            delay={0.8}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-5, 10]} yRange={[-4, 10]} scaleRange={[0.96, 1.06]}>
          <InteractiveRect
            x="292" y="232" width="180" height="40" rx="20"
            fill="var(--accent)"
            isAccent
            opacity={0.2}
            yOffset={-3}
            duration={5}
            delay={0.4}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-12, 25]} yRange={[-5, 12]} rotateRange={[-1, 3]}>
          <InteractiveRect
            x="484" y="232" width="316" height="40" rx="20"
            fill="var(--foreground)"
            opacity={0.15}
            yOffset={-5}
            duration={5.5}
            delay={0.6}
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
   Interactive hover: shapes react to cursor hover with color-swap + scale.
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
          <InteractiveRect
            x="0" y="0" width="155" height="115" rx="28"
            fill="var(--foreground)"
            yOffset={-8}
            duration={5}
          />
        </ScrollShape>

        {/* Chain link 1 */}
        <ScrollShape progress={scrollYProgress} xRange={[12, -8]} yRange={[10, -16]} scaleRange={[0.8, 1.4]}>
          <InteractiveRect
            x="163" y="45" width="24" height="25" rx="6"
            fill="var(--accent)"
            isAccent
            yOffset={-8}
            duration={5}
            delay={0.1}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[8, -12]} yRange={[14, -22]} rotateRange={[-2, 3]}>
          <InteractiveRect
            x="195" y="0" width="220" height="115" rx="28"
            fill="var(--foreground)"
            yOffset={-10}
            duration={5.5}
            delay={0.4}
          />
        </ScrollShape>

        {/* Chain link 2 */}
        <ScrollShape progress={scrollYProgress} xRange={[-2, 8]} yRange={[14, -22]} scaleRange={[0.8, 1.4]}>
          <InteractiveRect
            x="423" y="45" width="24" height="25" rx="6"
            fill="var(--accent)"
            isAccent
            yOffset={-10}
            duration={5.5}
            delay={0.5}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-10, 20]} yRange={[12, -24]} rotateRange={[-8, 14]} scaleRange={[0.94, 1.1]}>
          <InteractiveRect
            x="455" y="0" width="155" height="115" rx="28"
            fill="var(--accent)"
            isAccent
            yOffset={-12}
            duration={4}
            delay={0.3}
          />
        </ScrollShape>

        {/* Chain link 3 */}
        <ScrollShape progress={scrollYProgress} xRange={[-8, 18]} yRange={[12, -24]} scaleRange={[0.8, 1.4]}>
          <InteractiveRect
            x="618" y="45" width="24" height="25" rx="6"
            fill="var(--accent)"
            isAccent
            yOffset={-12}
            duration={4}
            delay={0.4}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-20, 45]} yRange={[10, -18]} rotateRange={[-3, 8]}>
          <InteractiveRect
            x="650" y="0" width="150" height="115" rx="28"
            fill="var(--foreground)"
            yOffset={-6}
            duration={6}
            delay={0.7}
          />
        </ScrollShape>

        {/* ── Row 2 ── */}
        <ScrollShape progress={scrollYProgress} xRange={[22, -38]} yRange={[-16, 28]} rotateRange={[4, -8]}>
          <InteractiveRect
            x="0" y="143" width="250" height="115" rx="28"
            fill="var(--foreground)"
            yOffset={-9}
            duration={5}
            delay={0.5}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[10, -15]} yRange={[-12, 24]} rotateRange={[-10, 16]} scaleRange={[0.92, 1.14]}>
          <InteractiveCircle
            cx="318" cy="200" r="57"
            fill="var(--accent)"
            isAccent
            yOffset={-10}
            duration={4.5}
            delay={0.2}
            scaleAnimate
            scaleAmplitude={1.06}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-14, 28]} yRange={[-14, 22]} rotateRange={[2, -5]}>
          <InteractiveRect
            x="387" y="143" width="200" height="115" rx="28"
            fill="var(--foreground)"
            yOffset={-7}
            duration={5.5}
            delay={0.8}
          />
        </ScrollShape>

        <ScrollShape progress={scrollYProgress} xRange={[-22, 42]} yRange={[-12, 26]} rotateRange={[-4, 10]}>
          <InteractiveRect
            x="599" y="143" width="201" height="115" rx="28"
            fill="var(--foreground)"
            yOffset={-11}
            duration={4.5}
            delay={0.3}
          />
        </ScrollShape>
      </svg>
    </motion.div>
  )
}
