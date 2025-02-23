const input = document.getElementById("inputData");
const insertBtn = document.getElementById('insertBtn');

insertBtn.addEventListener('click', function () {
    if (input.value !== '') {

        const merchant_list = database.ref('merchants/');
        merchant_list.once('value', (snapshot) => {
            const values = snapshot.val();
            const textExists = Object.keys(values).includes(input.value.charAt(0).toUpperCase() + input.value.slice(1));

            if (textExists) {
                const noteModal = new bootstrap.Modal(document.getElementById('note-modal'));
                noteModal.show();
            } else {
                const insertRef = database.ref('merchants/' + input.value.charAt(0).toUpperCase() + input.value.slice(1) + '/');

                insertRef.set({
                    archive: false
                });

                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const today = new Date().toLocaleDateString('en-US', options);
                const historyRef = database.ref('merchants/' + input.value.charAt(0).toUpperCase() + input.value.slice(1) + '/history/' + today +'/');

                historyRef.set({
                    unripe: {
                        small: 1,
                        medium: 2,
                        large: 3,
                        total: 4
                    },
                    ripe: {
                        small: 5,
                        medium: 6,
                        large: 7,
                        total: 8
                    },
                    decay: 9
                });
            }
        });
        input.value = "";
    };
});