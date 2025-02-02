const togglePasswordButton = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePasswordButton && passwordInput) {
    togglePasswordButton.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        if (type === "password") {
            togglePasswordButton.innerHTML = '<i class="far fa-eye-slash" aria-hidden="true"></i>';
        } else {
            togglePasswordButton.innerHTML = '<i class="far fa-eye" aria-hidden="true"></i>';
        }
    });
}

const email = document.getElementById("email");
const signInButton = document.getElementById("signInButton");

signInButton.addEventListener("click", function() {
  firebase.auth().signInWithEmailAndPassword(email.value, passwordInput.value)
    .then(function() {
        window.location.href = "dashboard.html";
    })
    .catch(function(error) {
        const toastElement = document.getElementById('toast-error');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    });
});
