

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let user = {
        username: username,
        email: email,
        password: password
    };

    console.log("Saving user:", user); // ✅ Debug log
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Redirecting to login...");
    window.location.href = "login.html";
});
