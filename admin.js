// Check if admin is logged in
if (localStorage.getItem("adminLoggedIn") !== "true") {
    alert("Please login first.");
    window.location.href = "login.html";
}

import {
    db,
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "./firebase.js";

const table = document.getElementById("students");
const total = document.getElementById("total");
const pending = document.getElementById("pending");
const approved = document.getElementById("approved");
const rejected = document.getElementById("rejected");
const search = document.getElementById("search");
const logoutBtn = document.getElementById("logoutBtn");

let students = [];

async function loadStudents() {

    try {

        const snapshot = await getDocs(collection(db, "admissions"));

        students = [];

        snapshot.forEach((studentDoc) => {

            students.push({
                id: studentDoc.id,
                ...studentDoc.data()
            });

        });

        renderStudents(students);

    } catch (error) {

        console.error(error);
        alert("Failed to load students.");

    }

}

function renderStudents(data) {

    table.innerHTML = "";

    let totalCount = 0;
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;

    data.forEach(student => {

        totalCount++;

        const status = student.status || "Pending";

        if (status === "Pending") pendingCount++;
        if (status === "Approved") approvedCount++;
        if (status === "Rejected") rejectedCount++;

        let statusColor = "orange";

        if (status === "Approved") statusColor = "green";
        if (status === "Rejected") statusColor = "red";

        table.innerHTML += `

<tr>

<td>${student.applicationNumber || ""}</td>

<td>${student.fullName || ""}</td>

<td>${student.studentClass || ""}</td>

<td style="color:${statusColor};font-weight:bold;">
${status}
</td>

<td>

<button onclick="viewStudent('${student.id}')">
👁 View
</button>

<button onclick="approveStudent('${student.id}')">
✅
</button>

<button onclick="rejectStudent('${student.id}')">
❌
</button>

<button onclick="deleteStudent('${student.id}')">
🗑
</button>

</td>

</tr>

`;

    });

    total.textContent = totalCount;
    pending.textContent = pendingCount;
    approved.textContent = approvedCount;
    rejected.textContent = rejectedCount;

}

window.viewStudent = function(id) {

    window.location.href = `view.html?id=${id}`;

};

window.approveStudent = async function(id) {

    if (!confirm("Approve this student's admission?")) return;

    try {

        await updateDoc(doc(db, "admissions", id), {
            status: "Approved"
        });

        alert("Student Approved Successfully.");

        loadStudents();

    } catch (error) {

        console.error(error);
        alert("Unable to approve student.");

    }

};

window.rejectStudent = async function(id) {

    if (!confirm("Reject this student's admission?")) return;

    try {

        await updateDoc(doc(db, "admissions", id), {
            status: "Rejected"
        });

        alert("Student Rejected Successfully.");

        loadStudents();

    } catch (error) {

        console.error(error);
        alert("Unable to reject student.");

    }

};

window.deleteStudent = async function(id) {

    if (!confirm("Delete this application permanently?")) return;

    try {

        await deleteDoc(doc(db, "admissions", id));

        alert("Application Deleted Successfully.");

        loadStudents();

    } catch (error) {

        console.error(error);
        alert("Unable to delete application.");

    }

};

search.addEventListener("keyup", () => {

    const keyword = search.value.toLowerCase();

    const filtered = students.filter(student => {

        return (
            (student.fullName || "").toLowerCase().includes(keyword) ||
            (student.applicationNumber || "").toLowerCase().includes(keyword)
        );

    });

    renderStudents(filtered);

});

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("adminLoggedIn");

            window.location.href = "login.html";

        }

    });

}



// ===========================
// EXPORT STUDENTS TO EXCEL (CSV)
// ===========================

const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {

    if (students.length === 0) {
        alert("No student records available.");
        return;
    }

    let csv =
`Application Number,Student Name,Date of Birth,Gender,State,LGA,Class,Parent Name,Phone,Email,Address,Status\n`;

    students.forEach(student => {

        csv += `"${student.applicationNumber || ""}",`;
        csv += `"${student.fullName || ""}",`;
        csv += `"${student.dob || ""}",`;
        csv += `"${student.gender || ""}",`;
        csv += `"${student.state || ""}",`;
        csv += `"${student.lga || ""}",`;
        csv += `"${student.studentClass || ""}",`;
        csv += `"${student.parentName || ""}",`;
        csv += `"${student.phone || ""}",`;
        csv += `"${student.email || ""}",`;
        csv += `"${student.address || ""}",`;
        csv += `"${student.status || "Pending"}"\n`;

    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Student_Admissions.csv";

    link.click();

});


loadStudents();