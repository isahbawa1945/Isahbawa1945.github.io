if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc
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

const table = document.getElementById("students");
const total = document.getElementById("total");

async function loadStudents() {

    try {

        const querySnapshot = await getDocs(collection(db, "admissions"));

        table.innerHTML = "";

        total.textContent = querySnapshot.size;

        querySnapshot.forEach((doc) => {

            const data = doc.data();

            table.innerHTML += `
                <tr>
                    <td>${data.applicationNumber || ""}</td>
                    <td>${data.fullName || ""}</td>
                    <td>${data.studentClass || ""}</td>
                    
                    <td>${data.status || "Pending"}</td>
                        <button onclick="window.location.href='view.html?id=${doc.id}'">
                            View
                        </button>

                        <button onclick="approveStudent('${doc.id}')">
                            Approve
                        </button>

                        <button onclick="rejectStudent('${doc.id}')">
                            Reject
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {
        console.error("Error loading students:", error);
    }

}

loadStudents();

const search = document.getElementById("search");

search.addEventListener("keyup", () => {

    const filter = search.value.toLowerCase();

    const rows = document.querySelectorAll("#students tr");

    rows.forEach((row) => {

        const text = row.textContent.toLowerCase();

        row.style.display = text.includes(filter) ? "" : "none";

    });

});
window.approveStudent = async function(id) {
    try {
        await updateDoc(doc(db, "admissions", id), {
            status: "Approved"
        });

        alert("Student approved successfully.");
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
};

window.rejectStudent = async function(id) {
    try {
        await updateDoc(doc(db, "admissions", id), {
            status: "Rejected"
        });

        alert("Student rejected successfully.");
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
};