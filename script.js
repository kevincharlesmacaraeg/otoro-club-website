// ============================================
//   OTORO CLUB — script.js
// ============================================

// --- Navbar scroll behavior ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// --- Mobile menu ---
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- Fade-up on scroll ---
const fadeEls = document.querySelectorAll(
  '#intro .about-text, #intro .about-images, #about .about-text, #about .about-images, .feature-card, .property-card, .format-item, .inquire-text, .inquire-form, .section-header'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger siblings
document.querySelectorAll('.feature-card, .property-card, .format-item').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
});

fadeEls.forEach(el => observer.observe(el));

// --- Gallery lightbox ---
const galleryItems = document.querySelectorAll('.g-item');

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">\u00D7</button><img src="" alt="" />';
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('img');
const lbClose = lightbox.querySelector('.lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lbImg.src = item.querySelector('img').src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// --- Form submission ---
const form = document.getElementById('inquiryForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Thank You \u2014 We\u2019ll Be in Touch';
  btn.disabled = true;
  btn.style.borderColor = '#c9a96e';
  btn.style.color = '#c9a96e';
  btn.style.background = 'rgba(201,169,110,0.08)';
});
