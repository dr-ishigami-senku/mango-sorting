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
        const accounts = database.ref('accounts/');

        accounts.orderByChild('archive').equalTo(false).once('value', (snapshot) => {
            const values = snapshot.val();
            const accountExists = Object.keys(values).some(key => values[key].username === email.value);

            if (accountExists) {
                accountKey = Object.keys(values).find(key => values[key].username === email.value);
                localStorage.setItem("name", accountKey);
                if (accountKey === "Admin")
                    window.location.href = "/admin-dashboard.html";
                else {
                    window.location.href = "/merchant-dashboard.html";
                }
            } else {
                console.log("Your account has been archived")
            };
        });
    }) //promise
    .catch(function (error) {
        const toastElement = document.getElementById('toast-error');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    });
});