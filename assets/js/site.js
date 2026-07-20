/* AMIR ACADEMY — site.js
   Vanilla JS. Replaces the old jQuery plugin stack (slicknav, wow, owl,
   magnific-popup, etc.). Keep this file dependency-free. */
(function () {
  'use strict';

  /* ----- Header: scrolled state + mobile nav ----- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ----- Scroll reveals ----- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----- Lightbox (galleries) -----
     Usage: <a href="full.webp" data-lightbox="group" ...><img ...></a> */
  var lbLinks = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (lbLinks.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&#10005;</button>' +
      '<button class="lightbox__prev" aria-label="Previous photo">&#8592;</button>' +
      '<img alt="">' +
      '<button class="lightbox__next" aria-label="Next photo">&#8594;</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var current = -1;
    var lastFocus = null;

    function show(i) {
      current = (i + lbLinks.length) % lbLinks.length;
      var link = lbLinks[current];
      lbImg.src = link.getAttribute('href');
      var thumb = link.querySelector('img');
      lbImg.alt = thumb ? thumb.alt : '';
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lightbox__close').focus();
    }
    function close() {
      lb.classList.remove('is-open');
      lbImg.src = '';
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    lbLinks.forEach(function (link, i) {
      link.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ----- Contact form -----
     Posts to a static form service. Until the Formspree account exists
     (endpoint contains FORM_ID placeholder), falls back to a mailto: draft
     so the form is never a dead end. */
  var form = document.getElementById('contactForm');
  if (form) {
    var statusEl = document.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var endpoint = form.getAttribute('action') || '';
      var setStatus = function (msg, ok) {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className = 'form-status ' + (ok ? 'is-success' : 'is-error');
      };
      if (endpoint.indexOf('FORM_ID') !== -1) {
        // Formspree not configured yet — open a pre-filled email instead.
        var subject = encodeURIComponent(data.get('subject') || 'Website inquiry');
        var body = encodeURIComponent(
          (data.get('message') || '') + '\n\n— ' + (data.get('name') || '') + ' (' + (data.get('email') || '') + ')'
        );
        window.location.href = 'mailto:amir@amiracademy.com?subject=' + subject + '&body=' + body;
        setStatus('Opening your email app… You can also call us at 727-821-4097.', true);
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("Message sent — we'll get back to you soon!", true);
        } else {
          setStatus('Something went wrong. Please email amir@amiracademy.com or call 727-821-4097.', false);
        }
      }).catch(function () {
        setStatus('Network error. Please email amir@amiracademy.com or call 727-821-4097.', false);
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
      });
    });
  }

  /* ----- Footer year ----- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
