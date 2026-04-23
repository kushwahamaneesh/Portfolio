import {
  DEFAULT_SITE_DATA,
  LEGACY_PHONE_VARIANTS,
  LEGACY_PLACEHOLDER_EMAIL,
  SESSION_KEY,
  SESSION_TOKEN_KEY,
  STORAGE_KEY,
} from '../constants/site.js'

export function createEmptyEvent() {
  return {
    id: '',
    title: '',
    category: '',
    description: '',
    videoUrl: '',
    images: [],
  }
}

export function normalizeLines(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function normalizeSiteData(value) {
  if (!value || typeof value !== 'object') {
    return DEFAULT_SITE_DATA
  }

  const storedFounderImage = value.about?.founder?.image
  const founderImage =
    typeof storedFounderImage === 'string' &&
    (storedFounderImage.startsWith('data:image/') ||
      storedFounderImage.startsWith('http://') ||
      storedFounderImage.startsWith('https://') ||
      storedFounderImage.startsWith('/'))
      ? storedFounderImage
      : DEFAULT_SITE_DATA.about.founder.image

  return {
    ...DEFAULT_SITE_DATA,
    ...value,
    hero: {
      ...DEFAULT_SITE_DATA.hero,
      ...(value.hero ?? {}),
    },
    about: {
      ...DEFAULT_SITE_DATA.about,
      ...(value.about ?? {}),
      founder: {
        ...DEFAULT_SITE_DATA.about.founder,
        ...(value.about?.founder ?? {}),
        image: founderImage,
      },
      highlights: Array.isArray(value.about?.highlights)
        ? value.about.highlights
        : DEFAULT_SITE_DATA.about.highlights,
      reasons: Array.isArray(value.about?.reasons)
        ? value.about.reasons
        : DEFAULT_SITE_DATA.about.reasons,
    },
    contact: {
      ...DEFAULT_SITE_DATA.contact,
      ...(value.contact ?? {}),
      phone:
        !value.contact?.phone || LEGACY_PHONE_VARIANTS.includes(value.contact.phone)
          ? DEFAULT_SITE_DATA.contact.phone
          : value.contact.phone,
      whatsapp:
        !value.contact?.whatsapp ||
        LEGACY_PHONE_VARIANTS.includes(value.contact.whatsapp)
          ? DEFAULT_SITE_DATA.contact.whatsapp
          : value.contact.whatsapp,
      email:
        !value.contact?.email || value.contact.email === LEGACY_PLACEHOLDER_EMAIL
          ? DEFAULT_SITE_DATA.contact.email
          : value.contact.email,
    },
    events:
      Array.isArray(value.events)
        ? value.events.map((eventItem) => {
            const safeEvent =
              eventItem && typeof eventItem === 'object' ? eventItem : {}

            return {
              ...createEmptyEvent(),
              ...safeEvent,
              videoUrl: typeof safeEvent.videoUrl === 'string' ? safeEvent.videoUrl : '',
              images: Array.isArray(safeEvent.images) ? safeEvent.images : [],
            }
          })
        : DEFAULT_SITE_DATA.events,
  }
}

export function readStoredSiteData() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return DEFAULT_SITE_DATA
    }

    return normalizeSiteData(JSON.parse(storedValue))
  } catch {
    return DEFAULT_SITE_DATA
  }
}

export function readAdminSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export function readAdminToken() {
  try {
    return sessionStorage.getItem(SESSION_TOKEN_KEY) ?? ''
  } catch {
    return ''
  }
}

export function readStoredTheme() {
  return 'dark'
}

export function createEventId() {
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function compressImage(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onerror = () => reject(new Error('Could not read image'))

    fileReader.onload = () => {
      const image = new Image()

      image.onerror = () => reject(new Error('Could not load image'))

      image.onload = () => {
        const maxDimension = 1600
        let { width, height } = image

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else if (height >= width && height > maxDimension) {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')

        if (!context) {
          reject(new Error('Canvas is not supported on this device'))
          return
        }

        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }

      image.src = fileReader.result
    }

    fileReader.readAsDataURL(file)
  })
}

export function compressImageToBlob(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onerror = () => reject(new Error('Could not read image'))

    fileReader.onload = () => {
      const image = new Image()

      image.onerror = () => reject(new Error('Could not load image'))

      image.onload = () => {
        const maxDimension = 1600
        let { width, height } = image

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else if (height >= width && height > maxDimension) {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')

        if (!context) {
          reject(new Error('Canvas is not supported on this device'))
          return
        }

        context.drawImage(image, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not export image'))
              return
            }
            resolve(blob)
          },
          'image/jpeg',
          0.82,
        )
      }

      image.src = fileReader.result
    }

    fileReader.readAsDataURL(file)
  })
}

export function createWhatsAppLink(value) {
  const digits = value.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : '#contact'
}

export function createWhatsAppBookingLink(phone, bookingDetails) {
  const baseUrl = createWhatsAppLink(phone)

  if (baseUrl === '#contact') {
    return baseUrl
  }

  const lines = [
    'Hello Maneesh Events, I want to book decoration.',
    '',
    `Customer Name: ${bookingDetails.customerName}`,
    `Phone Number: ${bookingDetails.customerPhone}`,
    `Event Type: ${bookingDetails.eventType}`,
    `Event Date: ${bookingDetails.eventDate || 'Not shared yet'}`,
    `Venue / Location: ${bookingDetails.eventLocation || 'Not shared yet'}`,
    `Message: ${bookingDetails.message || 'No extra details'}`,
  ]

  return `${baseUrl}?text=${encodeURIComponent(lines.join('\n'))}`
}
