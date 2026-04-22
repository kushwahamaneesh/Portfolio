export default function SectionHeading({ badge, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.1)] bg-white/6 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--accent-soft)]">
        {badge}
      </p>
      <h2 className="max-w-[16ch] font-['Baskerville','Times_New_Roman',serif] text-4xl leading-[1] font-medium tracking-[-0.04em] text-[color:var(--text-strong)] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--text-soft)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
