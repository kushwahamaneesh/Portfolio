import { HERO_FLOATING_CARDS, HERO_STATS } from '../constants/site.js'
import {
  mutedPanelClass,
  panelClass,
  pillButtonClass,
  primaryButtonClass,
  sectionBadgeClass,
  shellClass,
} from '../styles/ui.js'

function splitBusinessName(value) {
  const parts = value.trim().toUpperCase().split(/\s+/)

  return {
    lead: parts[0] ?? value,
    tail: parts.slice(1).join(' ') || parts[0] || value,
  }
}

export default function HeroSection({ hero, businessName, location }) {
  const { lead, tail } = splitBusinessName(businessName)

  return (
    <section
      className={`${shellClass} grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20`}
      id="home"
    >
      <div>
        <p className={sectionBadgeClass}>{hero.badge}</p>
        <h1 className="font-['Arial_Black','Segoe_UI',sans-serif] text-[clamp(4rem,10vw,8.5rem)] leading-[0.9] font-black uppercase tracking-[-0.07em]">
          <span className="text-[color:var(--accent)]">{lead}</span>{' '}
          <span className="text-[color:var(--text-strong)]">{tail}</span>
        </h1>
        <p className="mt-6 max-w-5xl text-[clamp(1.6rem,3.8vw,2.4rem)] leading-[1.15] font-semibold tracking-[-0.04em] text-[color:var(--text-soft)]">
          {hero.title}
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--text-soft)]">
          {hero.description}
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--text-soft)]">
          {HERO_STATS.map((item) => item.copy).join(' • ')}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a className={primaryButtonClass} href="#contact">
            {hero.primaryButtonLabel}
          </a>
          <a className={pillButtonClass} href="#events">
            {hero.secondaryButtonLabel}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {HERO_STATS.map((item) => (
            <div className={`${mutedPanelClass} min-w-[180px] px-5 py-4`} key={item.title}>
              <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[color:var(--accent-soft)]">
                {item.title}
              </span>
              <strong className="mt-3 block max-w-[20ch] text-base text-[color:var(--text-strong)]">
                {item.copy}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <article className={`${panelClass} p-7`}>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">
            Signature Decor Blocks
          </span>
          <div className="mt-6 grid gap-3">
            {[
              'Stage decoration and backdrop styling',
              'Balloon and floral entry concepts',
              'Cake table and family photo corners',
              `${businessName} serving ${location}`,
            ].map((item) => (
              <div
                className={`${mutedPanelClass} px-4 py-4 text-sm font-semibold text-[color:var(--text-strong)]`}
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {HERO_FLOATING_CARDS.map((item) => (
            <article className={`${panelClass} p-6`} key={item.eyebrow}>
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--accent-soft)]">
                {item.eyebrow}
              </span>
              <strong className="mt-4 block font-['Baskerville','Times_New_Roman',serif] text-[2rem] leading-[1] font-medium text-[color:var(--text-strong)]">
                {item.title}
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
