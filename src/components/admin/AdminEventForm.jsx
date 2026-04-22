import { pillButtonClass } from '../../styles/ui.js'

export default function AdminEventForm({
  eventDraft,
  fieldClass,
  handleEventFieldChange,
  handleEventSave,
  handleImageSelection,
  primaryButtonClass,
  removeDraftImage,
  uploadingImages,
}) {
  return (
    <form className="grid gap-4" onSubmit={handleEventSave}>
      <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
        Event Title
        <input
          className={fieldClass}
          type="text"
          value={eventDraft.title}
          onChange={(event) => handleEventFieldChange('title', event.target.value)}
          placeholder="Example: Royal Birthday Setup"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
        Category
        <input
          className={fieldClass}
          type="text"
          value={eventDraft.category}
          onChange={(event) =>
            handleEventFieldChange('category', event.target.value)
          }
          placeholder="Example: Birthday Decoration"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
        Description
        <textarea
          className={fieldClass}
          rows="4"
          value={eventDraft.description}
          onChange={(event) =>
            handleEventFieldChange('description', event.target.value)
          }
          placeholder="Describe the decoration style and hosting support."
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
        Front Video URL
        <input
          className={fieldClass}
          type="url"
          value={eventDraft.videoUrl}
          onChange={(event) => handleEventFieldChange('videoUrl', event.target.value)}
          placeholder="Example: https://yourcdn.com/event-preview.mp4"
        />
        <span className="text-xs font-normal text-[color:var(--text-muted)]">
          Front card par muted loop video chalegi. MP4 hosted URL best rahega.
        </span>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
        Upload Gallery Images
        <input
          className={`${fieldClass} file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[color:var(--text-strong)]`}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelection}
        />
        <span className="text-xs font-normal text-[color:var(--text-muted)]">
          Event images are stored on Cloudinary and shown on the website as gallery media.
        </span>
      </label>

      {uploadingImages ? (
        <p className="rounded-[20px] border border-dashed border-white/12 bg-black/18 p-4 text-sm text-[color:var(--text-soft)]">
          Compressing and adding images...
        </p>
      ) : null}

      {eventDraft.images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {eventDraft.images.map((image, index) => (
            <div
              className="rounded-[24px] border border-white/10 bg-black/18 p-3"
              key={`${index}-${image.slice(0, 30)}`}
            >
              <img
                className="aspect-[4/3] w-full rounded-[18px] object-cover"
                src={image}
                alt={`Event upload ${index + 1}`}
              />
              <button
                className={`${pillButtonClass} mt-3 w-full`}
                type="button"
                onClick={() => removeDraftImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-white/12 bg-black/18 p-4 text-sm text-[color:var(--text-soft)]">
          No gallery images added yet for this event.
        </div>
      )}

      <button className={primaryButtonClass} type="submit">
        {eventDraft.id ? 'Update Event Card' : 'Add Event Card'}
      </button>
    </form>
  )
}
