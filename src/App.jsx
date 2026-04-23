import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import EventModal from './components/EventModal.jsx'
import AdminDrawer from './components/AdminDrawer.jsx'
import HomePage from './pages/HomePage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import {
  DEFAULT_SITE_DATA,
  SESSION_KEY,
  SESSION_TOKEN_KEY,
  STORAGE_KEY,
} from './constants/site.js'
import {
  createEmptyEvent,
  createEventId,
  normalizeSiteData,
  readAdminSession,
  readAdminToken,
  readStoredSiteData,
} from './utils/siteHelpers.js'
import {
  isCloudinaryConfigured,
  uploadEventImageToCloudinary,
} from './utils/cloudinary.js'
import { isFirebaseConfigured } from './utils/firebaseClient.js'
import { recordCloudinaryUpload } from './utils/firebaseUploads.js'
import {
  fetchSiteDataFromFirebase,
  isFirebaseSiteDataEnabled,
  saveSiteDataToFirebase,
} from './utils/firebaseSiteData.js'
import {
  fetchSiteDataFromServer,
  isSiteApiConfigured,
  loginAdminOnServer,
  saveSiteDataToServer,
} from './utils/siteApi.js'
import {
  fieldClass,
  pillButtonClass,
  primaryButtonClass,
} from './styles/ui.js'

