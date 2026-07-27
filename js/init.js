// ============================================================
// AgriSense AI — INIT
// Boot sequence: DOMContentLoaded
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Render all dynamic content
  renderMarketplace();
  renderPrices();
  updateWeather();
  renderForum();
  renderNews();
  updateActivity();

  // Start hero slideshow
  resetHeroTimer();
  showHeroSlide(0);

  // Welcome toast (slightly delayed)
  setTimeout(() => showToast('Welcome to AgriSense AI — ask me anything about farming.', 'info'), 800);

  // PWA / service worker placeholder
  if ('serviceWorker' in navigator) {
    console.info('PWA: Service worker support available');
  }
});
