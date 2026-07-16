import {
    db,
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "./firebase.js";

const saveBtn = document.getElementById("savePayment");
const applicationInput = document.getElementById("applicationNumber");

// Automatically load student details
applicationInput.addEventListener("input", async () => {

    const applicationNumber = applicationInput.value.trim();

    if (applicationNumber === "") {
        document.getElementById("studentName").value = "";
        document.getElementById("studentClass").value = "";
        document.getElementById("totalFees").value = "";
        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "admissions"));

        let found = false;

        snapshot.forEach((studentDoc) => {

            const student = studentDoc.data();

            if (student.applicationNumber === applicationNumber) {

                found = true;

                document.getElementById("studentName").value = student.fullName;
                document.getElementById("studentClass").value = student.studentClass;

                let totalFee = 0;

                switch (student.studentClass) {

                    case "Beginners":
                        totalFee = 15000;
                        break;

                    case "Intermediate":
                        totalFee = 20000;
                        break;

                    case "Advanced":
                        totalFee = 25000;
                        break;

                    case "Tahfiz":
                        totalFee = 30000;
                        break;

                    default:
                        totalFee = 0;

                }

                document.getElementById("totalFees").value = totalFee;

            }

        });

        if (!found) {

            document.getElementById("studentName").value = "";
            document.getElementById("studentClass").value = "";
            document.getElementById("totalFees").value = "";

        }

    } catch (error) {

        console.error(error);
        alert("Error loading student information.");

    }

});

// Save Payment
saveBtn.addEventListener("click", async () => {

    const applicationNumber = document.getElementById("applicationNumber").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();

    const feeType = document.getElementById("feeType").value;
    const session = document.getElementById("session").value;
    const term = document.getElementById("term").value;

    const totalFees = Number(document.getElementById("totalFees").value);
    const amountPaid = Number(document.getElementById("amountPaid").value);

    const paymentMethod = document.getElementById("paymentMethod").value;

    if (
        applicationNumber === "" ||
        studentName === "" ||
        studentClass === "" ||
        feeType === "" ||
        term === "" ||
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
            feeType,
            session,
            term,
            totalFees,
            amountPaid,
            balance,
            paymentMethod,
            paymentDate: new Date().toLocaleDateString(),
            createdAt: serverTimestamp()

        });

        alert("School fee payment saved successfully!");

        window.location.href = `receipt.html?receipt=${receiptNumber}`;

    } catch (error) {

        console.error(error);
        alert("Error saving payment.\n\n" + error.message);

    }

});