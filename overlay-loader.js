(function() {
    // Create and insert the overlay HTML
    fetch('https://cdn.jsdelivr.net/gh/weisscompany/dev-overlay@latest/index.html')
    .then(response => response.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);

        // Load the external CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/gh/weisscompany/dev-overlay@latest/styles.css';
        document.head.appendChild(link);

        // Load the external JavaScript
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/weisscompany/dev-overlay@latest/overlay.js';
        document.head.appendChild(script);
    })
    .catch(error => console.error('Error loading overlay resources:', error));
})();
