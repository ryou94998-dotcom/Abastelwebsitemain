// Shared nav HTML (injected by pages)
const NAV_HTML = `
<nav class="nav">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-logo" aria-label="Abastel home"><svg class="nav-logo-mark" viewBox="20 16 160 152" fill="none" aria-hidden="true"><path d="M100 16 L145.26 102 L106.63 102 L100 86 L93.37 102 L54.74 102 Z" fill="#0A2540"/><path d="M48.42 114 L88.4 114 L66 168 L20 168 Z" fill="#0A2540"/><path d="M111.6 114 L151.58 114 L180 168 L134 168 Z" fill="#0A2540"/><path d="M86.37 102 L113.63 102 L118.6 114 L81.4 114 Z" fill="#1F9DA8"/></svg>ABAS<span>TEL</span></a>
    <ul class="nav-links">
      <li><a href="../index.html" data-page="home">Home</a></li>
      <li><a href="our-story.html" data-page="story">Our Story</a></li>
      <li><a href="our-team.html" data-page="team">Our Team</a></li>
      <li class="nav-dropdown">
        <a href="#">Verticals ▾</a>
        <div class="dropdown-menu">
          <a href="telecom.html">Telecom & Fiber</a>
          <a href="plastic.html">Plastic Granules & Recycling</a>
          <a href="moulds.html">Moulds & Machining</a>
          <a href="packaging.html">Packaging</a>
          <a href="aerospace.html">Aerospace</a>
          <a href="ai.html">AI</a>
          <a href="software.html">Software</a>
        </div>
      </li>
      <li><a href="factory-tour.html" data-page="factory">Factory Tour</a></li>
      <li><a href="gallery.html" data-page="gallery">Gallery</a></li>
      <li><a href="contact.html" data-page="contact">Contact</a></li>
    </ul>
    <a href="contact.html" class="nav-cta"><span class="nav-cta__label">Get in touch</span></a>
    <button class="nav-hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mobile-menu">
  <a href="../index.html">Home</a>
  <a href="our-story.html">Our Story</a>
  <a href="our-team.html">Our Team</a>
  <a href="telecom.html">Telecom & Fiber</a>
  <a href="plastic.html">Plastic Granules & Recycling</a>
  <a href="moulds.html">Moulds & Machining</a>
  <a href="packaging.html">Packaging</a>
  <a href="aerospace.html">Aerospace</a>
  <a href="ai.html">AI</a>
  <a href="software.html">Software</a>
  <a href="factory-tour.html">Factory Tour</a>
  <a href="gallery.html">Gallery</a>
  <a href="contact.html">Contact Us</a>
</div>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">ABAS<span>TEL</span></div>
        <p class="footer-desc">A professionally managed company delivering quality fiber, electrical, moulding, packaging, and aerospace solutions from Delhi.</p>
        <div class="footer-social">
          <p class="footer-social-label">Follow Us</p>
          <!-- Placeholder social links — replace href="#" with Abastel's real profile URLs -->
          <div class="social-tiles">
            <a class="social-tile" href="#" target="_blank" rel="noopener" aria-label="Abastel on LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a class="social-tile" href="#" target="_blank" rel="noopener" aria-label="Abastel on Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a class="social-tile" href="#" target="_blank" rel="noopener" aria-label="Abastel on Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a class="social-tile" href="#" target="_blank" rel="noopener" aria-label="Abastel on X (Twitter)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>
            </a>
            <a class="social-tile" href="#" target="_blank" rel="noopener" aria-label="Abastel on YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="our-story.html">Our Story</a>
        <a href="our-team.html">Our Team</a>
        <a href="factory-tour.html">Factory Tour</a>
        <a href="gallery.html">Gallery</a>
      </div>
      <div class="footer-col">
        <h4>Verticals</h4>
        <a href="telecom.html">Telecom & Fiber</a>
        <a href="plastic.html">Plastic Granules</a>
        <a href="moulds.html">Moulds & Machining</a>
        <a href="packaging.html">Packaging</a>
        <a href="aerospace.html">Aerospace</a>
        <a href="ai.html">AI</a>
        <a href="software.html">Software</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <a href="contact.html">Get in Touch</a>
        <a href="mailto:info@abastel.in">info@abastel.in</a>
        <a href="#">Delhi, India</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Abastel LLP. All rights reserved.</span>
      <span>Made in India 🇮🇳</span>
    </div>
  </div>
</footer>`;

document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

// Active nav
(function() {
  const links = document.querySelectorAll('.nav-links a[data-page]');
  const page  = document.body.dataset.page;
  links.forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });
})();

// Mobile menu
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
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
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

// Scroll fade
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    })
    .then(r => {
      if (r.ok) {
        this.innerHTML = `<div style="text-align:center;padding:3rem 0"><div style="font-family:var(--f-display);font-size:1.5rem;font-weight:700;margin-bottom:0.5rem">Message received.</div><p style="color:var(--muted)">We'll get back to you within 24 hours.</p></div>`;
      } else { btn.textContent = 'Try again'; btn.disabled = false; }
    })
    .catch(() => { btn.textContent = 'Try again'; btn.disabled = false; });
  });
}