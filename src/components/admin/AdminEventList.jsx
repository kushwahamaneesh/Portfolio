import { pillButtonClass } from '../../styles/ui.js'

export default function AdminEventList({ events, onDelete, onEdit }) {
  return (
    <div className="grid gap-3">
      {events.map((eventItem) => (
        <article
          className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-black/18 p-4 sm:flex-row sm:items-center sm:justify-between"
          key={eventItem.id}
        >
          <div>
            <strong className="block text-base text-[color:var(--text-strong)]">
              {eventItem.title}
            </strong>
            <span className="mt-1 block text-sm text-[color:var(--text-soft)]">
              {eventItem.category} | {eventItem.images.length} image(s)
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              className={pillButtonClass}
              type="button"
              onClick={() => onEdit(eventItem)}
            >
              Edit
            </button>
            <button
              className={pillButtonClass}
              type="button"
              onClick={() => onDelete(eventItem.id)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
