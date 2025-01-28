const ref = database.ref('/');
ref.on("value", function (snapshot) {
    const data = snapshot.val();
    
    var rawTotal = document.getElementById("raw-total");
    var rawSmall = document.getElementById("raw-small");
    var rawMedium = document.getElementById("raw-medium");
    var rawLarge = document.getElementById("raw-large");
    var ripeTotal = document.getElementById("ripe-total");
    var ripeSmall = document.getElementById("ripe-small");
    var ripeMedium = document.getElementById("ripe-medium");
    var ripeLarge = document.getElementById("ripe-large");
    var decayTotal = document.getElementById("decay-total");

    rawTotal.innerText = data.raw.overall.total;
    rawSmall.innerText = data.raw.overall.small;
    rawMedium.innerText = data.raw.overall.medium;
    rawLarge.innerText = data.raw.overall.large;
    ripeTotal.innerText = data.ripe.overall.total;
    ripeSmall.innerText = data.ripe.overall.small;
    ripeMedium.innerText = data.ripe.overall.medium;
    ripeLarge.innerText = data.ripe.overall.large;
    decayTotal.innerText = data.decay.overall.total;
    
}, function (error) {
    console.log("Error: " + error.code);
});