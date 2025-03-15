const elementDl = document.getElementById('element-to-print');
const downloadBtn = document.getElementById('download-btn');
const dashboardText = document.createElement('p');
dashboardText.classList.add("text-center", "fs-4");
const combinedContainer = document.createElement('div');

downloadBtn.addEventListener('click', function () {
    combinedContainer.innerHTML = '';
    dashboardText.textContent = localStorage.getItem("name") + "'s Table";
    combinedContainer.appendChild(dashboardText.cloneNode(true));
    combinedContainer.appendChild(elementDl.cloneNode(true));

    const options = {
        filename: localStorage.getItem("name").toLowerCase() + '-table.pdf'
    };
    html2pdf(combinedContainer, options);
});
