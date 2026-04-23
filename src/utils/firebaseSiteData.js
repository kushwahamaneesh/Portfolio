import {
  get,
  onValue,
  ref as databaseRef,
  set as databaseSet,
} from 'firebase/database'
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import {
  getFirebaseApp,
  getFirebaseDatabaseUrl,
  isFirebaseConfigured,
} from './firebaseClient.js'

function isTruthy(value) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on'
}

function getSiteDataPath() {
  const raw = (import.meta.env.VITE_FIREBASE_SITE_DATA_PATH ?? 'siteData/v1').trim()
  return raw.replace(/^\/+/, '')
}

function resolveFirestoreDocRef(firestore, path) {
  const segments = String(path)
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)

  if (segments.length >= 2 && segments.length % 2 === 0) {
    return doc(firestore, ...segments)
  }

  return doc(firestore, 'siteData', 'v1')
}

export function isFirebaseSiteDataEnabled() {
  return isFirebaseConfigured() && isTruthy(import.meta.env.VITE_FIREBASE_SITE_DATA_ENABLED)
}

export async function fetchSiteDataFromFirebase() {
  if (!isFirebaseSiteDataEnabled()) {
    throw new Error('Firebase site data is not enabled')
  }

  const app = getFirebaseApp()
  const databaseURL = getFirebaseDatabaseUrl()
  const path = getSiteDataPath()

  if (databaseURL) {
    const database = getDatabase(app)
    const snapshot = await get(databaseRef(database, path))
    return snapshot.exists() ? snapshot.val() : {}
  }

  const firestore = getFirestore(app)
  const docRef = resolveFirestoreDocRef(firestore, path)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.data() : {}
}

export async function saveSiteDataToFirebase(siteData) {
  if (!isFirebaseSiteDataEnabled()) {
    throw new Error('Firebase site data is not enabled')
  }

  const app = getFirebaseApp()
  const databaseURL = getFirebaseDatabaseUrl()
  const path = getSiteDataPath()

  if (databaseURL) {
    const database = getDatabase(app)
    await databaseSet(databaseRef(database, path), {
      ...siteData,
      updatedAt: Date.now(),
    })
    return { driver: 'realtime', path }
  }

  const firestore = getFirestore(app)
  const docRef = resolveFirestoreDocRef(firestore, path)
  await setDoc(
    docRef,
    {
      ...siteData,
      updatedAt: serverTimestamp(),
    },
    { merge: false },
  )
  return { driver: 'firestore', doc: path }
}

export function subscribeSiteDataFromFirebase(onData, onError) {
  if (!isFirebaseSiteDataEnabled()) {
    throw new Error('Firebase site data is not enabled')
  }

  const app = getFirebaseApp()
  const databaseURL = getFirebaseDatabaseUrl()
  const path = getSiteDataPath()

  if (databaseURL) {
    const database = getDatabase(app)
    const valueRef = databaseRef(database, path)
    const unsubscribe = onValue(
      valueRef,
      (snapshot) => {
        onData(snapshot.exists() ? snapshot.val() : {})
      },
      (error) => {
        if (typeof onError === 'function') {
          onError(error)
        }
      },
    )
    return unsubscribe
  }

  const firestore = getFirestore(app)
  const docRef = resolveFirestoreDocRef(firestore, path)
  const unsubscribe = onSnapshot(
    docRef,
    (snapshot) => {
      onData(snapshot.exists() ? snapshot.data() : {})
    },
    (error) => {
      if (typeof onError === 'function') {
        onError(error)
      }
    },
  )
  return unsubscribe
}
