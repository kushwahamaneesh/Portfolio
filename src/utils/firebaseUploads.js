import { getDatabase, push, ref, set } from 'firebase/database'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import {
  getFirebaseApp,
  getFirebaseDatabaseUrl,
  isFirebaseConfigured,
} from './firebaseClient.js'

export async function recordCloudinaryUpload({ url, file, eventDraft }) {
  if (!isFirebaseConfigured()) {
    return null
  }

  const databaseURL = getFirebaseDatabaseUrl()
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

  if (databaseURL) {
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
