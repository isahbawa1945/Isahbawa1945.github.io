import {
    db,
    doc,
    getDoc,
    setDoc
} from "./firebase.js";

// Protect page
if (localStorage.getItem("adminLoggedIn") !== "true") {
    alert("Please login first.");
    window.location.href = "login.html";
}

const schoolName = document.getElementById("schoolName");
const schoolAddress = document.getElementById("schoolAddress");
const schoolPhone = document.getElementById("schoolPhone");
const schoolEmail = document.getElementById("schoolEmail");

const adminUsername = document.getElementById("adminUsername");
const adminPassword = document.getElementById("adminPassword");

const admissionStatus = document.getElementById("admissionStatus");

const saveBtn = document.getElementById("saveBtn");

// Load Settings
async function loadSettings() {

    try {

        const settingsRef = doc(db, "settings", "school");

        const snap = await getDoc(settingsRef);

        if (snap.exists()) {

            const data = snap.data();

            schoolName.value = data.schoolName || "";
            schoolAddress.value = data.schoolAddress || "";
            schoolPhone.value = data.schoolPhone || "";
            schoolEmail.value = data.schoolEmail || "";

            adminUsername.value = data.adminUsername || "";
            adminPassword.value = data.adminPassword || "";

            admissionStatus.value = data.admissionStatus || "Open";

        }

    } catch (error) {

        console.error(error);

        alert("Unable to load settings.");

    }

}

// Save Settings
saveBtn.addEventListener("click", async () => {

    try {

        await setDoc(doc(db, "settings", "school"), {

            schoolName: schoolName.value,
            schoolAddress: schoolAddress.value,
            schoolPhone: schoolPhone.value,
            schoolEmail: schoolEmail.value,

            adminUsername: adminUsername.value,
            adminPassword: adminPassword.value,

            admissionStatus: admissionStatus.value

        });

        alert("Settings saved successfully.");

    } catch (error) {

        console.error(error);

        alert("Failed to save settings.");

    }

});

loadSettings();