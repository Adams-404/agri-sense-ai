// ============================================================
// AgriSense AI — HERO SLIDESHOW
// ============================================================

let currentHeroSlide = 0;
let heroSlideTimer = null;

const heroBadgeTexts = [
  'AI-Powered Smart Farming',
  'Real-Time Crop Diagnostics',
  'Community Market & Prices'
];

function showHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  const badge  = document.getElementById('heroBadge');
  if (!slides.length) return;

  currentHeroSlide = ((index % slides.length) + slides.length) % slides.length;

  slides.forEach((s, i) => {
    s.classList.toggle('active', i === currentHeroSlide);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === currentHeroSlide);
  });

  if (badge && heroBadgeTexts[currentHeroSlide]) {
    badge.textContent = heroBadgeTexts[currentHeroSlide];
  }
}

function changeHeroSlide(dir) {
  showHeroSlide(currentHeroSlide + dir);
  resetHeroTimer();
}

function setHeroSlide(index) {
  showHeroSlide(index);
  resetHeroTimer();
}

function resetHeroTimer() {
  if (heroSlideTimer) clearInterval(heroSlideTimer);
  heroSlideTimer = setInterval(() => showHeroSlide(currentHeroSlide + 1), 5000);
}

// Touch/swipe support for hero
(function attachHeroSwipe() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let startX = 0;
  hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 48) changeHeroSlide(dx < 0 ? 1 : -1);
  }, { passive: true });
})();
