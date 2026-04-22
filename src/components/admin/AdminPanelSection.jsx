import { mutedPanelClass } from '../../styles/ui.js'

export default function AdminPanelSection({ children, title, action }) {
  return (
    <section className={`${mutedPanelClass} grid gap-4 p-5`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="font-['Cambria','Georgia',serif] text-2xl font-medium text-[color:var(--text-strong)]">
          {title}
        </h4>
        {action}
      </div>
      {children}
    </section>
  )
}
