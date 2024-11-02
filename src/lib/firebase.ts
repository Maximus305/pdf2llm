// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add Firestore import

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBODg6JLhmPv4i_Px8Vu2mJR8MACrT9pvg",
    authDomain: "pdf2llm.firebaseapp.com",
    projectId: "pdf2llm",
    storageBucket: "pdf2llm.firebasestorage.app",
    messagingSenderId: "269729537576",
    appId: "1:269729537576:web:33f72accd6c9c170489f1d",
    measurementId: "G-7V63W9354J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Export all services
export { storage, auth, db };
export default app;