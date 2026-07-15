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

let students = [];

async function loadStudents() {

    const snapshot = await getDocs(collection(db, "admissions"));

    students = [];

    snapshot.forEach((studentDoc) => {

        students.push({
            id: studentDoc.id,
            ...studentDoc.data()
        });

    });

    renderStudents(students);

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

        let statusClass = "status-pending";

        if (status === "Approved") statusClass = "status-approved";
        if (status === "Rejected") statusClass = "status-rejected";

        table.innerHTML += `
        <tr>

            <td>${student.applicationNumber}</td>

            <td>${student.fullName}</td>

            <td>${student.studentClass}</td>

            <td class="${statusClass}">
                ${status}
            </td>

            <td>

                <button class="view"
                    onclick="viewStudent('${student.id}')">
                    View
                </button>

                <button class="approve"
                    onclick="approveStudent('${student.id}')">
                    Approve
                </button>

                <button class="reject"
                    onclick="rejectStudent('${student.id}')">
                    Reject
                </button>

                <button class="delete"
                    onclick="deleteStudent('${student.id}')">
                    Delete
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

window.viewStudent = function(id){

    window.location.href = `view.html?id=${id}`;

}

window.approveStudent = async function(id){

    if(!confirm("Approve this student's admission?")) return;

    await updateDoc(doc(db,"admissions",id),{

        status:"Approved"

    });

    loadStudents();

}
window.rejectStudent = async function(id){

    if(!confirm("Reject this student's admission?")) return;

    await updateDoc(doc(db,"admissions",id),{

        status:"Rejected"

    });

    loadStudents();

}

window.deleteStudent = async function(id){

    if(!confirm("Are you sure you want to permanently delete this application?")) return;

    await deleteDoc(doc(db,"admissions",id));

    alert("Application deleted successfully.");

    loadStudents();

}

search.addEventListener("keyup", () => {

    const keyword = search.value.toLowerCase();

    const filtered = students.filter(student => {

        const fullName = (student.fullName || "").toLowerCase();
        const applicationNumber = (student.applicationNumber || "").toLowerCase();

        return (
            fullName.includes(keyword) ||
            applicationNumber.includes(keyword)
        );

    });

    renderStudents(filtered);

});

loadStudents();
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("adminLoggedIn");

        window.location.href = "login.html";

    }

});