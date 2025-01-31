// Import the functions you need from the SDKs you need
import { initializeApp , getApps } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDllGohHIqVH1BeoDoWXPtij6gtESkfDU4",
    authDomain: "hackops-d8a2a.firebaseapp.com",
    projectId: "hackops-d8a2a",
    storageBucket: "hackops-d8a2a.firebasestorage.app",
    messagingSenderId: "780115724797",
    appId: "1:780115724797:web:69211de9b41d7d88623194",
    measurementId: "G-FZBVW2ZZRR"
  };
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();

const auth = getAuth(app)

export {app , auth }