import {
    db,
    collection,
    getDocs
} from "./firebase.js";

const receiptNumber = new URLSearchParams(window.location.search).get("receipt");

if (!receiptNumber) {
    alert("No receipt selected.");
    throw new Error("Receipt number missing");
}

try {

    const snapshot = await getDocs(collection(db, "fees"));

    let found = false;

    snapshot.forEach((doc) => {

        const data = doc.data();

        if (data.receiptNumber === receiptNumber) {

            found = true;

            document.getElementById("receiptNumber").textContent = data.receiptNumber;
            document.getElementById("applicationNumber").textContent = data.applicationNumber;
            document.getElementById("studentName").textContent = data.studentName;
            
            document.getElementById("studentClass").textContent = data.studentClass;
document.getElementById("feeType").textContent = data.feeType;
document.getElementById("session").textContent = data.session;
document.getElementById("term").textContent = data.term;

document.getElementById("totalFees").textContent = "₦" + Number(data.totalFees).toLocaleString();
            
           
            document.getElementById("amountPaid").textContent = "₦" + Number(data.amountPaid).toLocaleString();
            document.getElementById("balance").textContent = "₦" + Number(data.balance).toLocaleString();
            document.getElementById("paymentMethod").textContent = data.paymentMethod;
            document.getElementById("paymentDate").textContent = data.paymentDate;

        }

    });

    if (!found) {
        alert("Receipt not found.");
    }

} catch (error) {

    console.error(error);
    alert("Error loading receipt.");

}