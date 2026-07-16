import {
    db,
    collection,
    getDocs,
    addDoc
} from "./firebase.js";

const saveBtn = document.getElementById("saveResult");

saveBtn.addEventListener("click", async () => {

    const applicationNumber = document.getElementById("searchStudent").value.trim();

    if (applicationNumber === "") {
        alert("Please enter the student's Application Number.");
        return;
    }

    // Find the student
    const snapshot = await getDocs(collection(db, "admissions"));

    let studentFound = false;

    snapshot.forEach(async (studentDoc) => {

        const student = studentDoc.data();

        if (student.applicationNumber === applicationNumber) {

            studentFound = true;

            const result = {

                studentId: studentDoc.id,
                applicationNumber: student.applicationNumber,
                fullName: student.fullName,
                studentClass: student.studentClass,

                quran: Number(document.getElementById("quran").value) || 0,
                hadith: Number(document.getElementById("hadith").value) || 0,
                tawheed: Number(document.getElementById("tawheed").value) || 0,
                fiqh: Number(document.getElementById("fiqh").value) || 0,
                arabic: Number(document.getElementById("arabic").value) || 0,
                english: Number(document.getElementById("english").value) || 0,
                math: Number(document.getElementById("math").value) || 0

            };

            result.total =
                result.quran +
                result.hadith +
                result.tawheed +
                result.fiqh +
                result.arabic +
                result.english +
                result.math;

            result.average = (result.total / 7).toFixed(2);

            await addDoc(collection(db, "results"), result);

            alert("Result saved successfully.");

        }

    });

    if (!studentFound) {
        alert("Student not found.");
    }

});