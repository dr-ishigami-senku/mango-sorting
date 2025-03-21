const nameElement = document.getElementById('db-name');

if (nameElement && localStorage.getItem('name')) {
    nameElement.innerText = localStorage.getItem('name') + "'s Dashboard";
};

const dropdownButton = document.getElementById('dashboardMenuButton');
const ref = database.ref('merchants/' + localStorage.getItem('name') + '/dashboard/history/');

ref.on('value', (snapshot) => {
    const historyData = snapshot.val();
    const dates = Object.keys(historyData);
    const dropdownMenu = document.getElementById('dropdownMenu');
    const rawTotal = document.getElementById("raw-total");
    const rawSmall = document.getElementById("raw-small");
    const rawMedium = document.getElementById("raw-medium");
    const rawLarge = document.getElementById("raw-large");
    const ripeTotal = document.getElementById("ripe-total");
    const ripeSmall = document.getElementById("ripe-small");
    const ripeMedium = document.getElementById("ripe-medium");
    const ripeLarge = document.getElementById("ripe-large");
    const decayTotal = document.getElementById("decay-total");

    dropdownMenu.innerHTML = "";

    dates.forEach((date) => {
        const menuItem = document.createElement('a');
        menuItem.classList.add('dropdown-item');
        menuItem.textContent = date;
        menuItem.addEventListener('click', () => {
            const rawTotalValue = historyData[date].raw.total;
            const rawSmallValue = historyData[date].raw.small;
            const rawMediumValue = historyData[date].raw.medium;
            const rawLargeValue = historyData[date].raw.large;
            const ripeTotalValue = historyData[date].ripe.total;
            const ripeSmallValue = historyData[date].ripe.small;
            const ripeMediumValue = historyData[date].ripe.medium;
            const ripeLargeValue = historyData[date].ripe.large;
            const decayTotalValue = historyData[date].decay.total;
        
            rawTotal.textContent = `${rawTotalValue}`;
            rawSmall.textContent = `${rawSmallValue}`;
            rawMedium.textContent = `${rawMediumValue}`;
            rawLarge.textContent = `${rawLargeValue}`;
            ripeTotal.textContent = `${ripeTotalValue}`;
            ripeSmall.textContent = `${ripeSmallValue}`;
            ripeMedium.textContent = `${ripeMediumValue}`;
            ripeLarge.textContent = `${ripeLargeValue}`;
            decayTotal.textContent = `${decayTotalValue}`;
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


const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(flipCard => {
  flipCard.addEventListener('click', () => {
    const flipCardInner = flipCard.querySelector('.flip-card-inner');
    
    if (flipCardInner) {
      flipCardInner.classList.toggle('flipped');
    }
  });
});
