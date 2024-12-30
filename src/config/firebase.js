// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2fSdncL3SefP977Kz-2hMIZh3AqDWfxM",
    authDomain: "badmintionsports.firebaseapp.com",
    projectId: "badmintionsports",
    storageBucket: "badmintionsports.firebasestorage.app",
    messagingSenderId: "491758388824",
    appId: "1:491758388824:web:e040c78c821966f12bec2d",
    measurementId: "G-KGPFFHMX46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)

export { analytics, auth, firestore }