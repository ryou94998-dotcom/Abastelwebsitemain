// ─── APPLE CARDS CAROUSEL ─────────────────────────────────────────
// Recreates the aceternity.com "Apple Cards Carousel": a horizontally
// scrolling row of image cards that, on click, grow in place into a
// full detail panel (a manual FLIP transition — no animation library).

(function () {
  const track = document.getElementById('appleTrack');
  const overlay = document.getElementById('appleOverlay');
  const modal = document.getElementById('appleModal');
  const modalInner = document.getElementById('appleModalInner');
  const closeBtn = document.getElementById('appleModalClose');
  const prevBtn = document.getElementById('appleArrowPrev');
  const nextBtn = document.getElementById('appleArrowNext');
  if (!track || !overlay || !modal) return;

  const cards = Array.from(track.querySelectorAll('.apple-card'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeCard = null;
  let isAnimating = false;

  // ── Carousel scrolling ──────────────────────────────────────────
  function updateArrows() {
    if (!prevBtn || !nextBtn) return;
    const max = track.scrollWidth - track.clientWidth - 1;
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = track.scrollLeft >= max;
  }
  if (prevBtn) prevBtn.addEventListener('click', () => track.scrollBy({ left: -360, behavior: 'smooth' }));
  if (nextBtn) nextBtn.addEventListener('click', () => track.scrollBy({ left: 360, behavior: 'smooth' }));
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();

  // ── Modal target geometry ───────────────────────────────────────
  function targetRect() {
    const width = Math.min(window.innerWidth * 0.92, 880);
    const height = Math.min(window.innerHeight * 0.86, 720);
    return {
      width,
      height,
      left: (window.innerWidth - width) / 2,
      top: (window.innerHeight - height) / 2,
    };
  }

  function applyRect(rect) {
    modal.style.top = rect.top + 'px';
    modal.style.left = rect.left + 'px';
    modal.style.width = rect.width + 'px';
    modal.style.height = rect.height + 'px';
  }

  // ── Open ─────────────────────────────────────────────────────────
  function openCard(card) {
    if (isAnimating) return;
    isAnimating = true;
    activeCard = card;

    const tpl = document.getElementById('apple-content-' + card.dataset.card);
    modalInner.innerHTML = '';
    if (tpl) modalInner.appendChild(tpl.content.cloneNode(true));

    const startRect = card.getBoundingClientRect();
    document.body.classList.add('apple-modal-locked');

    overlay.classList.add('open');
    modal.style.transition = 'none';
    applyRect({ top: startRect.top, left: startRect.left, width: startRect.width, height: startRect.height });
    modal.classList.add('visible');

    // Force layout before animating to the final rect.
    // eslint-disable-next-line no-unused-expressions
    modal.offsetHeight;

    requestAnimationFrame(() => {
      modal.style.transition = reduceMotion ? 'none' : 'top .5s cubic-bezier(.22,1,.36,1), left .5s cubic-bezier(.22,1,.36,1), width .5s cubic-bezier(.22,1,.36,1), height .5s cubic-bezier(.22,1,.36,1)';
      applyRect(targetRect());
    });

    const onDone = () => {
      modal.classList.add('open');
      isAnimating = false;
      modal.removeEventListener('transitionend', onDone);
    };
    if (reduceMotion) onDone();
    else modal.addEventListener('transitionend', onDone);
  }

  // ── Close ────────────────────────────────────────────────────────
  function closeCard() {
    if (isAnimating || !activeCard) return;
    isAnimating = true;
    modal.classList.remove('open');

    const endRect = activeCard.getBoundingClientRect();
    overlay.classList.remove('open');
    modal.style.transition = reduceMotion ? 'none' : 'top .45s cubic-bezier(.22,1,.36,1), left .45s cubic-bezier(.22,1,.36,1), width .45s cubic-bezier(.22,1,.36,1), height .45s cubic-bezier(.22,1,.36,1)';
    applyRect(endRect);

    const onDone = () => {
      modal.classList.remove('visible');
      modal.style.transition = 'none';
      modalInner.innerHTML = '';
      document.body.classList.remove('apple-modal-locked');
      activeCard = null;
      isAnimating = false;
      modal.removeEventListener('transitionend', onDone);
    };
    if (reduceMotion) onDone();
    else modal.addEventListener('transitionend', onDone);
  }

  cards.forEach((card) => card.addEventListener('click', () => openCard(card)));
  if (closeBtn) closeBtn.addEventListener('click', closeCard);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCard(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeCard(); });
})();
