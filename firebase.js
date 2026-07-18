// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

// Firebase Services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export Services
export { app, db, storage, auth };
