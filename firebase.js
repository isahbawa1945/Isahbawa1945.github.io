// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkqdWH8i6yH5bjYGYVtuZaoLRov-Nmmeg",
    authDomain: "madarasatul-arkanul-islam.firebaseapp.com",
    projectId: "madarasatul-arkanul-islam",
    storageBucket: "madarasatul-arkanul-islam.firebasestorage.app",
    messagingSenderId: "128596209298",
    appId: "1:128596209298:web:943f249d732975ebe2404b",
    measurementId: "G-2TGLVJR4EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export everything for use in other files
export {
    db,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
};