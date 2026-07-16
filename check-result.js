import {
    db,
    collection,
    getDocs
} from "./firebase.js";

const checkBtn = document.getElementById("checkBtn");

checkBtn.addEventListener("click", async () => {

    const applicationNumber = document
        .getElementById("applicationNumber")
        .value
        .trim();

    if (applicationNumber === "") {
        alert("Please enter your Application Number.");
        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "results"));

        let found = false;

        snapshot.forEach((doc) => {

            const result = doc.data();

            if (result.applicationNumber === applicationNumber) {

                found = true;

                document.getElementById("studentName").textContent = result.fullName;
                document.getElementById("appNo").textContent = result.applicationNumber;
                document.getElementById("studentClass").textContent = result.studentClass;

                const scores = document.getElementById("scores");

                scores.innerHTML = `
<tr><td>Qur'an</td><td>${result.quran}</td></tr>
<tr><td>Hadith</td><td>${result.hadith}</td></tr>
<tr><td>Tawheed</td><td>${result.tawheed}</td></tr>
<tr><td>Fiqh</td><td>${result.fiqh}</td></tr>
<tr><td>Arabic</td><td>${result.arabic}</td></tr>
<tr><td>English</td><td>${result.english}</td></tr>
<tr><td>Mathematics</td><td>${result.math}</td></tr>
                `;

                document.getElementById("total").textContent = result.total;
                document.getElementById("average").textContent = result.average;

                document.getElementById("result").style.display = "block";

            }

        });

        if (!found) {

            alert("Result not found.");

            document.getElementById("result").style.display = "none";

        }

    } catch (error) {

        console.error(error);

        alert("Error loading result.");

    }

});