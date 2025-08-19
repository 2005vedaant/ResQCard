import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Replace with your Firebase config (env or inline during setup)
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_API_KEY || 'demo',
	authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN || 'demo.firebaseapp.com',
	projectId: import.meta.env.VITE_FB_PROJECT_ID || 'demo',
	storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET || 'demo.appspot.com',
	messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID || '0',
	appId: import.meta.env.VITE_FB_APP_ID || '0:0:web:demo',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)


