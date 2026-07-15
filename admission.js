import {
    db,
    collection,
    addDoc,
    serverTimestamp
} from "./firebase.js";

const form = document.getElementById("admissionForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData(form);

            const applicationNumber = "ARK" + Date.now();

            const student = {

                applicationNumber,

                fullName: formData.get("fullName"),
                dob: formData.get("dob"),
                gender: formData.get("gender"),
                state: formData.get("state"),
                lga: formData.get("lga"),
                studentClass: formData.get("studentClass"),
                parentName: formData.get("parentName"),
                phone: formData.get("phone"),
                email: formData.get("email"),
                address: formData.get("address"),
                info: formData.get("info"),

                status: "Pending",

                createdAt: serverTimestamp()

            };

            // Save to Firebase
            const docRef = await addDoc(collection(db, "admissions"), student);

            // Save locally
            localStorage.setItem("studentId", docRef.id);
            localStorage.setItem("applicationNumber", student.applicationNumber);
            localStorage.setItem("fullName", student.fullName);
            localStorage.setItem("dob", student.dob);
            localStorage.setItem("gender", student.gender);
            localStorage.setItem("state", student.state);
            localStorage.setItem("lga", student.lga);
            localStorage.setItem("studentClass", student.studentClass);
            localStorage.setItem("parentName", student.parentName);
            localStorage.setItem("phone", student.phone);
            localStorage.setItem("email", student.email);
            localStorage.setItem("address", student.address);
            localStorage.setItem("info", student.info);

            // Passport
            const passport = formData.get("passport");

            if (passport && passport.size > 0) {

                const reader = new FileReader();

                reader.onload = function () {

                    localStorage.setItem("passport", reader.result);

                    alert("Application Submitted Successfully!");

                    window.location.href = `acknowledgement.html?id=${docRef.id}`;

                };

                reader.readAsDataURL(passport);

            } else {

                localStorage.removeItem("passport");

                alert("Application Submitted Successfully!");

                window.location.href = `acknowledgement.html?id=${docRef.id}`;

            }

        } catch (error) {

            console.error(error);

            alert("Error submitting application.\n\n" + error.message);

        }

    });

}