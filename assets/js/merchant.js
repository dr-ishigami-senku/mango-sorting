const merchantsRef = database.ref().child("merchants/");
const merchantsList = document.querySelector('.merchants-table .table tbody');

merchantsRef.on('value', function (snapshot) {
    merchantsList.innerHTML = '';

    snapshot.forEach(function (item_snapshot) {
        if (item_snapshot.child("archive").val() === false) {
            const row = document.createElement("tr");

            const col1 = document.createElement("td");
            col1.classList.add("text-start", "text-capitalize");
            col1.innerText = item_snapshot.key;

            const col2 = document.createElement("td");
            col2.classList.add("text-end");
            const archBtn = document.createElement("button");
            archBtn.classList.add("btn", "btn-primary", "archive-btn");
            archBtn.type = "button";
            archBtn.setAttribute("data-node", item_snapshot.key);
            archBtn.innerHTML = `<svg class='bi bi-archive-fill' xmlns='http://www.w3.org/2000/svg'  width='1em' height='1em' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5  7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z'></path>
            </svg>`;

            col2.appendChild(archBtn);

            row.appendChild(col1);
            row.appendChild(col2);

            merchantsList.appendChild(row);
        };
    });

    const updateButtons = document.querySelectorAll(".archive-btn");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const confirmBtn = document.getElementById("confirmBtn");
    let currentButton = null;

    updateButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            currentButton = event.currentTarget;
            const nodeName = currentButton.getAttribute("data-node");
            confirmationMessage.textContent = `Do you want to archive "${nodeName}"?`;
            const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
            modal.show();
        });
    });

    confirmBtn.addEventListener("click", () => {
        if (currentButton) {
            const nodeId = currentButton.getAttribute("data-node");
            const mPath = `merchants/${nodeId}`;
            const aPath = `accounts/${nodeId}`;
            const updatedData = {
                archive: true
            };
            database.ref(mPath).update(updatedData);
            database.ref(aPath).update(updatedData);
            currentButton = null;
        };
    });

    const links = document.querySelectorAll('td.text-start');
    const merchantTitle = document.getElementById("merchant-title");
    const emailReveal = document.getElementById("email-reveal");
    const passwordReveal = document.getElementById("password-reveal");
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const accounts = database.ref('accounts/');
            const current_user = e.currentTarget.textContent;
            merchantTitle.textContent = `${current_user}'s Details`;

            accounts.orderByChild('archive').equalTo(false).once('value', (snapshot) => {
                const values = snapshot.val();
                const accountExists = Object.keys(values).some(key => key === current_user);

                if (accountExists) {
                    accountKey = Object.keys(values).find(key => key === current_user);
                    emailReveal.textContent = `Email: ${values[accountKey].username}`;
                    passwordReveal.textContent = `Password: ${values[accountKey].password}`;
                
                } else {
                    console.log("Your account has been archived")
                };
            });
            const noteModal = new bootstrap.Modal(document.getElementById('account-details'));
            noteModal.show();
            
        });
    });
});