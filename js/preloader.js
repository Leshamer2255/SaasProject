document.addEventListener('DOMContentLoaded', () => {
    // Add preloader to body
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="preloader__spinner"></div>';
    document.body.appendChild(preloader);

    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 300);
    });

    // Removed link interception for classic multipage site
}); 