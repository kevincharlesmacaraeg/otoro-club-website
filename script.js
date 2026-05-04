// ============================================
//   Otoro Club — script.js (otoroclub.com)
//   Editorial DNA shared with the Otoro Club proposal sites.
// ============================================

// --- Navbar scroll behavior ---
const navbar = document.getElementById('siteNav');
const onScroll = () => {
  if (!navbar) return;
  if (window.scrollY > 60) navbar.classList.add('is-scrolled');
  else navbar.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Mobile menu ---
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Stagger sibling cards
  document.querySelectorAll('.exp-card, .service-card').forEach((el, i) => {
    el.dataset.delay = String(i * 80);
  });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// --- Gallery lightbox ---
const galleryItems = document.querySelectorAll('.g-item');

if (galleryItems.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="" />';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox-close');

  const openLightbox = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

// --- Form submission (lightweight feedback) ---
const form = document.getElementById('inquireForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.textContent = "Inquiry Sent — We'll be in touch.";
    btn.disabled = true;
    btn.style.background = 'transparent';
    btn.style.color = 'var(--gold)';
    btn.style.borderColor = 'var(--gold)';
  });
}
