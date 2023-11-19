// Import Firebase SDK functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object with API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyDCkfofPqwJDvOt_y3ah772-SKWJ2eIOfY",
  authDomain: "pokemonapp-8fb3e.firebaseapp.com",
  projectId: "pokemonapp-8fb3e",
  storageBucket: "pokemonapp-8fb3e.appspot.com",
  messagingSenderId: "1036225049555",
  appId: "1:1036225049555:web:ae084534983e94f2d33526",
  measurementId: "G-PVTCYCJQGS"
};

// Initialize Firebase app using the provided configuration
const app = initializeApp(firebaseConfig);

// Get Firebase authentication instance
const auth = getAuth(app);

// Get Firebase Firestore database instance
const db = getFirestore(app);

// Export Firebase authentication and Firestore instances
export { auth, db };
