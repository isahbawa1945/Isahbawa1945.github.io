import {
    db,
    collection,
    getDocs
} from "./firebase.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const applicationNumber = document.getElementById("applicationNumber").value.trim();
    const password = document.getElementById("password").value.trim();

    if (applicationNumber === "" || password === "") {
        alert("Please enter your Application Number and Password.");
        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "admissions"));

        let found = false;

        snapshot.forEach((studentDoc) => {

            const student = studentDoc.data();

            if (
                student.applicationNumber === applicationNumber &&
                student.password === password
            ) {

                found = true;

                localStorage.setItem("studentId", studentDoc.id);

                window.location.href = `student-dashboard.html?id=${studentDoc.id}`;

            }

        });

        if (!found) {
            alert("Invalid Application Number or Password.");
        }

    } catch (error) {

        console.error(error);
        alert("Login failed.");

    }

});