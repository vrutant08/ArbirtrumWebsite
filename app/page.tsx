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
  'Arbitrum Builder Labs',
  'Lampros DAO',
  'Builder Pods',
  'Web3 University',
  'Stylus / WASM',
  'Rust Smart Contracts',
  'AI-Assisted dApp Dev',
  'SBT & NFT Certification',
]

const FEATURES = [
  {
    index: '01',
    title: 'Web3 & Evolution',
    body: 'Traced read-only Web1 (Doordarshan era) to platform-controlled Web2 data/currency, to Bitcoin & Ethereum self-sovereign networks.',
  },
  {
    index: '02',
    title: 'WASM Smart Contracts',
    body: 'Explored self-executing agreements using Rust, Solidity, and Vyper, compiling low-level code directly to high-speed WebAssembly (WASM).',
  },
  {
    index: '03',
    title: 'Arbitrum Stylus',
    body: 'Analyzed Arbitrum EVM+ coequal virtual machine, allowing developers to write contracts in Rust for 100x speed and 100-500x cheaper memory on-chain.',
  },
  {
    index: '04',
    title: 'AI-Assisted Workflow',
    body: 'Studied the Developer Shift from fragile "Vibe Coding" to guided engineering workflows using specialized context templates (Skills).',
  },
]

const PROGRAM_OUTCOMES = [
  {
    label: 'What is a Pod?',
    body: 'University-based Web3 communities created after Builder Labs to foster peer collaborative learning with Ethereum, Stylus, and Orbit.',
  },
  {
    label: 'Program Structure',
    body: 'Groups of 10-12 active students per Pod, backed by faculty advisors and Lampros DAO mentors to design and build real-world on-chain projects.',
  },
  {
    label: 'Showcase & Outcomes',
    body: 'Demos and evaluation alongside Arbitrum DevRel at regional events in Mumbai, Ahmedabad, MP/Rajasthan for a ₹90,000 prize pool.',
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

      {/* Program overview */}
      <section className="border-b">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-2">
          <div className="border-b p-5 py-14 md:border-b-0 md:border-r md:p-12 md:py-24">
            <FadeUp>
              <span className="rounded-full border px-3 py-1 text-label text-muted-foreground">
                Program Overview
              </span>
            </FadeUp>
            <RevealLines
              as="h2"
              className="text-display mt-6 text-4xl uppercase md:text-6xl"
              lines={['Arbitrum', 'Builder Pods']}
            />
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                The Arbitrum Builder Labs program, created by Lampros DAO, is designed to discover and nurture next-generation Web3 talent. The journey begins on-campus, introducing developers to blockchain scaling, smart contracts, and decentralized systems. Outstanding participants form university-based Builder Pods to transition from learners to active on-chain builders.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                Through continuous mentorship and collaborative project building, teams develop on-chain applications. Finalists earn permanent on-chain credentials via the Xcan Platform, including NFT certificates and Soul Bound Tokens (SBTs) for finalists and winners.
              </p>
            </FadeUp>
          </div>

          <StaggerGrid className="flex flex-col">
            {PROGRAM_OUTCOMES.map((item, i) => (
              <StaggerItem
                key={item.label}
                className={`flex flex-1 flex-col justify-center gap-2 p-5 md:p-12 ${
                  i < PROGRAM_OUTCOMES.length - 1 ? 'border-b' : ''
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

      {/* Workshop session overview */}
      <section className="relative overflow-hidden border-b">
        <Parallax
          amount={40}
          className="pointer-events-none absolute inset-x-0 top-8 select-none"
        >
          <p
            aria-hidden="true"
            className="text-mega whitespace-nowrap text-center text-secondary"
          >
            Lampros Lampros
          </p>
        </Parallax>

        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <FadeUp>
              <span className="rounded-full border bg-background px-3 py-1 text-label text-muted-foreground">
                The Workshop
              </span>
            </FadeUp>
            <RevealLines
              as="h2"
              className="text-display mt-6 text-4xl uppercase md:text-6xl"
              lines={['Session', 'Overview']}
            />
            <FadeUp delay={0.2}>
              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
                The seminar was a intensive workshop covering Web3 fundamentals and scaling. Session 01 focused on blockchain and L2 mechanics, Session 02 explored AI-Assisted dApp development (smart contracts using modern tools and deploying to testnets), Session 03 covered Builder Pod activation and opportunities, and Session 04 was an open Q&A with experts.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Practical Focus:
                </span>{' '}
                We studied the structure of Rust, mutability, ownership, borrowing, and references, comparing Rust structures to Javascript class definitions and impl blocks. We then explored EVM equivalence on Arbitrum Stylus and deployed code onto Arbitrum Sepolia.
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
              lines={['What We', 'Mastered']}
            />
            <FadeUp>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Four core domains that structured our technical learning during the builder seminar.
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
            lines={['Unpack Web3.', 'Explore the concepts.']}
          />
          <FadeUp delay={0.25} className="mt-10">
            <Link
              href="/concepts"
              className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs font-mono uppercase tracking-widest text-background hover:bg-transparent hover:text-foreground transition-all duration-300 rounded-none"
            >
              Explore Web3 Concepts
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}
