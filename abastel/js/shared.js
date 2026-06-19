// Shared nav HTML (injected by pages)
const NAV_HTML = `
<nav class="nav">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-logo">ABAS<span>TEL</span></a>
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
        </div>
      </li>
      <li><a href="factory-tour.html" data-page="factory">Factory Tour</a></li>
      <li><a href="gallery.html" data-page="gallery">Gallery</a></li>
      <li><a href="contact.html" data-page="contact">Contact</a></li>
    </ul>
    <a href="contact.html" class="nav-cta">Get in Touch</a>
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