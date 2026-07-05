import type { Metadata } from 'next'
import { RevealLines, FadeUp, StaggerGrid, StaggerItem } from '@/components/motion'
import { BlockChain } from '@/components/simulator/block-chain'
import { SimulatorHeroGraphic } from '@/components/hero-graphics'

export const metadata: Metadata = {
  title: 'Block Simulator — Layered',
  description:
    'An interactive block mining simulator demonstrating hashing, nonces, proof-of-work, and chain immutability using SHA-256.',
}

const SIM_TAGS = [
  'SHA-256',
  'Nonce',
  'Proof of Work',
  'Immutability',
  'Mining',
  'Tamper-proof',
  'Stylus / WASM',
  'Rust',
]

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
      <section className="relative overflow-hidden border-b">
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <FadeUp>
            <span className="rounded-full border bg-background px-3 py-1 text-label text-muted-foreground">
              04 — Interactive
            </span>
          </FadeUp>

          {/* Keyword tags */}
          <FadeUp delay={0.15} className="mt-8 flex flex-wrap gap-2">
            {SIM_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-background px-3 py-1 text-label text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </FadeUp>

          {/* Animated geometric graphic */}
          <SimulatorHeroGraphic />

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

          {/* Seminar highlight strip */}
          <FadeUp delay={0.35} className="mt-10">
            <div className="flex flex-wrap items-start gap-6 border-t pt-8">
              <div className="flex-1 min-w-[200px]">
                <span className="text-label text-accent">Blockchain internals</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A <span className="font-medium text-foreground">block</span> holds data, its own 
                  <span className="font-medium text-foreground"> hash</span> (fingerprint), and a 
                  <span className="font-medium text-foreground"> nonce</span> — the special number found 
                  through trial-and-error mining so the hash starts with specific zeros.
                </p>
              </div>
              <div className="flex-1 min-w-[200px]">
                <span className="text-label text-accent">Arbitrum Stylus</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Beyond Solidity, <span className="font-medium text-foreground">Stylus</span> lets you write smart contracts 
                  in <span className="font-medium text-foreground">Rust, C, and C++</span> that compile to 
                  <span className="font-medium text-foreground"> WebAssembly</span> — 10–100× faster execution and drastically 
                  lower memory costs on-chain.
                </p>
              </div>
              <div className="flex-1 min-w-[200px]">
                <span className="text-label text-accent">Why Rust?</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Memory safety without garbage collection.</span> Prevents 
                  null pointer bugs at compile time. Blazing fast C/C++-level performance — 
                  the language of choice for next-gen smart contracts.
                </p>
              </div>
            </div>
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
