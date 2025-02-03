const input = document.getElementById("inputData");
const insertBtn = document.getElementById('insertBtn');

insertBtn.addEventListener('click', function() {
  const insertRef = database.ref('merchants/' + input.value.charAt(0).toUpperCase() + input.value.slice(1));
  insertRef.set({
    archive: false,
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
    decay: 9,
    table: {
      data1: {
        no: 10,
        weight: 11,
        size: 12,
        percentage: 13,
        quality: 14
      }
     } 
  });
});