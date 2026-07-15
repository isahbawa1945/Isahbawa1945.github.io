const loginBtn = document.getElementById("loginBtn");
const error = document.getElementById("error");

// If already logged in, go straight to dashboard
if (localStorage.getItem("adminLoggedIn") === "true") {
    window.location.href = "admin.html";
}

loginBtn.addEventListener("click", login);

// Allow Enter key to login
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        login();
    }
});

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // ===== Change these to your preferred login details =====
    const adminUsername = "Ismaila Isah";
    const adminPassword = "Arkanul2026";
    // =======================================================

    if (username === adminUsername && password === adminPassword) {

        localStorage.setItem("adminLoggedIn", "true");

        alert("Login Successful!");

        window.location.href = "admin.html";

    } else {

        error.textContent = "Invalid username or password.";

        document.getElementById("password").value = "";

    }

}