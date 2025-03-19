const nameElement = document.getElementById('table-name');

if (nameElement && localStorage.getItem('name')) {
    nameElement.innerText = localStorage.getItem('name') + "'s Table";
};

const db = firebase.database();

const merchantButton = document.getElementById('merchantButton');
const dateButton = document.getElementById('dateButton');
const merchantMenu = document.getElementById('merchantMenu');
const dateMenu = document.getElementById('dateMenu');

db.ref('merchants').on('value', (snapshot) => {
    const merchants = snapshot.val();
    if (merchants) {
        merchantMenu.innerHTML = '';

        for (const merchantName in merchants) {
            const merchantItem = document.createElement('a');
            merchantItem.classList.add('dropdown-item');
            merchantItem.textContent = merchantName;

            merchantItem.addEventListener('click', () => {
                merchantButton.textContent = merchantName;
                updateDateMenu(merchants[merchantName].table.history);
            });

            merchantMenu.appendChild(merchantItem);
        }
    }
});

function updateDateMenu(history) {
    dateMenu.innerHTML = '';
    
    const dates = Object.keys(history);

    dates.forEach((date) => {
        const dateItem = document.createElement('a');
        dateItem.classList.add('dropdown-item');        
        dateItem.textContent = date;

        dateItem.addEventListener('click', () => {
            dateButton.textContent = date;
            updateDataBasedOnDate(date);
        });

        dateMenu.appendChild(dateItem);
    });

    const lastDateItem = dateMenu.querySelector('.dropdown-item:last-child');
    if (lastDateItem) {
        lastDateItem.click();
    }
}

function updateDataBasedOnDate(dateData) {
    const itemsRef = database.ref('merchants/' + merchantButton.textContent + `/table/history/${dateData}`);
    const tableBody = document.querySelector('.card.shadow:nth-of-type(4) .table tbody');

    itemsRef.on('value', function (snapshot) {
        tableBody.innerHTML = '';

        snapshot.forEach(function (item_snapshot) {
            const row = document.createElement("tr");
            const col1 = document.createElement("td");
            const col2 = document.createElement("td");
            const col3 = document.createElement("td");
            const col4 = document.createElement("td");
            const col5 = document.createElement("td");

            col1.innerText = item_snapshot.child("no").val();
            col2.innerText = item_snapshot.child("weight").val();
            col3.innerText = item_snapshot.child("size").val();
            col4.innerText = item_snapshot.child("percentage").val();
            col5.innerText = item_snapshot.child("quality").val();

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);

            tableBody.appendChild(row);
        });
    });
}

db.ref('merchants').once('value', (snapshot) => {
    const merchants = snapshot.val();
    if (merchants) {
        const firstMerchantName = Object.keys(merchants)[0];  
        merchantButton.textContent = firstMerchantName;
        updateDateMenu(merchants[firstMerchantName].table.history);
        
        const dates = Object.keys(merchants[firstMerchantName].table.history).sort((a, b) => new Date(b) - new Date(a));
        
        const latestDate = dates[0];
        dateButton.textContent = latestDate;
    }
});