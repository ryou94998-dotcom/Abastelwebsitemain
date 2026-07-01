// ─── SHARED MOTION LAYER ─────────────────────────────────────────
// Runs on every page (after shared.js / main.js have injected nav+footer).
// All effects are additive and degrade silently if their target markup
// isn't present, so this file is safe to include everywhere.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── STAGGERED SCROLL REVEALS ─────────────────────────────────────
// Gives siblings that fade up together a small incremental delay so
// they cascade in rather than popping in all at once.
if (!reduceMotion) {
  const groups = new Map();
  document.querySelectorAll('.fade-up').forEach((el) => {
    const parent = el.parentElement;
    const i = groups.get(parent) || 0;
    groups.set(parent, i + 1);
    el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
  });
}

// ─── NAV SCROLL STATE ──────────────────────────────────────────────
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const ratio = max > 0 ? h.scrollTop / max : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();

// ─── BACK TO TOP ───────────────────────────────────────────────────
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 480);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
})();

// ─── ANIMATED STAT COUNTERS ────────────────────────────────────────
(function () {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;
  const animate = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1100;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  nums.forEach((n) => obs.observe(n));
})();

// ─── CURSOR SPOTLIGHT ON HERO SECTIONS ────────────────────────────
if (!reduceMotion) {
  const zones = document.querySelectorAll('.hero, .page-hero, .aerospace-hero, .moulds-hero, .telecom-hero, .contact-grid-card');
  zones.forEach((zone) => {
    zone.addEventListener('mousemove', (e) => {
      const r = zone.getBoundingClientRect();
      zone.style.setProperty('--mx', `${e.clientX - r.left}px`);
      zone.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

// ─── HERO ORIGIN BUTTON ───────────────────────────────────────────
if (!reduceMotion && !window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('.hero-origin-btn').forEach((button) => {
    const updateOriginSize = () => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--origin-size', `${Math.max(rect.width, rect.height) * 2}px`);
    };

    const updateOriginPosition = (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--origin-x', `${event.clientX - rect.left}px`);
      button.style.setProperty('--origin-y', `${event.clientY - rect.top}px`);
    };

    button.addEventListener('pointerenter', (event) => {
      updateOriginSize();
      updateOriginPosition(event);
      button.style.setProperty('--origin-scale', '1');
    });

    button.addEventListener('pointermove', updateOriginPosition);

    button.addEventListener('pointerleave', () => {
      button.style.setProperty('--origin-scale', '0');
    });

    button.addEventListener('focus', () => {
      updateOriginSize();
      button.style.setProperty('--origin-x', '50%');
      button.style.setProperty('--origin-y', '50%');
      button.style.setProperty('--origin-scale', '1');
    });

    button.addEventListener('blur', () => {
      button.style.setProperty('--origin-scale', '0');
    });
  });
}

// ─── SUBTLE CARD TILT ──────────────────────────────────────────────
if (!reduceMotion && !window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('.card, .vertical-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
