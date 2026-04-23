import { getApps, initializeApp } from 'firebase/app'

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

export function getFirebaseDatabaseUrl() {
  return getFirebaseConfig().databaseURL
}

export function getFirebaseApp() {
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

