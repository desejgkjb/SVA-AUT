/* =================================================================
   SVA AUT — Site JavaScript
   Sections:
   0. Content layer — fetch JSON managed by Decap CMS and render
   1. Footer year
   2. Sticky nav + mobile menu
   3. Scroll-reveal animations
   4. Modals (event + membership) open/close  (event-delegated)
   5. Form validation + success messages
   6. Shop "Buy Now" toast
   ----------------------------------------------------------------- */
(function () {
  "use strict";

  /* ===============================================================
     0) CONTENT LAYER
     Events, products and site settings are managed in the CMS and
     stored as JSON in /content. We fetch them and render on load.
     The static markup in index.html is a fallback that this code
     replaces whenever the JSON loads successfully (i.e. when the
     site is served over http — fetch is blocked on file://).
     =============================================================== */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function setText(sel, val) {
    if (val == null) return;
    var n = document.querySelector(sel);
    if (n) n.textContent = val;
  }
  function setHref(sel, val) {
    if (!val) return;
    var n = document.querySelector(sel);
    if (n) n.setAttribute("href", val);
  }

  var PIN_SVG =
    '<svg class="ic" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>';
  var CLOCK_SVG =
    '<svg class="ic" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h-4V7h2v4h2Z"/></svg>';

  function eventCardHTML(ev) {
    return (
      '<article class="event-card reveal">' +
        '<div class="event-card__date"><span class="day">' + esc(ev.day) + '</span><span class="mon">' + esc(ev.month) + '</span></div>' +
        '<div class="event-card__body">' +
          '<h3 class="event-card__title">' + esc(ev.title) + '</h3>' +
          '<ul class="event-card__meta">' +
            '<li>' + PIN_SVG + " " + esc(ev.location) + '</li>' +
            '<li>' + CLOCK_SVG + " " + esc(ev.time) + '</li>' +
          '</ul>' +
          '<p class="event-card__desc">' + esc(ev.description) + '</p>' +
          '<button class="btn btn--primary btn--block" data-signup="' + esc(ev.title) + '">Sign Up</button>' +
        '</div>' +
      '</article>'
    );
  }

  function productCardHTML(p) {
    var badge = "";
    if (p.badge && String(p.badge).trim()) {
      var cls = p.badgeStyle === "alt" ? "product-card__badge product-card__badge--alt" : "product-card__badge";
      badge = '<span class="' + cls + '">' + esc(p.badge) + "</span>";
    }
    return (
      '<article class="product-card reveal">' +
        '<div class="product-card__media">' +
          '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" />' +
          badge +
        '</div>' +
        '<div class="product-card__body">' +
          '<h3 class="product-card__name">' + esc(p.name) + '</h3>' +
          '<p class="product-card__desc">' + esc(p.description) + '</p>' +
          '<div class="product-card__foot">' +
            '<span class="price">$' + esc(p.price) + '</span>' +
            '<button class="btn btn--primary btn--sm" data-buy="' + esc(p.name) + '">Buy Now</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderEvents(list) {
    if (!Array.isArray(list) || !list.length) return;
    var grid = document.getElementById("eventsGrid");
    if (grid) grid.innerHTML = list.map(eventCardHTML).join("");
    // Keep the event-modal dropdown in sync with the current events.
    var select = document.getElementById("e-event");
    if (select) {
      var opts = '<option value="" disabled selected>Select an event…</option>';
      list.forEach(function (ev) { opts += "<option>" + esc(ev.title) + "</option>"; });
      select.innerHTML = opts;
    }
  }

  function renderProducts(list) {
    if (!Array.isArray(list) || !list.length) return;
    var grid = document.getElementById("shopGrid");
    if (grid) grid.innerHTML = list.map(productCardHTML).join("");
  }

  function applySettings(s) {
    if (!s) return;
    if (s.hero) {
      setText(".hero .eyebrow", s.hero.eyebrow);
      var title = document.querySelector(".hero__title");
      if (title && (s.hero.titleLead != null || s.hero.titleHighlight != null)) {
        title.innerHTML =
          esc(s.hero.titleLead || "") +
          (s.hero.titleHighlight ? ' <span class="text-grad">' + esc(s.hero.titleHighlight) + "</span>" : "");
      }
      setText(".hero__subtitle", s.hero.subtitle);
      setText(".hero__actions .btn--primary", s.hero.primaryCta);
      setText(".hero__actions .btn--ghost", s.hero.secondaryCta);
    }
    if (Array.isArray(s.stats)) {
      var wrap = document.querySelector(".hero__stats");
      if (wrap) {
        wrap.innerHTML = s.stats
          .map(function (st) {
            return '<div class="stat"><strong>' + esc(st.value) + "</strong><span>" + esc(st.label) + "</span></div>";
          })
          .join("");
      }
    }
    if (s.contact) {
      var em = document.getElementById("contactEmail");
      if (em && s.contact.email) { em.textContent = s.contact.email; em.setAttribute("href", "mailto:" + s.contact.email); }
      var ph = document.getElementById("contactPhone");
      if (ph && s.contact.phone) { ph.textContent = s.contact.phone; ph.setAttribute("href", "tel:" + s.contact.phone.replace(/[^0-9+]/g, "")); }
      var ad = document.getElementById("contactAddress");
      if (ad && (s.contact.addressLine1 || s.contact.addressLine2)) {
        ad.innerHTML = esc(s.contact.addressLine1 || "") + "<br/>" + esc(s.contact.addressLine2 || "");
      }
    }
    if (s.social) {
      setHref('.footer__social a[aria-label="Instagram"]', s.social.instagram);
      setHref('.footer__social a[aria-label="Facebook"]', s.social.facebook);
      setHref('.footer__social a[aria-label="TikTok"]', s.social.tiktok);
      setHref('.footer__social a[aria-label="LinkedIn"]', s.social.linkedin);
    }
  }

  function loadJSON(file) {
    return fetch(file, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  function bootstrapContent() {
    // fetch() of local files is blocked under file:// — keep the static
    // fallback markup in that case. Serve over http to see CMS content.
    if (location.protocol === "file:") return Promise.resolve();
    return Promise.all([
      loadJSON("content/events.json").then(function (d) { renderEvents(d.events); }).catch(function () {}),
      loadJSON("content/shop.json").then(function (d) { renderProducts(d.products); }).catch(function () {}),
      loadJSON("content/settings.json").then(applySettings).catch(function () {})
    ]);
  }

  /* ===============================================================
     UI LAYER — runs after content is rendered
     =============================================================== */
  function initUI() {
    /* ----- 1) Footer year ----- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ----- 2) Sticky nav + mobile menu ----- */
    var nav = document.getElementById("nav");
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");

    function onScroll() {
      if (window.scrollY > 40) nav.classList.add("nav--scrolled");
      else nav.classList.remove("nav--scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function closeMenu() {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    /* ----- 3) Scroll-reveal animations ----- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    /* ----- 4) Modal system (event-delegated so dynamic cards work) ----- */
    var lastFocused = null;
    var eventModal = document.getElementById("eventModal");
    var membershipModal = document.getElementById("membershipModal");

    function showView(modal, view) {
      modal.querySelectorAll("[data-modal-view]").forEach(function (v) {
        v.hidden = v.getAttribute("data-modal-view") !== view;
      });
    }
    function openModal(modal) {
      lastFocused = document.activeElement;
      showView(modal, "form");
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var firstInput = modal.querySelector("input, select, button");
      if (firstInput) setTimeout(function () { firstInput.focus(); }, 80);
    }
    function closeModal(modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.closest) return;

      var signup = t.closest("[data-signup]");
      if (signup) {
        var name = signup.getAttribute("data-signup");
        var label = document.getElementById("eventModalEventName");
        var select = document.getElementById("e-event");
        if (label) label.textContent = name;
        if (select) {
          Array.prototype.forEach.call(select.options, function (opt) {
            if (opt.value === name || opt.text === name) select.value = opt.value || opt.text;
          });
        }
        openModal(eventModal);
        return;
      }

      var join = t.closest("[data-open-membership]");
      if (join) {
        e.preventDefault();
        closeMenu();
        openModal(membershipModal);
        return;
      }

      var buy = t.closest("[data-buy]");
      if (buy) {
        showToast("Added “" + buy.getAttribute("data-buy") + "” — checkout coming soon!");
        return;
      }

      var close = t.closest("[data-close]");
      if (close) {
        var m = close.closest(".modal");
        if (m) closeModal(m);
        return;
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") document.querySelectorAll(".modal.open").forEach(closeModal);
    });

    /* ----- 5) Form validation + success handling ----- */
    function setError(input, msg) {
      var err = input.parentElement.querySelector("[data-error]");
      if (err) err.textContent = msg || "";
      input.classList.toggle("invalid", !!msg);
    }
    function validateField(input) {
      var val = (input.value || "").trim();
      if (!val) { setError(input, "This field is required."); return false; }
      if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setError(input, "Please enter a valid email address."); return false;
      }
      if (input.type === "tel" && val.replace(/[^0-9]/g, "").length < 7) {
        setError(input, "Please enter a valid phone number."); return false;
      }
      setError(input, "");
      return true;
    }
    function validateForm(form) {
      var fields = form.querySelectorAll("input[required], select[required]");
      var ok = true, firstBad = null;
      fields.forEach(function (f) {
        if (!validateField(f)) { ok = false; if (!firstBad) firstBad = f; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    }
    document.querySelectorAll("form input, form select").forEach(function (f) {
      f.addEventListener("input", function () {
        if (f.classList.contains("invalid")) validateField(f);
      });
    });

    function handleSubmit(form, onSuccess) {
      if (!form) return;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateForm(form)) return;
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting…"; }
        // ----- BACKEND HOOK: replace this setTimeout with a fetch() POST -----
        setTimeout(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
          form.reset();
          onSuccess(new FormData(form));
        }, 700);
      });
    }

    var eventForm = document.getElementById("eventForm");
    handleSubmit(eventForm, function () {
      var msg = document.getElementById("eventSuccessMsg");
      var picked = document.getElementById("e-event");
      if (msg && picked && picked.value) {
        msg.textContent = "Your spot for “" + picked.value + "” is confirmed. Check your student email for details.";
      }
      showView(eventModal, "success");
    });

    var membershipModalForm = document.getElementById("membershipModalForm");
    handleSubmit(membershipModalForm, function () {
      showView(membershipModal, "success");
    });

    var membershipForm = document.getElementById("membershipForm");
    handleSubmit(membershipForm, function () {
      var card = membershipForm.closest(".membership__card");
      if (card) {
        card.innerHTML =
          '<div class="success">' +
          '<div class="success__check" aria-hidden="true">✓</div>' +
          '<h3 class="form__title">Welcome to the Army! 🧡</h3>' +
          '<p class="form__sub">Thanks for joining SVA AUT. We’ve emailed your membership details and next steps — see you at the next event!</p>' +
          "</div>";
      }
    });

    /* ----- 6) Shop "Buy Now" toast ----- */
    var toast = document.getElementById("toast");
    var toastTimer = null;
    // Function declaration: hoisted within initUI so the delegated click
    // handler above can reference it.
    function showToast(text) {
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2600);
    }
  }

  /* ----- Boot ----- */
  bootstrapContent().then(initUI);
})();
