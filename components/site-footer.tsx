import Link from 'next/link'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/concepts', label: 'Concepts' },
  { href: '/prices', label: 'Live Prices' },
  { href: '/simulator', label: 'Block Simulator' },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Giant footer wordmark */}
        <div className="overflow-hidden border-b py-6 md:py-10">
          <p
            aria-hidden="true"
            className="text-mega select-none whitespace-nowrap text-center leading-none"
          >
            Layered<span className="text-accent">.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-label text-muted-foreground">Built by</span>
            <span className="text-lg font-medium">Vrutant Panchal</span>
            <span className="text-sm text-muted-foreground">
              Arbitrum Builder Labs — Lampros DAO
            </span>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            <span className="text-label text-muted-foreground">Pages</span>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-foreground transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <span className="text-label text-muted-foreground">Links</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm transition-colors hover:text-accent"
            >
              GitHub ↗
            </a>
            <a
              href="https://arbitrum.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm transition-colors hover:text-accent"
            >
              Arbitrum ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 Layered. An educational Web3 project.</span>
          <span className="text-label"></span>
        </div>
      </div>
    </footer>
  )
}
