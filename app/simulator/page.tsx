import type { Metadata } from 'next'
import { RevealLines, FadeUp, StaggerGrid, StaggerItem } from '@/components/motion'
import { BlockChain } from '@/components/simulator/block-chain'

export const metadata: Metadata = {
  title: 'Block Simulator — Layered',
  description:
    'An interactive block mining simulator demonstrating hashing, nonces, proof-of-work, and chain immutability using SHA-256.',
}

const STEPS = [
  {
    index: '01',
    title: 'Hash',
    body: 'Every block has a unique fingerprint — a SHA-256 hash of its index, previous hash, data, and nonce. Change anything, and the fingerprint changes completely.',
  },
  {
    index: '02',
    title: 'Mine',
    body: 'Mining means trying nonce after nonce until the hash starts with "00" — simulated proof-of-work. Press Mine and watch the attempts tick up.',
  },
  {
    index: '03',
    title: 'Break the chain',
    body: "Block #2 stores Block #1's hash. Edit Block #1's data after mining both — Block #2 instantly turns invalid. That is immutability in action.",
  },
]

export default function SimulatorPage() {
  return (
    <main>
      <section className="border-b">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <FadeUp>
            <span className="rounded-full border px-3 py-1 text-label text-muted-foreground">
              04 — Interactive
            </span>
          </FadeUp>
          <RevealLines
            as="h1"
            className="text-mega mt-6"
            lines={['Block', 'Simulator']}
          />
          <FadeUp delay={0.25}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
              Hashing, nonces, and chain immutability — made tangible. Mine
              both blocks, then tamper with Block #1 and watch the chain break.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b">
        <StaggerGrid className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <StaggerItem
              key={step.index}
              className={`flex flex-col gap-3 p-6 md:p-8 ${
                i < STEPS.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
              }`}
            >
              <span className="text-label text-accent">{step.index}</span>
              <h2 className="text-display text-2xl uppercase">{step.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* The simulator */}
      <section>
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <BlockChain />

          <FadeUp delay={0.2} className="mt-8">
            <div className="flex items-center gap-3 border p-4">
              <span className="rounded-full bg-foreground px-3 py-1 text-label text-background">
                The core insight
              </span>
              <p className="text-sm text-muted-foreground">
                Changing data in Block #1 rewrites its hash — which breaks
                Block #2&apos;s link. To forge a chain, you&apos;d have to
                re-mine every block after it.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}
