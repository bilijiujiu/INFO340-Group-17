import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const requiredConfigKeys = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'appId']
const hasFirebaseConfig = requiredConfigKeys.every((key) => Boolean(firebaseConfig[key]))

let app = null
let database = null
let auth = null
let googleProvider = null
let firebaseConfigError = ''

if (hasFirebaseConfig) {
  try {
    app = initializeApp(firebaseConfig)
    database = getDatabase(app)
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
  } catch (error) {
    firebaseConfigError = error.message
  }
} else {
  firebaseConfigError =
    'Firebase is not configured yet. Add VITE_FIREBASE_* values to a local .env file to persist changes.'
}

export { app, database, auth, googleProvider, firebaseConfigError, hasFirebaseConfig }
