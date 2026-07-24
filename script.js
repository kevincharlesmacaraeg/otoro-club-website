// ============================================
//   Otoro Club — otoroclub.com
//   Nav scroll · dropdowns · mobile drawer · reveal · lightbox · inquiry form
// ============================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Nav dropdowns (Experience / Formats / About) ---
// Desktop opens on hover/focus via CSS; click + keyboard toggle .is-open here.
const navGroups = Array.from(document.querySelectorAll('.nav-group'));

const closeAllDropdowns = (except) => {
  navGroups.forEach((group) => {
    if (group === except) return;
    group.classList.remove('is-open');
    const t = group.querySelector('.nav-trigger');
    if (t) t.setAttribute('aria-expanded', 'false');
  });
};

navGroups.forEach((group) => {
  const trigger = group.querySelector('.nav-trigger');
  if (!trigger) return;
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !group.classList.contains('is-open');
    closeAllDropdowns(group);
    group.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  });
});

// Click outside any group closes them all.
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-group')) closeAllDropdowns();
});
// Escape closes dropdowns (drawer Escape is handled below).
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllDropdowns();
});

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
    closeAllDropdowns();
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

// --- Inquiry form → FormSubmit (AJAX) ---
// Emails reservations@otoroclub.com with no backend. On success the panel is
// swapped for the thank-you. The plain address stays in the DOM as a fallback.
const inquireForm = document.getElementById('inquireForm');

if (inquireForm) {
  const panel = document.querySelector('.inquire-panel');
  const success = document.getElementById('inquireSuccess');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('inquireSubmit');
  const honey = inquireForm.querySelector('.hp');

  const showError = (msg) => {
    if (!status) return;
    status.hidden = false;
    status.innerHTML =
      msg +
      ' Or email <a class="is-address" href="mailto:reservations@otoroclub.com?subject=Otoro%20Club%20%E2%80%94%20Inquiry">reservations@otoroclub.com</a>.';
  };

  inquireForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (status) status.hidden = true;

    // Silent bot drop — honeypot filled means don't bother the inbox.
    if (honey && honey.value) return;

    if (!inquireForm.checkValidity()) {
      inquireForm.reportValidity();
      return;
    }

    const original = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    try {
      const res = await fetch(inquireForm.action, {
        method: 'POST',
        body: new FormData(inquireForm),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === 'true' || data.success === true || res.status === 200)) {
        if (panel) panel.hidden = true;
        if (success) {
          success.hidden = false;
          success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
      } else {
        showError('Something went wrong sending that.');
      }
    } catch (err) {
      showError('Something went wrong sending that.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }
    }
  });
}
