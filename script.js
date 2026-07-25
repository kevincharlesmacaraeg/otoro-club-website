/* Otoro Club — site behaviors.
   Mega-flyout nav · burger drawer · reveal-on-scroll · cookie consent ·
   inquiry form · legacy hash redirects. Vanilla, no dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Legacy hash redirects ----------
     The old single-page site used #anchors that are in the wild. Map them to
     the new routes. Runs before anything paints. */
  var HASH_MAP = {
    "#about": "/ceremony",
    "#experience": "/ceremony/run-of-show",
    "#reserve": "/ceremony",
    "#gallery": "/gallery",
    "#services": "/occasions",
    "#formats": "/formats",
    "#instagram": "/about",
    "#faq": "/faq",
    "#inquire": "/inquire"
  };
  (function redirectLegacyHash() {
    var path = window.location.pathname;
    if (path !== "/" && path !== "/index.html") return;
    var h = window.location.hash;
    if (h && HASH_MAP[h]) {
      window.location.replace(HASH_MAP[h]);
    }
  })();

  /* ---------- Nav scroll state ---------- */
  var mnav = document.getElementById("mnav");
  function onScroll() {
    if (!mnav) return;
    mnav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mega-flyout nav ---------- */
  (function flyouts() {
    var wrap = document.querySelector("[data-flyout]");
    if (!wrap) return;
    var items = Array.prototype.slice.call(wrap.querySelectorAll(".mnav-item"));
    var closeTimer = null;

    function panelOf(item) { return item.querySelector(".mnav-panel"); }
    function triggerOf(item) { return item.querySelector(".mnav-trigger"); }

    function closeAll(except) {
      items.forEach(function (item) {
        if (item === except) return;
        var p = panelOf(item), t = triggerOf(item);
        item.classList.remove("is-open");
        if (p) p.hidden = true;
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
    function open(item) {
      clearTimeout(closeTimer);
      closeAll(item);
      var p = panelOf(item), t = triggerOf(item);
      item.classList.add("is-open");
      if (p) p.hidden = false;
      if (t) t.setAttribute("aria-expanded", "true");
    }
    function close(item) {
      var p = panelOf(item), t = triggerOf(item);
      item.classList.remove("is-open");
      if (p) p.hidden = true;
      if (t) t.setAttribute("aria-expanded", "false");
    }

    items.forEach(function (item) {
      var t = triggerOf(item);
      if (!t) return;
      item.addEventListener("mouseenter", function () { open(item); });
      t.addEventListener("focus", function () { open(item); });
      t.addEventListener("click", function (e) {
        e.preventDefault();
        if (item.classList.contains("is-open")) close(item);
        else open(item);
      });
    });

    // Close when the cursor leaves the whole nav wrapper (cursor can cross the
    // gap into the panel first).
    wrap.addEventListener("mouseleave", function () {
      closeTimer = setTimeout(function () { closeAll(null); }, 120);
    });
    wrap.addEventListener("mouseenter", function () { clearTimeout(closeTimer); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeAll(null);
      }
    });
    // Clicking anywhere outside the nav closes any open panel.
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) closeAll(null);
    });
  })();

  /* ---------- Burger drawer ---------- */
  (function drawer() {
    var burger = document.getElementById("mnavBurger");
    var panel = document.getElementById("mnavDrawer");
    if (!burger || !panel) return;
    function set(open) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.hidden = !open;
      document.documentElement.classList.toggle("drawer-open", open);
    }
    burger.addEventListener("click", function () {
      set(panel.hidden);
    });
    panel.addEventListener("click", function (e) {
      if (e.target.tagName === "A") set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) set(false);
    });
  })();

  /* ---------- Reveal on scroll ---------- */
  (function reveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    nodes.forEach(function (n) { io.observe(n); });
  })();

  /* ---------- Cookie consent ---------- */
  (function cookies() {
    var KEY = "otoro.cookieConsent";
    var bar = document.getElementById("cookiebar");
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}

    function loadAnalytics() {
      if (window.__otoroAnalytics) return;
      window.__otoroAnalytics = true;
      ["/_vercel/insights/script.js", "/_vercel/speed-insights/script.js"].forEach(function (src) {
        var s = document.createElement("script");
        s.defer = true; s.src = src;
        document.body.appendChild(s);
      });
    }
    function persist(v) {
      try { localStorage.setItem(KEY, v); } catch (e) {}
    }

    if (stored === "accept") loadAnalytics();
    if (!stored && bar) bar.hidden = false;

    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-cookie]");
      if (!el) return;
      var action = el.getAttribute("data-cookie");
      if (action === "manage") return; // follow the link to /legal/cookies
      e.preventDefault();
      persist(action);
      if (action === "accept") loadAnalytics();
      if (bar) bar.hidden = true;
    });
    // Footer "Cookie Preferences" re-opens the bar.
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-cookie-manage]");
      if (!el || !bar) return;
      e.preventDefault();
      bar.hidden = false;
    });
  })();

  /* ---------- Inquiry form (FormSubmit AJAX) ---------- */
  (function inquiry() {
    var form = document.getElementById("inquireForm");
    if (!form) return;
    var status = document.getElementById("formStatus");
    var submit = document.getElementById("inquireSubmit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (submit) { submit.disabled = true; submit.textContent = "Sending…"; }
      if (status) { status.hidden = true; }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function () {
          window.location.href = "/inquire/thank-you";
        })
        .catch(function () {
          if (submit) { submit.disabled = false; submit.textContent = "Inquire"; }
          if (status) {
            status.hidden = false;
            status.textContent =
              "Something went wrong sending that. Please email reservations@otoroclub.com and we will pick it up.";
          }
        });
    });
  })();
})();
