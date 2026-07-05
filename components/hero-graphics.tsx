'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* ─────────────────────────────────────────────────────────
   Concepts — Grid of pills & circles (Web3 building blocks)
   Inspired by the bold rounded-rectangle grid reference.
   ───────────────────────────────────────────────────────── */
export function ConceptsHeroGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="my-8"
    >
      <svg
        viewBox="-5 -15 810 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Row 1 */}
        <motion.rect
          x="0" y="0" width="175" height="115" rx="57"
          fill="var(--foreground)"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.rect
          x="187" y="0" width="240" height="115" rx="57"
          fill="var(--foreground)"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.circle
          cx="502" cy="57" r="57"
          fill="var(--accent)"
          animate={{ y: [0, -12, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        <motion.rect
          x="572" y="0" width="228" height="115" rx="57"
          fill="var(--foreground)"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />

        {/* Row 2 */}
        <motion.circle
          cx="57" cy="200" r="57"
          fill="var(--foreground)"
          animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.rect
          x="126" y="143" width="290" height="115" rx="57"
          fill="var(--foreground)"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.rect
          x="428" y="143" width="160" height="115" rx="57"
          fill="var(--accent)"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.rect
          x="600" y="143" width="200" height="115" rx="57"
          fill="var(--foreground)"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />
      </svg>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Prices — Flowing organic composition (market energy)
   More horizontal, wave-like rhythm with varied sizes.
   ───────────────────────────────────────────────────────── */
export function PricesHeroGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="my-8"
    >
      <svg
        viewBox="-5 -15 810 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Row 1 */}
        <motion.circle
          cx="52" cy="52" r="52"
          fill="var(--foreground)"
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.rect
          x="116" y="0" width="340" height="104" rx="52"
          fill="var(--foreground)"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.circle
          cx="522" cy="52" r="52"
          fill="var(--accent)"
          animate={{ y: [0, -14, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.rect
          x="586" y="0" width="214" height="104" rx="52"
          fill="var(--foreground)"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />

        {/* Row 2 */}
        <motion.rect
          x="0" y="116" width="200" height="104" rx="52"
          fill="var(--accent)"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        <motion.rect
          x="212" y="116" width="160" height="104" rx="52"
          fill="var(--foreground)"
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.circle
          cx="436" cy="168" r="52"
          fill="var(--foreground)"
          animate={{ y: [0, -9, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        />
        <motion.rect
          x="500" y="116" width="300" height="104" rx="52"
          fill="var(--foreground)"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Row 3 — partial, gives depth */}
        <motion.rect
          x="0" y="232" width="280" height="40" rx="20"
          fill="var(--foreground)"
          opacity={0.15}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        <motion.rect
          x="292" y="232" width="180" height="40" rx="20"
          fill="var(--accent)"
          opacity={0.2}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.rect
          x="484" y="232" width="316" height="40" rx="20"
          fill="var(--foreground)"
          opacity={0.15}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </svg>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Simulator — Block-chain grid (connected blocks)
   Lower border-radius for a more mechanical / block feel.
   ───────────────────────────────────────────────────────── */
export function SimulatorHeroGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="my-8"
    >
      <svg
        viewBox="-5 -15 810 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Row 1 — blocks with chain links */}
        <motion.rect
          x="0" y="0" width="155" height="115" rx="28"
          fill="var(--foreground)"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Chain link */}
        <motion.rect
          x="163" y="45" width="24" height="25" rx="6"
          fill="var(--accent)"
          animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        />
        <motion.rect
          x="195" y="0" width="220" height="115" rx="28"
          fill="var(--foreground)"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        {/* Chain link */}
        <motion.rect
          x="423" y="45" width="24" height="25" rx="6"
          fill="var(--accent)"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.rect
          x="455" y="0" width="155" height="115" rx="28"
          fill="var(--accent)"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        {/* Chain link */}
        <motion.rect
          x="618" y="45" width="24" height="25" rx="6"
          fill="var(--accent)"
          animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.rect
          x="650" y="0" width="150" height="115" rx="28"
          fill="var(--foreground)"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />

        {/* Row 2 — wider blocks */}
        <motion.rect
          x="0" y="143" width="250" height="115" rx="28"
          fill="var(--foreground)"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.circle
          cx="318" cy="200" r="57"
          fill="var(--accent)"
          animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.rect
          x="387" y="143" width="200" height="115" rx="28"
          fill="var(--foreground)"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        <motion.rect
          x="599" y="143" width="201" height="115" rx="28"
          fill="var(--foreground)"
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>
    </motion.div>
  )
}
