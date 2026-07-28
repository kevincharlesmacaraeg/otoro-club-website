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

  /* ---------- Sushi glossary flyout ----------
     Markup + data come from src/partials/_glossary.html, mounted globally,
     so this runs on every route. Renders once from the JSON block, then
     filters by hiding — no re-render on keystroke beyond the highlight pass. */
  (function glossary() {
    var tab = document.getElementById("glossaryTab");
    var panel = document.getElementById("glossaryPanel");
    var backdrop = document.getElementById("glossaryBackdrop");
    var closeBtn = document.getElementById("glossaryClose");
    var body = document.getElementById("glossaryBody");
    var jump = document.getElementById("glossaryJump");
    var search = document.getElementById("glossarySearch");
    var clearBtn = document.getElementById("glossaryClear");
    var dataEl = document.getElementById("glossaryData");
    if (!tab || !panel || !body || !dataEl) return;

    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }

    var FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
    var entries = [];   // { el, search } for every rendered term
    var groups = [];    // { el, subs: [el] }
    var emptyEl, notesEl, lastFocus = null;

    /* ----- Render ----- */
    function stripTags(html) {
      var d = document.createElement("div");
      d.innerHTML = html;
      return d.textContent || "";
    }

    function termNode(item) {
      var wrap = document.createElement("div");
      wrap.className = "gl-term";

      var head = document.createElement("p");
      head.className = "gl-term-head";
      var name = document.createElement("span");
      name.className = "gl-term-name";
      name.textContent = item.t;
      head.appendChild(name);
      if (item.k) {
        var kanji = document.createElement("span");
        kanji.className = "gl-kanji";
        kanji.textContent = item.k;
        head.appendChild(kanji);
      }

      var def = document.createElement("p");
      def.className = "gl-def";
      def.innerHTML = item.d;   // authored in the partial, not user input

      wrap.appendChild(head);
      wrap.appendChild(def);

      entries.push({
        el: wrap,
        name: name,
        def: def,
        rawDef: item.d,
        search: (item.t + " " + (item.k || "") + " " + stripTags(item.d)).toLowerCase()
      });
      return wrap;
    }

    function render() {
      data.groups.forEach(function (g) {
        var section = document.createElement("section");
        section.className = "gl-group";
        section.id = "gl-group-" + g.id;

        var h = document.createElement("h3");
        h.className = "gl-group-name";
        h.textContent = g.name;
        section.appendChild(h);

        var hr = document.createElement("hr");
        hr.className = "gl-group-rule";
        section.appendChild(hr);

        var subEls = [];
        if (g.subs) {
          g.subs.forEach(function (s) {
            var sub = document.createElement("div");
            sub.className = "gl-sub";
            var sh = document.createElement("h4");
            sh.className = "gl-sub-name";
            sh.textContent = s.name;
            sub.appendChild(sh);
            s.terms.forEach(function (it) { sub.appendChild(termNode(it)); });
            section.appendChild(sub);
            subEls.push(sub);
          });
        } else {
          g.terms.forEach(function (it) { section.appendChild(termNode(it)); });
        }

        groups.push({ el: section, subs: subEls });
        body.appendChild(section);

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gl-jump-btn";
        btn.textContent = g.name;
        btn.addEventListener("click", function () {
          if (search && search.value) { search.value = ""; filter(); }
          h.scrollIntoView({ block: "start" });
        });
        if (jump) jump.appendChild(btn);
      });

      // Closing prose — reference, not searchable terms, so it hides on filter.
      if (data.notes) {
        notesEl = document.createElement("div");
        notesEl.className = "gl-notes";
        var nh = document.createElement("h3");
        nh.className = "gl-group-name";
        nh.textContent = data.notes.title;
        notesEl.appendChild(nh);
        var nr = document.createElement("hr");
        nr.className = "gl-group-rule";
        notesEl.appendChild(nr);
        data.notes.paragraphs.forEach(function (p) {
          var el = document.createElement("p");
          el.innerHTML = p;
          notesEl.appendChild(el);
        });
        body.appendChild(notesEl);
      }

      emptyEl = document.createElement("p");
      emptyEl.className = "gl-empty";
      emptyEl.hidden = true;
      body.insertBefore(emptyEl, body.firstChild);
    }

    /* ----- Filter ----- */
    // Wrap matches in <mark> by walking text nodes, so the <em> markup in a
    // definition survives the highlight pass.
    function highlight(el, q) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      nodes.forEach(function (node) {
        var text = node.nodeValue;
        var lower = text.toLowerCase();
        var idx = lower.indexOf(q);
        if (idx === -1) return;
        var frag = document.createDocumentFragment();
        var pos = 0;
        while (idx !== -1) {
          if (idx > pos) frag.appendChild(document.createTextNode(text.slice(pos, idx)));
          var mk = document.createElement("mark");
          mk.textContent = text.slice(idx, idx + q.length);
          frag.appendChild(mk);
          pos = idx + q.length;
          idx = lower.indexOf(q, pos);
        }
        if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
        node.parentNode.replaceChild(frag, node);
      });
    }

    function filter() {
      var q = (search ? search.value : "").trim().toLowerCase();
      if (clearBtn) clearBtn.hidden = !q;

      var hits = 0;
      entries.forEach(function (en) {
        var match = !q || en.search.indexOf(q) !== -1;
        en.el.hidden = !match;
        if (match) hits++;

        // Reset then re-highlight — cheap at this list size.
        en.name.textContent = en.name.textContent;
        en.def.innerHTML = en.rawDef;
        if (q && match) {
          highlight(en.name, q);
          highlight(en.def, q);
        }
      });

      groups.forEach(function (g) {
        g.subs.forEach(function (sub) {
          sub.hidden = !sub.querySelector(".gl-term:not([hidden])");
        });
        g.el.hidden = !g.el.querySelector(".gl-term:not([hidden])");
      });

      if (notesEl) notesEl.hidden = !!q;
      if (emptyEl) {
        emptyEl.hidden = hits > 0;
        if (!hits) {
          emptyEl.textContent = "";
          emptyEl.appendChild(document.createTextNode("No term matches "));
          var strong = document.createElement("span");
          strong.className = "gl-empty-term";
          strong.textContent = "“" + (search ? search.value.trim() : "") + "”";
          emptyEl.appendChild(strong);
          emptyEl.appendChild(document.createTextNode(". Try a shorter word, or the kanji."));
        }
      }
      if (!q) body.scrollTop = 0;
    }

    /* ----- Open / close ----- */
    function focusables() {
      return Array.prototype.slice.call(panel.querySelectorAll(FOCUSABLE))
        .filter(function (el) { return el.offsetParent !== null || el === search; });
    }

    function isPhone() {
      return window.matchMedia("(max-width: 620px)").matches;
    }

    /* iOS Safari ignores `body { overflow: hidden }` — the page kept scrolling
       under the open panel, and closing it dumped you somewhere else on the
       page. Pin the body at its current offset instead and restore after. */
    var lockedY = 0;
    function lockScroll() {
      lockedY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = "fixed";
      document.body.style.top = -lockedY + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }
    function unlockScroll() {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      /* `html { scroll-behavior: smooth }` turns this restore into an animation
         that races the reflow and lands at the top of the page instead. Force
         it to jump, then hand smooth scrolling back. */
      var prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, lockedY);
      document.documentElement.style.scrollBehavior = prev;
    }

    function open() {
      if (document.documentElement.classList.contains("gl-open")) return;
      lastFocus = document.activeElement;
      panel.removeAttribute("inert");
      backdrop.removeAttribute("inert");
      document.documentElement.classList.add("gl-open");
      tab.setAttribute("aria-expanded", "true");
      lockScroll();
      /* Autofocusing the search field on a phone raised the keyboard over a
         panel that had barely opened, and Safari zoomed the viewport into the
         input on focus (and never zoomed back out). Focus the list instead —
         the field is one tap away. */
      if (search && !isPhone()) search.focus();
      else body.focus();
    }

    function close() {
      if (!document.documentElement.classList.contains("gl-open")) return;
      document.documentElement.classList.remove("gl-open");
      tab.setAttribute("aria-expanded", "false");
      unlockScroll();
      panel.setAttribute("inert", "");
      backdrop.setAttribute("inert", "");
      if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
      else tab.focus();
    }

    render();

    // Keep the tab clear of the homepage hero's decorative right rail.
    var rightRail = document.querySelector(".rail--right");
    if (rightRail && "IntersectionObserver" in window) {
      new IntersectionObserver(function (ents) {
        document.documentElement.classList.toggle("gl-rail", ents[0].isIntersecting);
      }, { threshold: 0 }).observe(rightRail);
    }

    tab.addEventListener("click", open);
    /* The rail tab is hidden on phones, so the glossary is also reachable from
       the burger drawer and the footer. Opening from the drawer has to shut the
       drawer first, or it sits behind the panel and is still there on close. */
    Array.prototype.forEach.call(document.querySelectorAll("[data-glossary-open]"), function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var burger = document.getElementById("mnavBurger");
        var drawerPanel = document.getElementById("mnavDrawer");
        if (drawerPanel && !drawerPanel.hidden) {
          drawerPanel.hidden = true;
          document.documentElement.classList.remove("drawer-open");
          if (burger) {
            burger.setAttribute("aria-expanded", "false");
            burger.setAttribute("aria-label", "Open menu");
          }
        }
        open();
      });
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    if (search) search.addEventListener("input", filter);
    if (clearBtn) clearBtn.addEventListener("click", function () {
      search.value = "";
      filter();
      search.focus();
    });

    panel.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    // Esc closes. Registered on document so it works even if focus escaped.
    // Stops propagation so the nav's own Esc handler doesn't also fire.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.documentElement.classList.contains("gl-open")) {
        e.stopPropagation();
        close();
      }
    }, true);
  })();

  /* The site has no forms — inquiries go by email (mailto). Nothing to wire. */
})();