function App() {
  const siteApiEnabled = isSiteApiConfigured()
  const firebaseSiteDataEnabled = isFirebaseSiteDataEnabled()
  const remoteSiteDataEnabled = siteApiEnabled || firebaseSiteDataEnabled
  const [siteData, setSiteData] = useState(readStoredSiteData)
  const [adminToken, setAdminToken] = useState(() =>
    siteApiEnabled ? readAdminToken() : '',
  )
  const [isAdmin, setIsAdmin] = useState(() =>
    siteApiEnabled ? Boolean(readAdminToken()) : readAdminSession(),
  )
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')
  const [eventDraft, setEventDraft] = useState(createEmptyEvent)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [statusNote, setStatusNote] = useState(() =>
    remoteSiteDataEnabled ? 'Loading latest updates...' : 'Changes are saved on this device.',
  )
  const saveRequestId = useRef(0)

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, String(isAdmin))
      if (adminToken) {
        sessionStorage.setItem(SESSION_TOKEN_KEY, adminToken)
      } else {
        sessionStorage.removeItem(SESSION_TOKEN_KEY)
      }
    } catch {
      // Session storage might be unavailable in restricted environments.
    }
  }, [adminToken, isAdmin])

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.style.colorScheme = 'dark'
  }, [])

  useEffect(() => {
    if (!remoteSiteDataEnabled) {
      return
    }

    let cancelled = false

    async function loadFromServer() {
      try {
        const storedValue = siteApiEnabled
          ? await fetchSiteDataFromServer()
          : await fetchSiteDataFromFirebase()
        if (cancelled) {
          return
        }
        const normalized = normalizeSiteData(storedValue)
        setSiteData(normalized)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
        } catch {
          // Ignore local storage issues when server data is available.
        }
        setStatusNote('Loaded latest updates.')
      } catch {
        setStatusNote('Could not load shared data. Using this device data.')
      }
    }

    loadFromServer()

    return () => {
      cancelled = true
    }
  }, [firebaseSiteDataEnabled, remoteSiteDataEnabled, siteApiEnabled])

  function persistSiteData(nextValue, successMessage = 'Changes are saved on this device.') {
    setSiteData(nextValue)

    let canUseLocalStorage = true
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextValue))
    } catch {
      canUseLocalStorage = false
    }

    if (!remoteSiteDataEnabled) {
      setStatusNote(
        canUseLocalStorage
          ? successMessage
          : 'Storage is full. Please remove some images or use smaller files.',
      )
      return
    }

    if (siteApiEnabled && !adminToken) {
      setStatusNote(
        canUseLocalStorage
          ? 'Changes are saved on this device. Login again to sync for all devices.'
          : 'Storage is full and you are not logged in. Login again and save to sync.',
      )
      return
    }

    if (!siteApiEnabled && !isAdmin) {
      setStatusNote(
        canUseLocalStorage
          ? 'Changes are saved on this device. Login again to sync for all devices.'
          : 'Storage is full and you are not logged in. Login again and save to sync.',
      )
      return
    }

    const requestId = (saveRequestId.current += 1)
    setStatusNote('Saving changes for all devices...')

    const savePromise = siteApiEnabled
      ? saveSiteDataToServer(nextValue, adminToken)
      : saveSiteDataToFirebase(nextValue)

    savePromise
      .then(() => {
        if (saveRequestId.current === requestId) {
          setStatusNote('Changes saved for all devices.')
        }
      })
      .catch(() => {
        if (saveRequestId.current === requestId) {
          setStatusNote(
            canUseLocalStorage
              ? 'Could not save shared data. Changes saved only on this device.'
              : 'Could not save shared data and local storage is full.',
          )
        }
      })
  }

  function mutateSiteData(updater, successMessage) {
    const nextValue = typeof updater === 'function' ? updater(siteData) : updater
    persistSiteData(nextValue, successMessage)
  }

  function handleAdminLogin(event) {
    event.preventDefault()

    const username = loginForm.username.trim()
    const password = loginForm.password.trim()

    if (siteApiEnabled) {
      loginAdminOnServer({ username, password })
        .then((payload) => {
          setAdminToken(payload.token)
          setIsAdmin(true)
          setLoginError('')
          setLoginForm({
            username: '',
            password: '',
          })
          setStatusNote('Admin login successful.')
        })
        .catch(() => {
          setLoginError('Incorrect username or password.')
        })
      return
    }

    const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME ?? ''
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? ''

    if (!expectedUsername || !expectedPassword) {
      setLoginError('Admin credentials are not configured.')
      return
    }

    if (username === expectedUsername && password === expectedPassword) {
      setIsAdmin(true)
      setLoginError('')
      setLoginForm({
        username: '',
        password: '',
      })
      return
    }

    setLoginError('Incorrect username or password.')
  }

  function handleAdminLogout() {
    setIsAdmin(false)
    setAdminToken('')
    setEventDraft(createEmptyEvent())
  }

  function handleEventFieldChange(fieldName, value) {
    setEventDraft((currentValue) => ({
      ...currentValue,
      [fieldName]: value,
    }))
  }

  async function handleImageSelection(event) {
    const selectedFiles = Array.from(event.target.files ?? [])

    if (selectedFiles.length === 0) {
      return
    }

    if (!isCloudinaryConfigured()) {
      setStatusNote('Cloudinary is not configured yet. Please update .env and restart dev server.')
      event.target.value = ''
      return
    }

    setUploadingImages(true)

    try {
      const uploadedImages = await Promise.all(
        selectedFiles.map((file) => uploadEventImageToCloudinary(file)),
      )

      if (isFirebaseConfigured()) {
        Promise.all(
          uploadedImages.map((url, index) =>
            recordCloudinaryUpload({
              url,
              file: selectedFiles[index],
              eventDraft,
            }),
          ),
        ).catch(() => {})
      }

      setEventDraft((currentValue) => ({
        ...currentValue,
        images: [...currentValue.images, ...uploadedImages],
      }))
      setStatusNote('Images uploaded and added to the event draft.')
    } catch {
      setStatusNote('One or more images could not be uploaded. Please try again.')
    } finally {
      setUploadingImages(false)
      event.target.value = ''
    }
  }

  function removeDraftImage(imageIndex) {
    setEventDraft((currentValue) => ({
      ...currentValue,
      images: currentValue.images.filter((_, index) => index !== imageIndex),
    }))
  }

  function handleEventSave(event) {
    event.preventDefault()

    if (
      !eventDraft.title.trim() ||
      !eventDraft.category.trim() ||
      !eventDraft.description.trim()
    ) {
      setStatusNote('Please fill in the event title, category, and description.')
      return
    }

    const preparedEvent = {
      ...eventDraft,
      id: eventDraft.id || createEventId(),
      title: eventDraft.title.trim(),
      category: eventDraft.category.trim(),
      description: eventDraft.description.trim(),
    }

    mutateSiteData(
      (currentValue) => {
        const alreadyExists = currentValue.events.some(
          (item) => item.id === preparedEvent.id,
        )

        return {
          ...currentValue,
          events: alreadyExists
            ? currentValue.events.map((item) =>
                item.id === preparedEvent.id ? preparedEvent : item,
              )
            : [preparedEvent, ...currentValue.events],
        }
      },
      'Event card saved successfully.',
    )

    setEventDraft(createEmptyEvent())
  }

  function startEditingEvent(eventItem) {
    setEventDraft({
      ...eventItem,
      images: [...eventItem.images],
    })
    setIsAdminPanelOpen(true)
  }

  function deleteEvent(eventId) {
    const shouldDelete = window.confirm(
      'Do you want to remove this event card from the website?',
    )

    if (!shouldDelete) {
      return
    }

    mutateSiteData(
      (currentValue) => ({
        ...currentValue,
        events: currentValue.events.filter((item) => item.id !== eventId),
      }),
      'Event card deleted.',
    )

    if (eventDraft.id === eventId) {
      setEventDraft(createEmptyEvent())
    }

    if (activeEvent?.id === eventId) {
      setActiveEvent(null)
    }
  }

  function restoreDefaultEvents() {
    const shouldRestore = window.confirm(
      'Do you want to restore the default event cards? This will replace current saved events.',
    )

    if (!shouldRestore) {
      return
    }

    mutateSiteData(
      (currentValue) => ({
        ...currentValue,
        events: DEFAULT_SITE_DATA.events,
      }),
      'Default event cards restored.',
    )
    setEventDraft(createEmptyEvent())
    setActiveEvent(null)
  }

  return (
    <div className="min-h-screen text-[color:var(--text-strong)]">
      <Header
        businessName={siteData.businessName}
        location={siteData.location}
        onAdminPanelOpen={() => setIsAdminPanelOpen(true)}
      />

      <HomePage
        siteData={siteData}
        statusNote={statusNote}
        setActiveEvent={setActiveEvent}
      />

      <EventModal activeEvent={activeEvent} onClose={() => setActiveEvent(null)} />

      <AdminDrawer
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        title="Manage website content"
      >
        <AdminDashboardPage
          eventDraft={eventDraft}
          fieldClass={fieldClass}
          handleAdminLogin={handleAdminLogin}
          handleAdminLogout={handleAdminLogout}
          handleEventFieldChange={handleEventFieldChange}
          handleEventSave={handleEventSave}
          handleImageSelection={handleImageSelection}
          isAdmin={isAdmin}
          loginError={loginError}
          loginForm={loginForm}
          mutateSiteData={mutateSiteData}
          pillButtonClass={pillButtonClass}
          primaryButtonClass={primaryButtonClass}
          removeDraftImage={removeDraftImage}
          restoreDefaultEvents={restoreDefaultEvents}
          setEventDraft={setEventDraft}
          setLoginForm={setLoginForm}
          siteData={siteData}
          startEditingEvent={startEditingEvent}
          uploadingImages={uploadingImages}
          deleteEvent={deleteEvent}
        />
      </AdminDrawer>
    </div>
  )
}

export default App
