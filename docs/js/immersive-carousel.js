// ─── BASIC VERTICALS CAROUSEL ──────────────────────────────────────
// Multi-card horizontal carousel for the homepage "Our Verticals" section
// (modeled on Framer's Basic Carousel component, reimplemented in
// vanilla JS/CSS). Shows 3 cards at once on desktop (2 on tablet,
// 1 on mobile) with a peek of the next card. Card widths are computed
// from the stage width and set via JS so they respond to resize.
// Navigation: prev/next arrows, dot indicators, autoplay, keyboard,
// and horizontal wheel/swipe.

(function () {
  const carousel = document.getElementById('immersiveCarousel');
  const stage = document.getElementById('immersiveStage');
  const prevBtn = document.getElementById('immersiveArrowPrev');
  const nextBtn = document.getElementById('immersiveArrowNext');
  const dotsEl = document.getElementById('immersiveDots');
  if (!carousel || !stage) return;

  const cards = Array.from(stage.querySelectorAll('.immersive-card'));
  if (!cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let activeIndex = 0;
  let dots = [];
  const CLICK_OPEN_DELAY = 1800;
  const HOVER_OPEN_DELAY = 1400;

  function perPage() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  function layout() {
    const pp = perPage();
    const gap = pp === 1 ? 12 : 16;
    const peek = pp === 1 ? 40 : 28; // px of next card peeking
    const stageW = stage.offsetWidth;
    const cardW = Math.floor((stageW - (pp - 1) * gap - peek) / pp);
    cards.forEach(c => { c.style.width = cardW + 'px'; });
    stage.style.gap = gap + 'px';
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    dots = cards.map((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'immersive-dot';
      btn.setAttribute('aria-label', 'Go to vertical ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
      return btn;
    });
  }

  function updateUI() {
    const pp = perPage();
    dots.forEach((d, i) => d.classList.toggle('is-active', i === activeIndex));
    if (prevBtn) prevBtn.disabled = activeIndex === 0;
    if (nextBtn) nextBtn.disabled = activeIndex >= cards.length - pp;
  }

  function scrollToActive() {
    const card = cards[activeIndex];
    if (!card) return;
    const padLeft = parseFloat(getComputedStyle(stage).paddingLeft) || 0;
    stage.scrollTo({
      left: card.offsetLeft - padLeft,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  }

  function goTo(index) {
    activeIndex = Math.max(0, Math.min(cards.length - 1, index));
    scrollToActive();
    updateUI();
    startAutoplay();
  }

  function clearPressState(card) {
    if (!card) return;
    card.classList.remove('is-opening');
    card.classList.remove('is-pressed');
  }

  function clearHoverState(card) {
    if (!card) return;
    card.classList.remove('is-hover-open');
    window.clearTimeout(card._hoverOpenTimer);
    card._hoverOpenTimer = null;
  }

  function openHoverState(card) {
    if (!hoverCapable || reduceMotion) return;
    window.clearTimeout(card._hoverOpenTimer);
    card.classList.add('is-hover-open');
  }

  function closeHoverStateLater(card) {
    if (!hoverCapable || reduceMotion) return;
    window.clearTimeout(card._hoverOpenTimer);
    card._hoverOpenTimer = window.setTimeout(() => {
      card.classList.remove('is-hover-open');
      card._hoverOpenTimer = null;
    }, HOVER_OPEN_DELAY);
  }

  function handleCardClick(event) {
    if (reduceMotion) return;
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const card = event.currentTarget;
    const href = card.getAttribute('href');
    if (!href) return;

    event.preventDefault();
    card.classList.add('is-opening');
    card.classList.add('is-pressed');

    window.setTimeout(() => {
      clearPressState(card);
      window.location.href = href;
    }, CLICK_OPEN_DELAY);
  }

  // ── Autoplay
  const DELAY = 4000;
  let timer = null;
  let hovered = false;
  let focused = false;

  function stopAutoplay() { clearInterval(timer); timer = null; }
  function startAutoplay() {
    stopAutoplay();
    if (reduceMotion || hovered || focused) return;
    timer = setInterval(() => {
      const pp = perPage();
      const maxIndex = cards.length - pp;
      goTo(activeIndex >= maxIndex ? 0 : activeIndex + 1);
    }, DELAY);
  }

  carousel.addEventListener('mouseenter', () => { hovered = true; stopAutoplay(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; startAutoplay(); });
  carousel.addEventListener('focusin', () => { focused = true; stopAutoplay(); });
  carousel.addEventListener('focusout', () => {
    setTimeout(() => {
      if (!carousel.contains(document.activeElement)) { focused = false; startAutoplay(); }
    }, 0);
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

  cards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
    card.addEventListener('pointerdown', () => {
      if (!reduceMotion) card.classList.add('is-pressed');
    });
    card.addEventListener('pointerup', () => {
      if (!reduceMotion) card.classList.remove('is-pressed');
    });
    card.addEventListener('pointercancel', () => clearPressState(card));
    card.addEventListener('pointerenter', () => openHoverState(card));
    card.addEventListener('pointerleave', () => {
      if (!card.classList.contains('is-opening')) card.classList.remove('is-pressed');
      closeHoverStateLater(card);
    });
    card.addEventListener('focus', () => openHoverState(card));
    card.addEventListener('blur', () => {
      if (!card.classList.contains('is-opening')) clearHoverState(card);
    });
  });

  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeIndex - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeIndex + 1); }
  });

  stage.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (e.deltaX > 20) goTo(activeIndex + 1);
    else if (e.deltaX < -20) goTo(activeIndex - 1);
  }, { passive: false });

  // Sync active dot when user manually scrolls
  let scrollDebounce;
  stage.addEventListener('scroll', () => {
    clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(() => {
      const gap = parseInt(stage.style.gap) || 16;
      const cardW = cards[0] ? cards[0].offsetWidth + gap : 1;
      const closest = Math.round(stage.scrollLeft / cardW);
      if (closest !== activeIndex) {
        activeIndex = Math.max(0, Math.min(cards.length - 1, closest));
        updateUI();
      }
    }, 80);
  }, { passive: true });

  window.addEventListener('resize', () => { layout(); updateUI(); });

  layout();
  buildDots();
  updateUI();
  startAutoplay();
})();
