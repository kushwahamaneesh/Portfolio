import { panelClass, pillButtonClass, sectionBadgeClass } from '../styles/ui.js'

export default function EventModal({ activeEvent, onClose }) {
  if (!activeEvent) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-[rgba(3,6,16,0.76)] p-4 backdrop-blur-sm"
      aria-hidden="true"
      onClick={onClose}
    >
      <div
        className={`${panelClass} max-h-[90vh] w-full max-w-5xl overflow-auto p-6 sm:p-7`}
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className={sectionBadgeClass}>{activeEvent.category}</p>
            <h3 className="font-['Baskerville','Times_New_Roman',serif] text-4xl leading-tight font-medium text-[color:var(--text-strong)]">
              {activeEvent.title}
            </h3>
          </div>
          <button className={pillButtonClass} type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-[color:var(--text-soft)]">
          {activeEvent.description}
        </p>

        {activeEvent.videoUrl ? (
          <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
            <video
              className="aspect-video w-full bg-[#0b111c] object-contain"
              src={activeEvent.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        ) : null}

        {activeEvent.images.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {activeEvent.images.map((image, index) => (
              <img
                className="aspect-[4/3] w-full rounded-[24px] border border-white/10 bg-[#0b111c] object-contain"
                key={`${activeEvent.id}-${index}`}
                src={image}
                alt={`${activeEvent.title} image ${index + 1}`}
              />
            ))}
          </div>
        ) : !activeEvent.videoUrl ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-white/12 bg-black/18 p-4 text-sm text-[color:var(--text-soft)]">
            Admin has not uploaded media for this event yet.
          </div>
        ) : null}
      </div>
    </div>
  )
}
