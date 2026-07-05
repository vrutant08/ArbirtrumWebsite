import Link from 'next/link'
import { Hero } from '@/components/home/hero'
import {
  RevealLines,
  FadeUp,
  StaggerGrid,
  StaggerItem,
  Parallax,
} from '@/components/motion'

const MARQUEE_ITEMS = [
  'Optimistic Rollups',
  'EVM Equivalent',
  'Lower Fees',
  'Faster Finality',
  'Ethereum Security',
  'Stylus / WASM',
]

const FEATURES = [
  {
    index: '01',
    title: 'Inherited security',
    body: 'Arbitrum posts transaction data back to Ethereum, so every batch is ultimately secured by Ethereum itself — you never trade safety for speed.',
  },
  {
    index: '02',
    title: 'Radically lower fees',
    body: 'By executing transactions off-chain and settling in compressed batches, Arbitrum cuts gas costs by an order of magnitude versus mainnet.',
  },
  {
    index: '03',
    title: 'Full EVM equivalence',
    body: 'Any contract, wallet, or tool built for Ethereum works on Arbitrum without modification. Developers ship the same code — it just runs cheaper.',
  },
  {
    index: '04',
    title: 'Stylus & WASM',
    body: 'Beyond Solidity, Arbitrum Stylus lets you write contracts in Rust, C, and C++ that compile to WebAssembly — faster and with cheaper memory.',
  },
]

const TRILEMMA = [
  {
    label: 'Scalability',
    body: 'The ability to handle a large volume of transactions efficiently.',
  },
  {
    label: 'Decentralization',
    body: 'Distributing control across a network, eliminating a central authority.',
  },
  {
    label: 'Security',
    body: 'Essential for maintaining trust in the network.',
  },
]

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Marquee */}
      <section
        aria-hidden="true"
        className="overflow-hidden border-b bg-foreground py-4"
      >
        <div className="animate-marquee flex w-max items-center gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap text-display text-xl uppercase text-background"
            >
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Why Ethereum needed L2 */}
      <section className="border-b">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-2">
          <div className="border-b p-5 py-14 md:border-b-0 md:border-r md:p-12 md:py-24">
            <FadeUp>
              <span className="rounded-full border px-3 py-1 text-label text-muted-foreground">
                The problem
              </span>
            </FadeUp>
            <RevealLines
              as="h2"
              className="text-display mt-6 text-4xl uppercase md:text-6xl"
              lines={['Why Ethereum', 'needed Layer 2']}
            />
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                Ethereum is the world computer — but every node processes every
                transaction. At peak demand, blockspace becomes scarce: fees
                spike to tens of dollars and confirmations slow down. This is
                the blockchain trilemma in action — you cannot maximize
                scalability, decentralization, and security all at once on a
                single layer.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                Layer 2 networks solve this by moving execution off-chain while
                anchoring proofs and data back to Ethereum — keeping its
                security, but multiplying its capacity.
              </p>
            </FadeUp>
          </div>

          <StaggerGrid className="flex flex-col">
            {TRILEMMA.map((item, i) => (
              <StaggerItem
                key={item.label}
                className={`flex flex-1 flex-col justify-center gap-2 p-5 md:p-12 ${
                  i < TRILEMMA.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-display text-2xl uppercase md:text-3xl">
                    {item.label}
                  </h3>
                  <span className="text-label text-accent">0{i + 1}</span>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* What is Arbitrum */}
      <section className="relative overflow-hidden border-b">
        <Parallax
          amount={40}
          className="pointer-events-none absolute inset-x-0 top-8 select-none"
        >
          <p
            aria-hidden="true"
            className="text-mega whitespace-nowrap text-center text-secondary"
          >
            Arbitrum Arbitrum
          </p>
        </Parallax>

        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <FadeUp>
              <span className="rounded-full border bg-background px-3 py-1 text-label text-muted-foreground">
                The solution
              </span>
            </FadeUp>
            <RevealLines
              as="h2"
              className="text-display mt-6 text-4xl uppercase md:text-6xl"
              lines={['What is', 'Arbitrum?']}
            />
            <FadeUp delay={0.2}>
              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
                Arbitrum is a Layer 2 scaling solution for Ethereum built on
                Optimistic Rollup technology. It executes transactions on its
                own fast chain, then rolls them up into compressed batches
                posted to Ethereum. Transactions are assumed valid by default —
                and anyone can challenge fraud during a dispute window — so
                Arbitrum stays fast and cheap without giving up
                Ethereum&apos;s security.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Real-world benefit:
                </span>{' '}
                a token swap that costs $10–50 in gas on Ethereum mainnet
                typically costs a few cents on Arbitrum — settling in seconds
                instead of minutes, while remaining fully compatible with the
                same wallets and contracts.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-b">
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <RevealLines
              as="h2"
              className="text-display text-4xl uppercase md:text-6xl"
              lines={['Why it', 'matters']}
            />
            <FadeUp>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Four properties that make Arbitrum the leading Layer 2 by total
                value locked.
              </p>
            </FadeUp>
          </div>

          <StaggerGrid className="grid grid-cols-1 border-l border-t md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <StaggerItem
                key={f.index}
                className="group flex min-h-64 flex-col justify-between gap-8 border-b border-r p-6 transition-colors duration-500 hover:bg-foreground"
              >
                <span className="text-label text-accent">{f.index}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-display text-xl uppercase transition-colors duration-500 group-hover:text-background">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-background/70">
                    {f.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-[1400px] px-5 py-20 text-center md:px-8 md:py-32">
          <FadeUp>
            <span className="rounded-full border px-3 py-1 text-label text-muted-foreground">
              Hands-on
            </span>
          </FadeUp>
          <RevealLines
            as="h2"
            className="text-display mt-6 text-4xl uppercase md:text-7xl"
            lines={["Don't just read it.", 'Mine it.']}
          />
          <FadeUp delay={0.25} className="mt-10">
            <Link
              href="/simulator"
              className="btn-wipe inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-8 py-4 font-medium text-background transition-colors"
            >
              Open the block simulator ↗
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}
