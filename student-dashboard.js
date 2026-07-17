import {
    db,
    doc,
    getDoc,
    collection,
    getDocs
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


document.getElementById("applicationNumber").innerHTML =
"Application No: " + student.applicationNumber;

document.getElementById("studentClass").innerHTML =
"Class: " + student.studentClass;

document.getElementById("studentStatus").innerHTML =
"Status: " + student.status;

if(student.passport){

document.getElementById("studentPassport").src =
student.passport;

}


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




// ================= SCHOOL FEES SUMMARY =================

const feesSnapshot = await getDocs(collection(db, "fees"));

let paymentFound = false;

feesSnapshot.forEach((feeDoc) => {

    const fee = feeDoc.data();

    if (fee.applicationNumber === student.applicationNumber) {

        paymentFound = true;

        document.getElementById("totalFees").textContent =
            "₦" + Number(fee.totalFees).toLocaleString();

        document.getElementById("amountPaid").textContent =
            "₦" + Number(fee.amountPaid).toLocaleString();

        document.getElementById("balance").textContent =
            "₦" + Number(fee.balance).toLocaleString();

        if (fee.balance <= 0) {

            document.getElementById("paymentStatus").textContent =
                "✅ Fully Paid";

        } else {

            document.getElementById("paymentStatus").textContent =
                "🟡 Balance Outstanding";

        }

    }

});

if (!paymentFound) {

    document.getElementById("paymentStatus").textContent =
        "❌ No Payment Record";

}



} catch (error) {

    console.error(error);
    alert("Error loading dashboard.");

}

document.getElementById("logout").addEventListener("click", () => {

    localStorage.removeItem("studentId");

    window.location.href = "student-login.html";

});