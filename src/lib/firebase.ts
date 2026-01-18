import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp9laqrjChUGekKA3d073IC2EUE_hIiYs",
  authDomain: "wedding-app-8f9e5.firebaseapp.com",
  projectId: "wedding-app-8f9e5",
  storageBucket: "wedding-app-8f9e5.firebasestorage.app",
  messagingSenderId: "80895018026",
  appId: "1:80895018026:web:f9754d5e081039865b2f53",
  measurementId: "G-EQDCK015B1"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)

export default app
