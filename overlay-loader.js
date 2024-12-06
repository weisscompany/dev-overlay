(function() {
    // Create and insert the overlay HTML
    fetch('https://cdn.jsdelivr.net/gh/weisscompany/dev-overlay@latest/index.html')
    .then(response => response.text())
    .then(html => {
        // Inject the overlay HTML into the page
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

        // Once the HTML is injected, populate the current time and user-agent values
        script.onload = function() {
            document.addEventListener("DOMContentLoaded", function() {
                // Ensure elements are available before setting values
                const versionTimeElement = document.getElementById('version-time');
                const userAgentElement = document.getElementById('user-agent');

                if (versionTimeElement) {
                    const n = new Date(),
                        y = n.getFullYear(),
                        m = String(n.getMonth() + 1).padStart(2, "0"),
                        d = String(n.getDate()).padStart(2, "0"),
                        h = String(n.getHours()).padStart(2, "0"),
                        min = String(n.getMinutes()).padStart(2, "0");
                    versionTimeElement.innerText = `${d}.${m}.${y} ${h}:${min} Uhr`;
                }

                if (userAgentElement) {
                    userAgentElement.innerText = navigator.userAgent;
                }
            });
        };
    })
    .catch(error => console.error('Error loading overlay resources:', error));
})();
