import { useState } from 'react'
import { mutedPanelClass, panelClass, shellClass } from '../styles/ui.js'

export default function AboutSection({ about }) {
  const [showFounderImage, setShowFounderImage] = useState(true)
  const founder = about.founder ?? {}
  const reasons = Array.isArray(about.reasons) ? about.reasons : []

  return (
    <section className={`${shellClass} relative py-10 md:py-16`} id="about">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(91,116,255,0.34),transparent_65%)] blur-3xl" />
        <div className="absolute -right-28 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,179,81,0.3),transparent_65%)] blur-3xl" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-3 rounded-full border border-[rgba(255,196,112,0.16)] bg-[rgba(255,179,81,0.08)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">
            About Studio
          </p>
          <h2 className="mt-6 font-['Arial_Black','Segoe_UI',sans-serif] text-[clamp(2.6rem,5vw,4.7rem)] leading-[0.95] font-black tracking-[-0.06em] text-[color:var(--text-strong)]">
            Decor <span className="text-[color:var(--accent)]">Capabilities</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[color:var(--text-soft)]">
            {about.description}
          </p>
          <div className={`${mutedPanelClass} mt-7 max-w-xl`}>
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                The Promise
              </span>
              <p className="mt-3 text-base leading-7 text-[color:var(--text-soft)]">
                Clean styling, balanced colors, and a setup that looks premium in real
                photos, from the entry to the stage.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className={`${panelClass} overflow-hidden p-0 md:col-span-2`}>
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,179,81,0.14),rgba(255,255,255,0.02))] p-5 md:border-r md:border-b-0 md:p-6">
                {founder.image && showFounderImage ? (
                  <div className="relative">
                    <img
                      className="h-full min-h-[340px] w-full rounded-[28px] border border-white/10 object-cover object-[50%_20%] shadow-[0_22px_60px_rgba(0,0,0,0.38)]"
                      src={founder.image}
                      alt={founder.name ? `${founder.name} portrait` : 'Founder portrait'}
                      onError={() => setShowFounderImage(false)}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 rounded-b-[28px] bg-[linear-gradient(180deg,transparent,rgba(5,8,16,0.85))]" />
                    <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-[rgba(9,12,22,0.66)] px-4 py-2 text-xs font-semibold text-[color:var(--text-strong)] backdrop-blur">
                      Founder Spotlight
                    </div>
                  </div>
                ) : (
                  <div className="grid min-h-[320px] place-items-center rounded-[28px] border border-dashed border-white/12 bg-[rgba(255,255,255,0.03)]">
                    <div className="text-center">
                      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[rgba(255,196,112,0.22)] bg-[rgba(255,179,81,0.1)] text-3xl font-black text-[color:var(--accent)]">
                        MK
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[color:var(--text-soft)]">
                        Founder photo will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-7 md:p-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">
                  Meet The Founder
                </span>
                <h3 className="mt-4 font-['Baskerville','Times_New_Roman',serif] text-[2.4rem] leading-[1] font-medium text-[color:var(--text-strong)]">
                  {founder.name || 'Maneesh Kushwaha'}
                </h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  {founder.role || 'Founder, Maneesh Events'}
                </p>
                <p className="mt-5 text-base leading-7 text-[color:var(--text-soft)]">
                  {founder.story}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {about.highlights.slice(0, 2).map((item) => (
                    <span
                      className="rounded-full border border-white/8 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-semibold text-[color:var(--text-soft)]"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className={`${panelClass} p-7`}>
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-[20px] bg-[linear-gradient(135deg,rgba(211,88,176,0.9),rgba(129,75,224,0.72))] text-xl font-bold text-white">
                W
              </div>
              <div>
                <h3 className="font-['Baskerville','Times_New_Roman',serif] text-[2rem] leading-[1] font-medium text-[color:var(--text-strong)]">
                  Why Choose Maneesh Events
                </h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--text-soft)]">
                  {about.title}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {reasons.map((item) => (
                <div
                  className={`${mutedPanelClass} flex gap-3 px-4 py-4 text-sm font-semibold text-[color:var(--text-strong)]`}
                  key={item}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_6px_rgba(255,179,81,0.12)]" />
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={`${panelClass} p-7`}>
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-[20px] bg-[linear-gradient(135deg,rgba(91,116,255,0.9),rgba(78,110,219,0.72))] text-xl font-bold text-white">
                D
              </div>
              <div>
                <h3 className="font-['Baskerville','Times_New_Roman',serif] text-[2rem] leading-[1] font-medium text-[color:var(--text-strong)]">
                  Decor Expertise
                </h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--text-soft)]">
                  Birthday to family function, every setup is planned to feel organized,
                  bright, and camera-ready.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {about.highlights.slice(2).map((item) => (
                <span
                  className="rounded-full border border-white/8 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-semibold text-[color:var(--text-soft)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className={`${panelClass} p-7 md:col-span-2`}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">
                  Service Status
                </span>
                <h3 className="mt-4 font-['Baskerville','Times_New_Roman',serif] text-[2.4rem] leading-[1] font-medium text-[color:var(--text-strong)]">
                  Ready for birthdays, anniversaries, and family functions.
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className={mutedPanelClass}>
                  <div className="p-4">
                    <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                      Service Area
                    </span>
                    <strong className="mt-3 block text-lg text-[color:var(--text-strong)]">
                      Chirgaon and nearby venues
                    </strong>
                  </div>
                </div>
                <div className={mutedPanelClass}>
                  <div className="p-4">
                    <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                      Decor Style
                    </span>
                    <strong className="mt-3 block text-lg text-[color:var(--text-strong)]">
                      Elegant, warm, photo-ready
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
