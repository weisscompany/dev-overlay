window.onload = function () {
  var loadTime = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000;
  document.getElementById("loading-time").innerText = loadTime.toFixed(3);
};

document.addEventListener("DOMContentLoaded", function () {
  var n = new Date(),
    y = n.getFullYear(),
    m = String(n.getMonth() + 1).padStart(2, "0"),
    d = String(n.getDate()).padStart(2, "0"),
    h = String(n.getHours()).padStart(2, "0"),
    min = String(n.getMinutes()).padStart(2, "0");
  document.getElementById("version-time").innerText = `${d}.${m}.${y} ${h}:${min} Uhr`;
  document.getElementById("user-agent").innerText = navigator.userAgent;
});
