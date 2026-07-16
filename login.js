function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const adminUsername = "Ismaila Isah";
    const adminPassword = "Arkanul2026";

    if (username === adminUsername && password === adminPassword) {

        localStorage.setItem("adminLoggedIn", "true");

        window.location.href = "admin.html";

    } else {

        document.getElementById("error").textContent =
        "Invalid username or password.";

    }

}

document.getElementById("loginBtn").addEventListener("click", login);

document.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        login();
    }

});