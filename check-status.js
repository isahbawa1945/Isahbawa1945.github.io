import {
    db,
    collection,
    getDocs
} from "./firebase.js";

const btn = document.getElementById("checkBtn");

btn.addEventListener("click", async () => {

    const appNumber = document.getElementById("applicationNumber").value.trim();

    if (appNumber === "") {
        alert("Please enter your Application Number.");
        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "admissions"));

        let found = false;

        snapshot.forEach((doc) => {

            const student = doc.data();

            if (student.applicationNumber === appNumber) {

                found = true;

                document.getElementById("app").textContent = student.applicationNumber;
                document.getElementById("name").textContent = student.fullName;
                document.getElementById("studentClass").textContent = student.studentClass;

                const statusElement = document.getElementById("status");
                const letterBtn = document.getElementById("letterBtn");

                const status = student.status || "Pending";

                statusElement.textContent = status;

                if (status === "Approved") {

                    statusElement.style.color = "green";
                    statusElement.style.fontWeight = "bold";

                    // Show Admission Letter button
                    letterBtn.style.display = "block";
                    letterBtn.href = `admission-letter.html?id=${doc.id}`;

                } else if (status === "Rejected") {

                    statusElement.style.color = "red";
                    statusElement.style.fontWeight = "bold";

                    // Hide Admission Letter button
                    letterBtn.style.display = "none";

                } else {

                    statusElement.style.color = "orange";
                    statusElement.style.fontWeight = "bold";

                    // Hide Admission Letter button
                    letterBtn.style.display = "none";

                }

                document.getElementById("result").style.display = "block";

            }

        });

        if (!found) {

            alert("Application Number not found.");

            document.getElementById("result").style.display = "none";

            document.getElementById("letterBtn").style.display = "none";

        }

    } catch (error) {

        console.error(error);

        alert("Error checking admission status.");

    }

});