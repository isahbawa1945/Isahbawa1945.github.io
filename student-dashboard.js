import {
    db,
    doc,
    getDoc
} from "./firebase.js";

const studentId = new URLSearchParams(window.location.search).get("id");

if (!studentId) {
    alert("No student selected.");
    window.location.href = "student-login.html";
}

try {

    const studentRef = doc(db, "admissions", studentId);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {

        alert("Student record not found.");
        window.location.href = "student-login.html";

    } else {

        const student = studentSnap.data();

        document.getElementById("studentName").textContent =
            "Welcome, " + student.fullName;

        document.getElementById("profileLink").href =
            `view.html?id=${studentId}`;

        document.getElementById("ackLink").href =
            `acknowledgement.html?id=${studentId}`;

        document.getElementById("admissionLink").href =
            `admission-letter.html?id=${studentId}`;

        document.getElementById("idCardLink").href =
            `id-card.html?id=${studentId}`;

        // Change these later when those pages are ready
        document.getElementById("feesLink").href = "#";
        document.getElementById("resultLink").href = "#";

    }

} catch (error) {

    console.error(error);
    alert("Error loading dashboard.");

}

document.getElementById("logout").addEventListener("click", () => {

    localStorage.removeItem("studentId");

    window.location.href = "student-login.html";

});