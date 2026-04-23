import { getApps, initializeApp } from 'firebase/app'
import { getDatabase, push, ref, set } from 'firebase/database'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'

function getFirebaseConfig() {
  const apiKey = (import.meta.env.VITE_FIREBASE_API_KEY ?? '').trim()
  const authDomain = (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '').trim()
  const projectId = (import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '').trim()
  const storageBucket = (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '').trim()
  const messagingSenderId = (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '').trim()
  const appId = (import.meta.env.VITE_FIREBASE_APP_ID ?? '').trim()
  const databaseURL = (import.meta.env.VITE_FIREBASE_DATABASE_URL ?? '').trim()

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    databaseURL,
  }
}

export function isFirebaseConfigured() {
  const { apiKey, authDomain, projectId, appId } = getFirebaseConfig()
  return Boolean(apiKey && authDomain && projectId && appId)
}

function getFirebaseApp() {
  const existing = getApps()
  if (existing.length > 0) {
    return existing[0]
  }

  const config = getFirebaseConfig()
  return initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket || undefined,
    messagingSenderId: config.messagingSenderId || undefined,
    appId: config.appId,
    databaseURL: config.databaseURL || undefined,
  })
}

export async function recordCloudinaryUpload({ url, file, eventDraft }) {
  if (!isFirebaseConfigured()) {
    return null
  }

  const config = getFirebaseConfig()
  const payload = {
    url,
    source: 'cloudinary',
    originalName: file?.name || '',
    contentType: file?.type || '',
    size: typeof file?.size === 'number' ? file.size : null,
    eventId: eventDraft?.id || '',
    eventTitle: (eventDraft?.title || '').trim(),
  }

  const app = getFirebaseApp()

  if (config.databaseURL) {
    const database = getDatabase(app)
    const recordRef = push(ref(database, 'cloudinaryUploads'))
    await set(recordRef, {
      ...payload,
      createdAt: Date.now(),
    })
    return { id: recordRef.key, driver: 'realtime' }
  }

  const firestore = getFirestore(app)
  const docRef = await addDoc(collection(firestore, 'cloudinaryUploads'), {
    ...payload,
    createdAt: serverTimestamp(),
  })
  return { id: docRef.id, driver: 'firestore' }
}

