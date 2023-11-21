document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the values from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    // Compare the input password with the secret password
    if (username === "easyjetvirtual" && password === "easyjetvirtual") {
        window.location.href = "./crew/crew.html"
    } else {
        alert("Login failed. Please check your credentials.");
    }
});

function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML = message;
}