// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase configuration
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

const form = document.getElementById("admissionForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const student = {
        fullName: formData.get("fullName"),
        dob: formData.get("dob"),
        gender: formData.get("gender"),
        state: formData.get("state"),
        lga: formData.get("lga"),
        studentClass: formData.get("studentClass"),
        parentName: formData.get("parentName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        address: formData.get("address"),
        info: formData.get("info"),
        createdAt: new Date()
    };

    try {
        await addDoc(collection(db, "admissions"), student);

        alert("Application submitted successfully!");

        form.reset();

    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
});