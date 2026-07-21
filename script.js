// ============================================
//   Otoro Club — script.js (otoroclub.com)
//   Shares editorial DNA with the Otoro Club proposal sites.
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

// --- Mobile menu (slide-in drawer) ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

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

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
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

  document.querySelectorAll('.fact-strip li, .step, .timeline li').forEach((el, i) => {
    el.dataset.delay = String((i % 4) * 80);
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

// --- Form submission (FormSubmit AJAX → reservations@otoroclub.com) ---
const form = document.getElementById('inquireForm');
if (form) {
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    if (status) { status.hidden = true; status.textContent = ''; }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === 'true' || data.success === true)) {
        form.reset();
        if (btn) {
          btn.textContent = "Inquiry Sent — We'll be in touch.";
          btn.style.background = 'transparent';
          btn.style.color = 'var(--gold)';
          btn.style.borderColor = 'var(--gold)';
        }
        if (status) {
          status.hidden = false;
          status.textContent = "Thanks — your inquiry is on its way. We'll reply soon.";
        }
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = original; }
      if (status) {
        status.hidden = false;
        status.innerHTML = 'Something went wrong. Please email us directly at ' +
          '<a class="inline-gold" href="mailto:reservations@otoroclub.com">reservations@otoroclub.com</a>.';
      }
    }
  });
}
