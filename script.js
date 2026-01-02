document.addEventListener('DOMContentLoaded', () => {
    // Accessibility Controls logic
    let fontSize = 100;
    const body = document.body;
    const increaseBtn = document.getElementById('increase-text');
    const decreaseBtn = document.getElementById('decrease-text');
    const resetBtn = document.getElementById('reset-text');
    const contrastBtn = document.getElementById('toggle-contrast');

    increaseBtn.addEventListener('click', () => {
        if (fontSize < 120) {
            fontSize += 5;
            body.style.fontSize = fontSize + '%';
        }
    });

    decreaseBtn.addEventListener('click', () => {
        if (fontSize > 80) {
            fontSize -= 5;
            body.style.fontSize = fontSize + '%';
        }
    });

    resetBtn.addEventListener('click', () => {
        fontSize = 100;
        body.style.fontSize = '100%';
    });

    contrastBtn.addEventListener('click', () => {
        body.classList.toggle('high-contrast');
    });

    const nav = document.getElementById('mainNav');
    const scrollOffset = 100;

    // Sticky Navigation logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollOffset) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }

        // Simple Reveal on Scroll
        const revealElements = document.querySelectorAll('[data-aos]');
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('reveal');
            }
        });
    });

    // Navigation Active Link highlight
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            } else {
                this.closest('.dropdown').querySelector('.nav-link').classList.add('active');
            }
        });
    });

    // Initialize reveal for elements already in view
    window.dispatchEvent(new Event('scroll'));

    // Counter Animation logic
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    if (counters.length > 0) {
        observer.observe(document.querySelector('.stats'));
    }
});
