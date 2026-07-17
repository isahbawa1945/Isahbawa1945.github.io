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

            // Read passport first
            let passportBase64 = "";

            const passport = formData.get("passport");

            if (passport && passport.size > 0) {

                passportBase64 = await new Promise((resolve) => {

                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);

                    reader.readAsDataURL(passport);

                });

            }

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

    password: "0000",

    status: "Pending",

};

    

            // Save to Firestore
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
            localStorage.setItem("passport", passportBase64);

            alert("Application Submitted Successfully!");

            window.location.href = `acknowledgement.html?id=${docRef.id}`;

        } catch (error) {

            console.error(error);

            alert("Error submitting application.\n\n" + error.message);

        }

    });

}