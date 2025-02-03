const elementDl = document.getElementById('element-to-print');
const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', function() {
    html2pdf(elementDl);
});