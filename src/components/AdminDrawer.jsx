import {
  panelClass,
  pillButtonClass,
  sectionBadgeClass,
} from "../styles/ui.js";

export default function AdminDrawer({ children, isOpen, onClose, title }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[620px] overflow-auto border-l border-white/10 bg-[rgba(7,10,19,0.92)] p-4 shadow-[var(--shadow-hero)] backdrop-blur-2xl transition duration-300 sm:p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className={sectionBadgeClass}>Admin Dashboard</p>
              <h3 className="font-['Cambria','Georgia',serif] text-3xl leading-tight font-medium text-[color:var(--text-strong)]">
                {title}
              </h3>
            </div>
            <button className={pillButtonClass} type="button" onClick={onClose}>
              Close
            </button>
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </aside>
    </>
  );
}
