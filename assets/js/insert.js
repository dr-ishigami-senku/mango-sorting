const input = document.getElementById("inputData");
const regEmail = document.getElementById("reg-email");
const regPassword = document.getElementById("reg-pword");

function insertData() {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const today = new Date().toLocaleDateString('en-US', options);
    
    const accountRef = database.ref('accounts/' + input.value.charAt(0).toUpperCase() + input.value.slice(1) + '/');

    accountRef.set({
        archive: false,
        username: regEmail.value,
        password: regPassword.value
    });

    const insertRef = database.ref('merchants/' + input.value.charAt(0).toUpperCase() + input.value.slice(1) + '/');

    insertRef.set({
        archive: false
    });

    const dashboardRef = database.ref('merchants/' + input.value.charAt(0).toUpperCase() + input.value.slice(1) + '/dashboard/history/' + today + '/');

    dashboardRef.set({
        raw: {
            small: 0,
            medium: 0,
            large: 0,
            total: 0
        },
        ripe: {
            small: 0,
            medium: 0,
            large: 0,
            total: 0
        },
        decay: {
            total: 0
        }
    });
    
    const tableRef = database.ref('merchants/' + input.value.charAt(0).toUpperCase() + input.value.slice(1) + '/table/history/' + today + '/');
    
    tableRef.set({
        totalRow: 0
    });
}

const togglePasswordButton = document.getElementById("togglePassword");

if (togglePasswordButton && regPassword) {
    togglePasswordButton.addEventListener("click", function () {
        const type = regPassword.getAttribute("type") === "password" ? "text" : "password";
        regPassword.setAttribute("type", type);

        if (type === "password") {
            togglePasswordButton.className = 'far fa-eye-slash';
        } else {
            togglePasswordButton.className = 'far fa-eye';
        };
    });
};


const insertBtn = document.getElementById('insertBtn');
const registerBtn = document.getElementById('regBtn');
const accountModal = new bootstrap.Modal(document.getElementById('create-account'));
const createMessage = document.getElementById("create-title");

insertBtn.addEventListener('click', function () {
    regEmail.value = "";
    regPassword.value = "";
    createMessage.textContent = `Create New Account for "${input.value.charAt(0).toUpperCase() + input.value.slice(1)}"`;
    
    if (input.value !== '') {
        const merchant_list = database.ref('merchants/');
        merchant_list.once('value', (snapshot) => {
            const values = snapshot.val();

            if (values !== null) {
                const textExists = Object.keys(values).includes(input.value.charAt(0).toUpperCase() + input.value.slice(1));

                if (textExists) {
                    const noteModal = new bootstrap.Modal(document.getElementById('note-modal'));
                    noteModal.show();
                } else {
                    accountModal.show();
                }
            } else {
                accountModal.show();
            }
        });
    };
});

registerBtn.addEventListener("click", () => {
    if (regEmail.value != "" && regPassword.value != "") {
        firebase.auth().createUserWithEmailAndPassword(regEmail.value, regPassword.value)
        .then((userCredential) => {
            insertData();
            accountModal.hide();
            input.value = "";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };
});