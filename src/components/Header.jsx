import { useState } from 'react'
import { navLinkClass, pillButtonClass, shellClass } from '../styles/ui.js'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Showcase' },
  { href: '#contact', label: 'Contact' },
]

export default function Header({ businessName, location, onAdminPanelOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleAdminClick() {
    setIsMobileMenuOpen(false)
    onAdminPanelOpen()
  }

  function handleNavClick() {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 pt-4">
      <div className={shellClass}>
        <div className="rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[color:var(--topbar)]/92 px-4 py-4 shadow-[var(--shadow-soft)] backdrop-blur-2xl md:rounded-full md:px-5">
          <div className="flex items-center justify-between gap-4">
            <a className="inline-flex min-w-0 items-center gap-4 no-underline" href="#home">
              <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-[rgba(255,196,112,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] shadow-[0_0_24px_rgba(255,179,71,0.16)] md:h-14 md:w-14">
                <img
                  className="h-full w-full object-cover"
                  src="/maneesh-party-events-logo.svg"
                  alt={`${businessName} logo`}
                />
              </span>

              <div className="min-w-0">
                <strong className="block truncate text-xl font-extrabold uppercase tracking-[-0.03em] text-[color:var(--text-strong)] md:text-2xl">
                  {businessName}
                </strong>
                <span className="mt-1 inline-flex max-w-full truncate rounded-full border border-[rgba(255,196,112,0.18)] px-3 py-1 text-xs font-semibold text-[color:var(--accent)] md:px-4 md:text-sm">
                  Event Decor Studio | {location}
                </span>
              </div>
            </a>

            <div className="hidden items-center gap-2 md:flex">
              <nav className="flex flex-wrap items-center gap-2" aria-label="Main navigation">
                {navItems.map((item) => (
                  <a
                    className={`${navLinkClass} ${
                      item.href === '#home' ? 'text-[color:var(--accent)]' : ''
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button className={pillButtonClass} type="button" onClick={handleAdminClick}>
                Admin
              </button>
            </div>

            <button
              className={`${pillButtonClass} h-12 w-12 shrink-0 px-0 md:hidden`}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
            >
              <span className="text-xl leading-none">{isMobileMenuOpen ? 'X' : '≡'}</span>
            </button>
          </div>

          {isMobileMenuOpen ? (
            <div className="mt-4 border-t border-white/8 pt-4 md:hidden">
              <nav className="grid gap-2" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <a
                    className={`${navLinkClass} ${
                      item.href === '#home'
                        ? 'bg-[rgba(255,179,81,0.08)] text-[color:var(--accent)]'
                        : 'bg-[rgba(255,255,255,0.02)]'
                    } text-center`}
                    href={item.href}
                    key={item.href}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </a>
                ))}

                <button
                  className={`${pillButtonClass} mt-2 w-full`}
                  type="button"
                  onClick={handleAdminClick}
                >
                  Admin
                </button>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
