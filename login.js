function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Change these to your own login details
    const adminUsername = "Ismaila Isah";
const adminPassword = "Arkanul2026";

    if (username === adminUsername && password === adminPassword) {

        // Save login status
        localStorage.setItem("adminLoggedIn", "true");

        // Go to the dashboard
        window.location.href = "admin.html";

    } else {

        document.getElementById("error").textContent =
        "Invalid username or password.";

    }

}