if (!navigator.onLine) {
  var myModal = new bootstrap.Modal(document.getElementById('modal-1'));
  myModal.show();
}

document.getElementById('refreshButton').addEventListener('click', function() {
  location.reload();
});

document.getElementById('exitButton').addEventListener('click', function() {
  Website2APK.exitApp();
});
