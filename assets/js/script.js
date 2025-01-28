window.onload = (event) => {
    var toasts = document.querySelectorAll('.toast:not(.toast.error)');
    toasts.forEach(function(toastElement) {
        var toast = new bootstrap.Toast(toastElement);
        toast.show();
    });
}