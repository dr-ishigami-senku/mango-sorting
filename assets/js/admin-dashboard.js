const nameElement = document.getElementById('db-name');

if (nameElement && localStorage.getItem('name')) {
    nameElement.innerText = localStorage.getItem('name') + "'s Dashboard";
};

const db = firebase.database();

const merchantButton = document.getElementById('merchantButton');
const dateButton = document.getElementById('dateButton');
const merchantMenu = document.getElementById('merchantMenu');
const dateMenu = document.getElementById('dateMenu');

const rawTotal = document.getElementById("raw-total");
const rawSmall = document.getElementById("raw-small");
const rawMedium = document.getElementById("raw-medium");
const rawLarge = document.getElementById("raw-large");
const ripeTotal = document.getElementById("ripe-total");
const ripeSmall = document.getElementById("ripe-small");
const ripeMedium = document.getElementById("ripe-medium");
const ripeLarge = document.getElementById("ripe-large");
const decayTotal = document.getElementById("decay-total");

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
                updateDateMenu(merchants[merchantName].dashboard.history);
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
            updateDataBasedOnDate(history[date]);
        });

        dateMenu.appendChild(dateItem);
    });

    const lastDateItem = dateMenu.querySelector('.dropdown-item:last-child');
    if (lastDateItem) {
        lastDateItem.click();
    }
}

function updateDataBasedOnDate(dateData) {
    const rawTotalValue = dateData.raw.total;
    const rawSmallValue = dateData.raw.small;
    const rawMediumValue = dateData.raw.medium;
    const rawLargeValue = dateData.raw.large;
    
    const ripeTotalValue = dateData.ripe.total;
    const ripeSmallValue = dateData.ripe.small;
    const ripeMediumValue = dateData.ripe.medium;
    const ripeLargeValue = dateData.ripe.large;
    
    const decayTotalValue = dateData.decay.total;

    rawTotal.textContent = `${rawTotalValue}`;
    rawSmall.textContent = `${rawSmallValue}`;
    rawMedium.textContent = `${rawMediumValue}`;
    rawLarge.textContent = `${rawLargeValue}`;
    ripeTotal.textContent = `${ripeTotalValue}`;
    ripeSmall.textContent = `${ripeSmallValue}`;
    ripeMedium.textContent = `${ripeMediumValue}`;
    ripeLarge.textContent = `${ripeLargeValue}`;
    decayTotal.textContent = `${decayTotalValue}`;
}

db.ref('merchants').once('value', (snapshot) => {
    const merchants = snapshot.val();
    if (merchants) {
        const firstMerchantName = Object.keys(merchants)[0];  
        merchantButton.textContent = firstMerchantName;
        updateDateMenu(merchants[firstMerchantName].dashboard.history);
        
        const dates = Object.keys(merchants[firstMerchantName].dashboard.history).sort((a, b) => new Date(b) - new Date(a));
        
        const latestDate = dates[0];
        dateButton.textContent = latestDate;
    }
});

const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(flipCard => {
  flipCard.addEventListener('click', () => {
    const flipCardInner = flipCard.querySelector('.flip-card-inner');
    
    if (flipCardInner) {
      flipCardInner.classList.toggle('flipped');
    }
  });
});