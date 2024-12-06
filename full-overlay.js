var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://cdn.jsdelivr.net/gh/weisscompany/dev-overlay@latest/styles.css";
document.head.appendChild(cssLink);

if (!document.querySelector('.dev-overlay')) {
    var overlayHTML = `
    <div class="dev-overlay">
        <div class="version_component">
            <div class="version_block">
                <div>Breakpoint:</div>
                <div class="version_breakpoint is-1920"><div>1920px</div></div>
                <div class="version_breakpoint is-1440"><div>1440px</div></div>
                <div class="version_breakpoint is-desktop"><div>992px</div></div>
                <div class="version_breakpoint is-tablet"><div>768px</div></div>
                <div class="version_breakpoint is-mobile-landscape"><div>479px</div></div>
                <div class="version_breakpoint is-mobile"><div>Mobile</div></div>
            </div>
            <div class="version_block">
                <div>Ladezeit:</div>
                <div class="version_label"><div id="loading-time">0.000</div><div>s</div></div>
            </div>
            <div class="version_block">
                <div>Version:</div>
                <div class="version_label"><div>v1.0.0</div></div>
            </div>
            <div class="version_block">
                <div>Timestamp:</div>
                <div class="version_label"><div id="version-time">Timestamp</div></div>
            </div>
            <div class="version_block">
                <div>UserAgent:</div>
                <div class="version_label"><div id="user-agent">userAgent</div></div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", overlayHTML);
}

// JavaScript Logic: Updates Overlay Data
function updateOverlayValues() {
    // Calculate page load time using performance timing
    if (window.performance && window.performance.timing) {
        var loadTime = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000;
        document.getElementById("loading-time").innerText = loadTime.toFixed(3);
    } else {
        document.getElementById("loading-time").innerText = "N/A";
    }

    // Set User-Agent
    try {
        document.getElementById("user-agent").innerText = navigator.userAgent || "Unavailable";
    } catch (e) {
        document.getElementById("user-agent").innerText = "Unavailable";
    }

    // Set current time in DD.MM.YYYY HH:MM Uhr format
    var n = new Date(),
        y = n.getFullYear(),
        m = String(n.getMonth() + 1).padStart(2, "0"),
        d = String(n.getDate()).padStart(2, "0"),
        h = String(n.getHours()).padStart(2, "0"),
        min = String(n.getMinutes()).padStart(2, "0");
    document.getElementById("version-time").innerText = `${d}.${m}.${y} ${h}:${min} Uhr`;
}

// DOM Ready Event Listener with Retry Logic
function ensureOverlayWorks() {
    if (document.getElementById("loading-time") && document.getElementById("user-agent")) {
        updateOverlayValues(); // Only run once elements are present
    } else {
        // Retry after a short delay (up to 10 attempts with increasing delay)
        let retries = 0;
        const maxRetries = 10;
        const retryInterval = 50;

        const tryUpdate = () => {
            retries++;
            if (retries <= maxRetries) {
                if (document.getElementById("loading-time") && document.getElementById("user-agent")) {
                    updateOverlayValues();
                } else {
                    setTimeout(tryUpdate, retryInterval * retries);
                }
            }
        };

        tryUpdate();
    }
}

// Ensure overlay updates after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(ensureOverlayWorks, 0); // Delay for DOM injection to complete
});

// Also handle onload in case DOMContentLoaded has already fired by the time the script loads
window.onload = function () {
    if (document.getElementById("loading-time") && document.getElementById("user-agent")) {
        updateOverlayValues();
    }
