// ============================================
//   Otoro Club — otoroclub.com
//   Nav scroll · mobile drawer · reveal · gallery lightbox
// ============================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Nav scroll state ---
const navbar = document.getElementById('siteNav');
const onScroll = () => {
  if (!navbar) return;
  navbar.classList.toggle('is-scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Mobile drawer ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) closeMenu();
  });
}

// --- Reveal on scroll (fade only, no bounce) ---
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

// --- Gallery lightbox ---
const galleryButtons = document.querySelectorAll('.g-item button');

if (galleryButtons.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Gallery image');
  lightbox.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close">&times;</button><img src="" alt="" />';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox-close');
  let lastFocused = null;

  const openLightbox = (trigger) => {
    const img = trigger.querySelector('img');
    if (!img) return;
    lastFocused = trigger;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  galleryButtons.forEach((btn) => btn.addEventListener('click', () => openLightbox(btn)));
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}
