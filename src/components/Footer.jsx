import { shellClass } from "../styles/ui.js";

export default function Footer({
  businessName,
  contact,
  location,
  statusNote,
}) {
  return (
    <footer
      className={`${shellClass} pb-10 pt-8 text-[color:var(--text-soft)]`}
    >
      <div className="grid gap-8 border-t border-white/6 pt-10 lg:grid-cols-[1fr_0.45fr_0.8fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--accent-soft)]">
            Decoration Philosophy
          </p>
          <h3 className="mt-5 max-w-[12ch] font-['Baskerville','Times_New_Roman',serif] text-5xl leading-[0.95] font-medium text-[color:var(--text-strong)]">
            Building the next event setup with clean premium styling.
          </h3>
          <p className="mt-5 max-w-xl text-lg leading-8">
            Focused on stage balance, guest entry, backdrop quality, and
            memorable photo corners for real celebrations.
          </p>
        </div>

        <div>
          <h4 className="text-3xl font-extrabold text-[color:var(--text-strong)]">
            Navigation
          </h4>
          <div className="mt-6 grid gap-3 text-2xl font-semibold">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#events">Showcase</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/8 bg-[rgba(255,255,255,0.02)] p-8">
          <p className="text-4xl font-extrabold text-[color:var(--text-strong)]">
            Party Events
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                Current Focus
              </span>
              <strong className="mt-3 block text-xl text-[color:var(--text-strong)]">
                Birthday and family event decoration
              </strong>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                Location
              </span>
              <strong className="mt-3 block text-xl text-[color:var(--text-strong)]">
                {location}
              </strong>
            </div>
          </div>
          <div className="mt-8 border-t border-white/8 pt-6 text-[color:var(--accent)]">
            <a
              className="text-2xl font-bold no-underline"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-white/6 pt-8 text-sm md:flex-row md:items-center md:justify-between">
        <p className="text-xl font-bold text-[color:var(--text-strong)]">
          &copy; 2026 {businessName}
        </p>
        {statusNote ? (
          <p className="text-[color:var(--text-muted)]">{statusNote}</p>
        ) : null}
        <p>All rights reserved</p>
      </div>
    </footer>
  );
}
