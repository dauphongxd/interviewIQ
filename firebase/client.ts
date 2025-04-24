import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAob34Icq1N7v-rIjjf5ZtpP9tGCqqSjsw",
    authDomain: "interviewiq-7b124.firebaseapp.com",
    projectId: "interviewiq-7b124",
    storageBucket: "interviewiq-7b124.firebasestorage.app",
    messagingSenderId: "221629951717",
    appId: "1:221629951717:web:6278637802a2f23ebd2e0c",
    measurementId: "G-Y0NFW0P6GH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);