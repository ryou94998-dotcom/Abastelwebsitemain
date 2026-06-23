// ─── NAV ACTIVE STATE ────────────────────────────────────────────
(function() {
  const links = document.querySelectorAll('.nav-links a[data-page]');
  const page  = document.body.dataset.page;
  links.forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });
})();

// ─── MOBILE MENU ─────────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ─── SCROLL FADE-UP ──────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── CONTACT FORM ────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Replace this URL with your Formspree endpoint or backend
    fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    })
    .then(r => {
      if (r.ok) {
        this.innerHTML = `
          <div style="text-align:center;padding:3rem 0">
            <div style="font-family:var(--f-display);font-size:1.5rem;font-weight:700;margin-bottom:0.5rem">Message received.</div>
            <p style="color:var(--muted)">We'll get back to you within 24 hours.</p>
          </div>`;
      } else {
        btn.textContent = 'Try again';
        btn.disabled = false;
      }
    })
    .catch(() => { btn.textContent = 'Try again'; btn.disabled = false; });
  });
}
