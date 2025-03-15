const input = document.getElementById("inputData");
const insertBtn = document.getElementById('insertBtn');

function insertData() {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const today = new Date().toLocaleDateString('en-US', options);
    
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
    
};

insertBtn.addEventListener('click', function () {
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
                    insertData();
                }
            } else {
                insertData();
            }
        });
        input.value = "";
    };
});