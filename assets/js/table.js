const nameElement = document.getElementById('table-name');

if (nameElement && localStorage.getItem('name')) {
    nameElement.innerText = localStorage.getItem('name') + "'s Table";
};

function setTable(date){
    const itemsRef = database.ref('merchants/' + localStorage.getItem('name') + `/table/history/${date}`);
    const tableBody = document.querySelector('.card.shadow:nth-of-type(3) .table tbody');

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

const dropdownButton = document.getElementById('tableMenuButton');
const itemsRef = database.ref('merchants/' + localStorage.getItem('name') + '/table/history/');

itemsRef.on('value', function (snapshot) {
    const historyData = snapshot.val();
    const dates = Object.keys(historyData);
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.innerHTML = "";
    
    dates.forEach((date) => {
        const menuItem = document.createElement('a');
        menuItem.classList.add('dropdown-item');
        menuItem.textContent = date;
        menuItem.addEventListener('click', () => {
            setTable(date);
        });
    dropdownMenu.appendChild(menuItem);
    }); 
    
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownButton.innerText = this.innerText;
        });
    });
    
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const todayFormatted = today.toLocaleDateString('en-US', options);

    const matchingItem = Array.from(dropdownMenu.querySelectorAll('.dropdown-item')).find(item => item.textContent === todayFormatted);

    if (matchingItem) {
        matchingItem.click();
    } else {
        const lastMenuItem = dropdownMenu.querySelector('.dropdown-item:last-child');
        if (lastMenuItem) {
            lastMenuItem.click();
        }
    }
});