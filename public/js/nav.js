// ============================================================
// AgriSense AI — NAVIGATION
// SPA routing, theme, language, mobile menu
// ============================================================

// ---- SPA State ----
let currentPage = 'home';

function navigate(page) {
  // Close all overlays
  closeAllOverlays();

  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    currentPage = page;
  } else {
    document.getElementById('page-404').classList.add('active');
    currentPage = '404';
  }

  // Update nav active state
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');
}

function closeAllOverlays() {
  const langModal = document.getElementById('langModal');
  const moreDropdown = document.getElementById('moreDropdown');
  if (langModal) langModal.classList.add('hidden');
  if (moreDropdown) moreDropdown.classList.add('hidden');
}

// ---- Nav link click bindings ----
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const page = a.dataset.page;
    if (page === 'more') {
      const dd = document.getElementById('moreDropdown');
      dd.classList.toggle('hidden');
      const langModal = document.getElementById('langModal');
      if (langModal) langModal.classList.add('hidden');
      return;
    }
    if (page) navigate(page);
  });
});

// Track price page visits for dashboard
const priceLink = document.querySelector('[data-page="prices"]');
if (priceLink) {
  priceLink.addEventListener('click', () => updateDash('priceChecks'));
}

// ---- Click outside to close dropdowns ----
document.addEventListener('click', e => {
  if (!e.target.closest('#langModal') && !e.target.closest('#langToggleBtn')) {
    const m = document.getElementById('langModal');
    if (m) m.classList.add('hidden');
  }
  if (!e.target.closest('#moreDropdown') && !e.target.closest('[data-page="more"]')) {
    const dd = document.getElementById('moreDropdown');
    if (dd) dd.classList.add('hidden');
  }
});

// ---- Theme ----
let darkMode = false;

function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);

  // Swap icon
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    const moonPath = 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z';
    const sunPath = 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z';
    themeBtn.querySelector('path').setAttribute('d', darkMode ? sunPath : moonPath);
  }

  // Sync profile theme selector if present
  const profileTheme = document.getElementById('profileTheme');
  if (profileTheme) profileTheme.value = darkMode ? 'dark' : 'light';
}

// ---- Language ----
let currentLang = 'en';
const langLabels = { en: 'English', ha: 'Hausa', ful: 'Fulfulde', yo: 'Yoruba', ig: 'Igbo', kr: 'Kanuri' };

function toggleLang() {
  const m = document.getElementById('langModal');
  m.classList.toggle('hidden');
  const dd = document.getElementById('moreDropdown');
  if (dd) dd.classList.add('hidden');
}

function setLang(lang) {
  currentLang = lang;
  const m = document.getElementById('langModal');
  if (m) m.classList.add('hidden');

  // Sync profile selector
  const profileLang = document.getElementById('profileLang');
  if (profileLang) profileLang.value = lang;

  // Sync chat lang selector
  document.querySelectorAll('.chat-lang-selector button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  showToast(`Language: ${langLabels[lang] || 'English'}`, 'info');
}

// Chat lang selector button bindings
document.querySelectorAll('.chat-lang-selector button').forEach(b => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

// ---- Mobile hamburger ----
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    closeAllOverlays();
  });
}

// ---- Toast ----
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove('show'), 3200);
}

// ---- Keyboard shortcuts ----
document.addEventListener('keydown', e => {
  // Ctrl+/ → focus chat
  if (e.ctrlKey && e.key === '/') {
    e.preventDefault();
    navigate('chat');
    setTimeout(() => {
      const chatInput = document.getElementById('chatInput');
      if (chatInput) chatInput.focus();
    }, 350);
  }
  // Escape → close overlays + mobile menu
  if (e.key === 'Escape') {
    closeAllOverlays();
    if (navLinks) navLinks.classList.remove('open');
  }
});
