import {
    db,
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "./firebase.js";

const saveBtn = document.getElementById("savePayment");

const applicationInput = document.getElementById("applicationNumber");

applicationInput.addEventListener("input", async () => {

    const applicationNumber = applicationInput.value.trim();

    if (applicationNumber === "") return;

    try {

        const snapshot = await getDocs(collection(db, "admissions"));

        let found = false;

        snapshot.forEach((studentDoc) => {

            const student = studentDoc.data();

            if (student.applicationNumber === applicationNumber) {

                found = true;

                document.getElementById("studentName").value = student.fullName;
                document.getElementById("studentClass").value = student.studentClass;

            }

        });

        if (!found) {

            alert("Student not found.");

            document.getElementById("studentName").value = "";
            document.getElementById("studentClass").value = "";

        }

    } catch (error) {

        console.error(error);

        alert("Error loading student information.");

    }

});

saveBtn.addEventListener("click", async () => {

    const applicationNumber = document.getElementById("applicationNumber").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();

    const totalFees = Number(document.getElementById("totalFees").value);
    const amountPaid = Number(document.getElementById("amountPaid").value);

    const paymentMethod = document.getElementById("paymentMethod").value;

    if (
        applicationNumber === "" ||
        studentName === "" ||
        studentClass === "" ||
        totalFees <= 0 ||
        amountPaid <= 0
    ) {
        alert("Please complete all fields.");
        return;
    }

    const balance = totalFees - amountPaid;

    const receiptNumber = "RCP" + Date.now();

    try {

        await addDoc(collection(db, "fees"), {

            receiptNumber,
            applicationNumber,
            studentName,
            studentClass,
            totalFees,
            amountPaid,
            balance,
            paymentMethod,
            paymentDate: new Date().toLocaleDateString(),
            createdAt: serverTimestamp()

        });

        alert("School fee payment saved successfully!");

        localStorage.setItem("receiptNumber", receiptNumber);


window.location.href = `receipt.html?receipt=${receiptNumber}`;


        document.getElementById("applicationNumber").value = "";
        document.getElementById("studentName").value = "";
        document.getElementById("studentClass").value = "";
        document.getElementById("totalFees").value = "";
        document.getElementById("amountPaid").value = "";
        document.getElementById("paymentMethod").selectedIndex = 0;

    } catch (error) {

        console.error(error);

        alert("Error saving payment.\n\n" + error.message);

    }

});