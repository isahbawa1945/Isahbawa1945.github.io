import { db, storage } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const form = document.getElementById("admissionForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = document.querySelector("button[type='submit']");

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting... Please wait";

    try {

        // Student Information
        const surname = document.getElementById("surname").value.trim();
        const firstname = document.getElementById("firstname").value.trim();
        const othername = document.getElementById("othername").value.trim();
        const gender = document.getElementById("gender").value;
        const dob = document.getElementById("dob").value;
        const state = document.getElementById("state").value.trim();
        const lga = document.getElementById("lga").value.trim();
        const address = document.getElementById("address").value.trim();

        // Academic Information
        const classApplying = document.getElementById("classApplying").value;
        const previousSchool = document.getElementById("previousSchool").value.trim();
        const previousClass = document.getElementById("previousClass").value.trim();

        // Parent Information
        const parentName = document.getElementById("parentName").value.trim();
        const relationship = document.getElementById("relationship").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();
        const email = document.getElementById("email").value.trim();
        const occupation = document.getElementById("occupation").value.trim();
        const parentAddress = document.getElementById("parentAddress").value.trim();

        // Files
        const passportFile = document.getElementById("passport").files[0];
        const birthFile = document.getElementById("birthCertificate").files[0];
        const resultFile = document.getElementById("previousResult").files[0];

        let passportURL = "";
        let birthCertificateURL = "";
        let previousResultURL = "";

        // Upload Passport
        if (passportFile) {
            const passportRef = ref(storage, "passports/" + Date.now() + "_" + passportFile.name);
            await uploadBytes(passportRef, passportFile);
            passportURL = await getDownloadURL(passportRef);
        }

        // Upload Birth Certificate
        if (birthFile) {
            const birthRef = ref(storage, "birth-certificates/" + Date.now() + "_" + birthFile.name);
            await uploadBytes(birthRef, birthFile);
            birthCertificateURL = await getDownloadURL(birthRef);
        }

        // Upload Previous Result (Optional)
        if (resultFile) {
            const resultRef = ref(storage, "previous-results/" + Date.now() + "_" + resultFile.name);
            await uploadBytes(resultRef, resultFile);
            previousResultURL = await getDownloadURL(resultRef);
        }

        // Generate Application Number
        const applicationNumber =
            "MAI-" +
            new Date().getFullYear() +
            "-" +
            Math.floor(100000 + Math.random() * 900000);

        // Save to Firestore
        await addDoc(collection(db, "admissions"), {

            applicationNumber,

            surname,
            firstname,
            othername,

            gender,
            dob,
            state,
            lga,
            address,

            classApplying,
            previousSchool,
            previousClass,

            parentName,
            relationship,
            phone,
            whatsapp,
            email,
            occupation,
            parentAddress,

            passportURL,
            birthCertificateURL,
            previousResultURL,

            status: "Pending Review",

            createdAt: serverTimestamp()

        });

        // Save for acknowledgement page
        localStorage.setItem("admissionData", JSON.stringify({

            applicationNumber,
            surname,
            firstname,
            othername,
            gender,
            classApplying

        }));

        // Save for acknowledgement page
localStorage.setItem("admissionData", JSON.stringify({
    applicationNumber,
    surname,
    firstname,
    othername,
    gender,
    classApplying
}));

alert("Application submitted successfully!\nClick OK to view your acknowledgement slip.");

window.location.href = "./acknowledgement.html";