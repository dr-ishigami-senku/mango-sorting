window.onload = (event) => {
    const toasts = document.querySelectorAll('.toast:not(.toast.error)');
    toasts.forEach(function (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    });
};