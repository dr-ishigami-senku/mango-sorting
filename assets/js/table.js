const nameElement = document.getElementById('table-name');

if (nameElement && localStorage.getItem('name')) {
    nameElement.innerText = localStorage.getItem('name') + "'s Table";
};

const itemsRef = database.ref('merchants/' + localStorage.getItem('name') + '/table/');
const tableBody = document.querySelector('.card.shadow:nth-of-type(2) .table tbody');

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