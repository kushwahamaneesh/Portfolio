import { panelClass, pillButtonClass, shellClass } from '../styles/ui.js'

function getMediaSummary(eventItem) {
  const parts = []

  if (eventItem.videoUrl) {
    parts.push('1 video')
  }

  if (eventItem.images.length > 0) {
    parts.push(`${eventItem.images.length} image(s)`)
  }

  return parts.length > 0 ? parts.join(' | ') : 'No media added yet'
}

export default function EventsSection({ events, setActiveEvent }) {
  return (
    <section className={`${shellClass} py-8 md:py-16`} id="events">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-3 rounded-full border border-[rgba(255,196,112,0.16)] bg-[rgba(255,179,81,0.08)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">
          Decoration Showcase
        </p>
        <h2 className="mt-6 font-['Arial_Black','Segoe_UI',sans-serif] text-[clamp(2.8rem,6vw,5rem)] leading-[0.95] font-black tracking-[-0.06em] text-[color:var(--text-strong)]">
          Featured <span className="text-[color:var(--accent)]">Decorations</span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-[color:var(--text-soft)]">
          Explore real event decoration concepts with front video previews and
          inside gallery images.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {events.map((eventItem) => (
          <article className={`${panelClass} overflow-hidden p-6`} key={eventItem.id}>
            <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-[rgba(255,179,81,0.14)] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  {eventItem.category}
                </span>
              </div>

              <div className="relative h-64 overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
                {eventItem.videoUrl ? (
                  <video
                    className="h-full w-full bg-[#0b111c] object-contain"
                    src={eventItem.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : eventItem.images[0] ? (
                  <img
                    className="h-full w-full bg-[#0b111c] object-contain"
                    src={eventItem.images[0]}
                    alt={`${eventItem.title} decoration preview`}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[rgba(255,255,255,0.03)]">
                    <span className="text-sm font-semibold text-[color:var(--text-muted)]">
                      No preview added
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-['Baskerville','Times_New_Roman',serif] text-[2.2rem] leading-[1] font-medium text-[color:var(--text-strong)]">
                {eventItem.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">
                {eventItem.description}
              </p>

              <div className="mt-5 flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-[color:var(--text-soft)]">
                  {getMediaSummary(eventItem)}
                </span>
                <button
                  className={pillButtonClass}
                  type="button"
                  onClick={() => setActiveEvent(eventItem)}
                >
                  Open Gallery
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
