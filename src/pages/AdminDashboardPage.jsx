import AdminEventForm from '../components/admin/AdminEventForm.jsx'
import AdminEventList from '../components/admin/AdminEventList.jsx'
import AdminLoginForm from '../components/admin/AdminLoginForm.jsx'
import AdminPanelSection from '../components/admin/AdminPanelSection.jsx'
import { createEmptyEvent } from '../utils/siteHelpers.js'

export default function AdminDashboardPage({
  deleteEvent,
  eventDraft,
  fieldClass,
  handleAdminLogin,
  handleAdminLogout,
  handleEventFieldChange,
  handleEventSave,
  handleImageSelection,
  isAdmin,
  loginError,
  loginForm,
  pillButtonClass,
  primaryButtonClass,
  removeDraftImage,
  restoreDefaultEvents,
  setEventDraft,
  setLoginForm,
  siteData,
  startEditingEvent,
  uploadingImages,
}) {
  if (!isAdmin) {
    return (
      <AdminLoginForm
        fieldClass={fieldClass}
        handleAdminLogin={handleAdminLogin}
        loginError={loginError}
        loginForm={loginForm}
        primaryButtonClass={primaryButtonClass}
        setLoginForm={setLoginForm}
      />
    )
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          className={pillButtonClass}
          type="button"
          onClick={restoreDefaultEvents}
        >
          Restore Default Events
        </button>
        <button className={pillButtonClass} type="button" onClick={handleAdminLogout}>
          Logout
        </button>
      </div>

      <AdminPanelSection
        title="Party Event Cards"
        action={
          <button
            className={pillButtonClass}
            type="button"
            onClick={() => setEventDraft(createEmptyEvent())}
          >
            New Card
          </button>
        }
      >
        <p className="text-sm leading-6 text-[color:var(--text-soft)]">
          Har event ke liye ek front video URL add karo. Visitor card par woh video
          muted, loop aur autoplay me chalegi. Click karne ke baad andar gallery
          images dikhenge jo admin yahin se upload kar sakta hai.
        </p>

        <AdminEventForm
          eventDraft={eventDraft}
          fieldClass={fieldClass}
          handleEventFieldChange={handleEventFieldChange}
          handleEventSave={handleEventSave}
          handleImageSelection={handleImageSelection}
          primaryButtonClass={primaryButtonClass}
          removeDraftImage={removeDraftImage}
          uploadingImages={uploadingImages}
        />

        <AdminEventList
          events={siteData.events}
          onDelete={deleteEvent}
          onEdit={startEditingEvent}
        />
      </AdminPanelSection>
    </div>
  )
}
