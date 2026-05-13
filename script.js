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

/* ---------- Pricing tabs ---------- */
function switchPricingTab(tab, btn) {
    document.querySelectorAll('.pricing-panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.pricing-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + tab).style.display = 'block';
    btn.classList.add('active');
}

/* ---------- Alkalmi carousel ---------- */
(function () {
    let current = 0;
    const GAP = 24;

    function getVisible() {
        const w = window.innerWidth;
        if (w <= 560) return 1;
        if (w <= 900) return 2;
        return 3;
    }

    const carousel = document.getElementById('alkalmiCarousel');
    if (!carousel) return;

    const viewport = carousel.closest('.carousel-viewport');
    const cards    = carousel.querySelectorAll('.alkalmi-card');
    const total    = cards.length;
    const dotsWrap = document.getElementById('carouselDots');
    const wrap     = carousel.closest('.alkalmi-carousel-wrap');
    const btnLeft  = wrap.querySelector('.carousel-arrow--left');
    const btnRight = wrap.querySelector('.carousel-arrow--right');

    const numDots = () => Math.max(1, total - getVisible() + 1);

    function setCardWidths() {
        const vis = getVisible();
        const vpW = viewport.offsetWidth;
        const cardW = (vpW - GAP * (vis - 1)) / vis;
        cards.forEach(c => {
            c.style.flex = `0 0 ${cardW}px`;
            c.style.minWidth = `${cardW}px`;
        });
    }

    function buildDots() {
        dotsWrap.innerHTML = '';
        for (let i = 0; i < numDots(); i++) {
            const d = document.createElement('button');
            d.className = 'carousel-dot' + (i === current ? ' active' : '');
            d.setAttribute('aria-label', (i + 1) + '. oldal');
            d.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(d);
        }
    }

    function updateDots() {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function updateArrows() {
        btnLeft.disabled  = current === 0;
        btnRight.disabled = current >= numDots() - 1;
    }

    function goTo(idx) {
        const maxIdx = numDots() - 1;
        current = Math.max(0, Math.min(idx, maxIdx));
        const cardW = cards[0].offsetWidth;
        carousel.style.transform = `translateX(-${current * (cardW + GAP)}px)`;
        carousel.style.transition = 'transform 0.4s ease';
        updateDots();
        updateArrows();
    }

    function init() {
        setCardWidths();
        buildDots();
        goTo(0);
    }

    init();

    window.shiftCarousel = function (dir) { goTo(current + dir); };

    window.addEventListener('resize', () => {
        current = 0;
        init();
    });

    // Ha a panel kezdetben rejtve van, újrainicializál amikor láthatóvá válik
    const observer = new MutationObserver(() => {
        if (viewport.offsetWidth > 0) {
            init();
            observer.disconnect();
        }
    });
    observer.observe(document.getElementById('panel-alkalmi'), { attributes: true, attributeFilter: ['style'] });
})();

/* ---------- Bérletek carousel (mobile) ---------- */
(function () {
    const grid = document.getElementById('berletGrid');
    const dotsWrap = document.getElementById('berletDots');
    if (!grid || !dotsWrap) return;

    const cards = grid.querySelectorAll('.plan');
    const total = cards.length;

    function buildDots() {
        dotsWrap.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const d = document.createElement('button');
            d.className = 'berlet-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', (i + 1) + '. bérlet');
            d.addEventListener('click', () => {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            });
            dotsWrap.appendChild(d);
        }
    }

    function updateDots() {
        const cardW = cards[0].offsetWidth + 16;
        const idx = Math.round(grid.scrollLeft / cardW);
        dotsWrap.querySelectorAll('.berlet-dot').forEach((d, i) => {
            d.classList.toggle('active', i === idx);
        });
    }

    buildDots();
    grid.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', buildDots);
})();

/* ---------- Alkalmi carousel scroll-based dots (mobile) ---------- */
(function () {
    const viewport = document.querySelector('.carousel-viewport');
    const dotsWrap = document.getElementById('carouselDots');
    if (!viewport || !dotsWrap) return;

    function isMobile() { return window.innerWidth <= 768; }

    function updateDotsOnScroll() {
        if (!isMobile()) return;
        const cards = viewport.querySelectorAll('.alkalmi-card');
        if (!cards.length) return;
        const cardW = cards[0].offsetWidth + 24;
        const idx = Math.round(viewport.scrollLeft / cardW);
        dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === idx);
        });
    }

    viewport.addEventListener('scroll', updateDotsOnScroll, { passive: true });
})();

/* ---------- Classes carousel (mobile) ---------- */
(function () {
    const grid = document.getElementById('classesGrid');
    const dotsWrap = document.getElementById('classesDots');
    if (!grid || !dotsWrap) return;

    const cards = grid.querySelectorAll('.class-card');
    const total = cards.length;

    function buildDots() {
        dotsWrap.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const d = document.createElement('button');
            d.className = 'classes-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', (i + 1) + '. kártya');
            d.addEventListener('click', () => {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            });
            dotsWrap.appendChild(d);
        }
    }

    function updateDots() {
        const cardW = cards[0].offsetWidth + 16;
        const idx = Math.round(grid.scrollLeft / cardW);
        dotsWrap.querySelectorAll('.classes-dot').forEach((d, i) => {
            d.classList.toggle('active', i === idx);
        });
    }

    buildDots();
    grid.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', buildDots);
})();

/* ---------- Features carousel (mobile) ---------- */
(function () {
    const list = document.getElementById('featuresList');
    const dotsWrap = document.getElementById('featuresDots');
    if (!list || !dotsWrap) return;

    const cards = list.querySelectorAll('.feat');
    const total = cards.length;

    function buildDots() {
        dotsWrap.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const d = document.createElement('button');
            d.className = 'features-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', (i + 1) + '. elem');
            d.addEventListener('click', () => {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            });
            dotsWrap.appendChild(d);
        }
    }

    function updateDots() {
        const scrollLeft = list.scrollLeft;
        const cardW = cards[0].offsetWidth + 16;
        const idx = Math.round(scrollLeft / cardW);
        dotsWrap.querySelectorAll('.features-dot').forEach((d, i) => {
            d.classList.toggle('active', i === idx);
        });
    }

    buildDots();
    list.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', buildDots);
})();

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
