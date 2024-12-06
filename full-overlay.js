var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://cdn.jsdelivr.net/gh/weisscompany/dev-overlay@latest/styles.css";
document.head.appendChild(cssLink);

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

// JavaScript Logic
function updateOverlayValues() {
  // Calculate load time
  if (window.performance && window.performance.timing) {
    var loadTime =
      (window.performance.timing.domContentLoadedEventEnd -
        window.performance.timing.navigationStart) /
      1000;
    document.getElementById("loading-time").innerText = loadTime.toFixed(3);
  } else {
    document.getElementById("loading-time").innerText = "N/A";
  }

  // Set user agent
  var userAgent = navigator.userAgent || "Unavailable";
  document.getElementById("user-agent").innerText = userAgent;

  // Set current time
  var n = new Date(),
    y = n.getFullYear(),
    m = String(n.getMonth() + 1).padStart(2, "0"),
    d = String(n.getDate()).padStart(2, "0"),
    h = String(n.getHours()).padStart(2, "0"),
    min = String(n.getMinutes()).padStart(2, "0");
  document.getElementById("version-time").innerText = `${d}.${m}.${y} ${h}:${min} Uhr`;
}

// Ensure overlay updates after HTML is injected
function ensureOverlayWorks() {
  if (document.getElementById("loading-time")) {
    updateOverlayValues();
  } else {
    // Retry after a short delay for DOM availability
    setTimeout(ensureOverlayWorks, 50);
  }
}

// Run updates after DOM is ready
document.addEventListener("DOMContentLoaded", ensureOverlayWorks);
