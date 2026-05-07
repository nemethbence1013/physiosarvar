/* ---------- Navbar scroll ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---------- Mobile menu ---------- */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

function closeMobile() {
    mobileMenu.classList.remove('open');
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Smooth scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ---------- Contact form ---------- */
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    btn.innerHTML = '<i class="fas fa-check"></i> Üzenet elküldve!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = 'Üzenet küldése <i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
    }, 4000);
}
