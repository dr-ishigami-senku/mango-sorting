const nameElement = document.getElementById('db-name');

if (nameElement && localStorage.getItem('name')) {
  nameElement.innerText = localStorage.getItem('name') + "'s";
};

const ref = database.ref('merchants/'+ localStorage.getItem('name') +'/');

ref.on("value", function (snapshot) {
    const data = snapshot.val();
    
    const rawTotal = document.getElementById("raw-total");
    const rawSmall = document.getElementById("raw-small");
    const rawMedium = document.getElementById("raw-medium");
    const rawLarge = document.getElementById("raw-large");
    const ripeTotal = document.getElementById("ripe-total");
    const ripeSmall = document.getElementById("ripe-small");
    const ripeMedium = document.getElementById("ripe-medium");
    const ripeLarge = document.getElementById("ripe-large");
    const decayTotal = document.getElementById("decay-total");

    rawTotal.innerText = data.unripe.total;
    rawSmall.innerText = data.unripe.small;
    rawMedium.innerText = data.unripe.medium;
    rawLarge.innerText = data.unripe.large;
    ripeTotal.innerText = data.ripe.total;
    ripeSmall.innerText = data.ripe.small;
    ripeMedium.innerText = data.ripe.medium;
    ripeLarge.innerText = data.ripe.large;
    decayTotal.innerText = data.decay;   
});