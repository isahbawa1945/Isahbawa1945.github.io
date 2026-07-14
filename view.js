// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
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

// Get student ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadStudent() {

    if (!id) {
        alert("No student selected.");
        return;
    }

    try {

        const studentRef = doc(db, "admissions", id);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {

            const data = studentSnap.data();

            document.getElementById("app").textContent = data.applicationNumber || "";
            document.getElementById("name").textContent = data.fullName || "";
            document.getElementById("dob").textContent = data.dob || "";
            document.getElementById("gender").textContent = data.gender || "";
            document.getElementById("state").textContent = data.state || "";
            document.getElementById("lga").textContent = data.lga || "";
            document.getElementById("class").textContent = data.studentClass || "";
            document.getElementById("parent").textContent = data.parentName || "";
            document.getElementById("phone").textContent = data.phone || "";
            document.getElementById("email").textContent = data.email || "";
            document.getElementById("address").textContent = data.address || "";
            document.getElementById("info").textContent = data.info || "";

        } else {

            alert("Student record not found.");

        }

    } catch (error) {

        console.error(error);
        alert("Error loading student details.");

    }

}

loadStudent();