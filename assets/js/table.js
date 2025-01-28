var itemsRef = database.ref().child("dtmango/data");
var tableBody = document.querySelector('.table-responsive:nth-of-type(2) .table tbody');

function readData() {
    itemsRef.on('value', function (snapshot) {
        tableBody.innerHTML = '';
        
        snapshot.forEach(function (item_snapshot) {
            var row = document.createElement("tr");
            var col1 = document.createElement("td");
            var col2 = document.createElement("td");
            var col3 = document.createElement("td");
            var col4 = document.createElement("td");
            var col5 = document.createElement("td");

            col1.innerText = item_snapshot.child("no").val();
            col2.innerText = item_snapshot.child("weight").val();
            col3.innerText = item_snapshot.child("size").val();
            col4.innerText = item_snapshot.child("qtyper").val();
            col5.innerText = item_snapshot.child("qty").val();

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            
            tableBody.appendChild(row);
        });
    });
}

readData();