const togglePasswordButton = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePasswordButton && passwordInput) {
    togglePasswordButton.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        if (type === "password") {
            togglePasswordButton.className = 'far fa-eye-slash';
        } else {
            togglePasswordButton.className = 'far fa-eye';
        };
    });
};

const email = document.getElementById("email");
const signInButton = document.getElementById("signInButton");

signInButton.addEventListener("click", function () {
    firebase.auth().signInWithEmailAndPassword(email.value, passwordInput.value) //promise
        .then(function () {
            const firstChild = database.ref('merchants/');

            firstChild.orderByChild('archive').equalTo(false).limitToFirst(1).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    const firstKey = Object.keys(snapshot.val())[0];
                    localStorage.setItem("name", firstKey);
                    window.location.href = "dashboard.html";
                } else {
                    window.location.href = "merchants.html";
                };
            });
        }) //promise
        .catch(function (error) {
            const toastElement = document.getElementById('toast-error');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        });
});