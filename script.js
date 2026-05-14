/* ==================== PRELOADER ==================== */
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Tunggu 1 detik lalu hilangkan preloader
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1000);
    }

    // Animasi teks preloader per huruf (jika menggunakan span)
    const preloaderSpans = document.querySelectorAll('.preloader-text span');
    if (preloaderSpans.length > 0) {
        preloaderSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.05}s`;
        });
    }
});
/* ==================== CUSTOM CURSOR ==================== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
        setTimeout(() => {
            cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        }, 50);
    });

    const interactiveElements = document.querySelectorAll('a, button, .btn, .highlight-card-premium, .timeline-card, .value-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(201, 160, 61, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

/* ==================== NAVIGATION ==================== */
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

/* ==================== COUNTER ANIMATION ==================== */
const statNumbers = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const heroStatsPosition = heroStats.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (heroStatsPosition < screenPosition) {
        counterAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

/* ==================== SWIPER SLIDERS ==================== */
// Highlights Swiper
const highlightsSwiper = new Swiper(".highlights-swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,

    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    speed: 700,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        0: {
            spaceBetween: 16,
        },

        768: {
            spaceBetween: 24,
        }
    }
});

// Testimonials Swiper
const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/* ==================== BACK TO TOP ==================== */
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
/* ==================== GALLERY LIGHTBOX ==================== */
const galleryItems = document.querySelectorAll('.gallery-item-large, .gallery-item-medium, .gallery-item-small');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h4')?.textContent || 'Gallery Image';

        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        lightbox.innerHTML = `
            <div style="position: relative; max-width: 90%; max-height: 90%;">
                <img src="${imgSrc}" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 16px;">
                <div style="text-align: center; margin-top: 20px; color: white; font-size: 0.9rem;">${title}</div>
                <button style="position: absolute; top: -40px; right: -40px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.tagName === 'BUTTON') {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        });
    });
});

/* ==================== NEWSLETTER SUBSCRIPTION ==================== */
const newsletterForm = document.querySelector('.newsletter-premium-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input.value) {
            alert(`Terima kasih ${input.value} telah berlangganan! Dapatkan informasi terbaru dari Tribun Kidul.`);
            input.value = '';
        }
    });
}

/* ==================== SEARCH BUTTON ==================== */
const searchBtn = document.querySelector('.nav-search');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Fitur pencarian akan segera hadir!');
    });
}

/* ==================== AOS INITIALIZATION ==================== */
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

/* ==================== PARALLAX EFFECT ==================== */
const heroVideo = document.querySelector('.hero-video');
window.addEventListener('scroll', () => {
    if (heroVideo && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroVideo.style.transform = `translateY(${scrolled * 0.35}px)`;
    }
});

/* ==================== HOVER 3D EFFECT ==================== */
const cards3d = document.querySelectorAll('.highlight-card-premium, .timeline-card, .value-card');
cards3d.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

/* ==================== UPDATE COPYRIGHT YEAR ==================== */
const copyright = document.querySelector('.footer-bottom-premium p');
if (copyright) {
    const year = new Date().getFullYear();
    copyright.innerHTML = copyright.innerHTML.replace('2024', year);
}

/* ==================== PREVENT VIDEO AUTOPLAY ISSUES ==================== */
const video = document.querySelector('.hero-video');
if (video) {
    video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log('Video autoplay prevented:', e));
    });
}

/* ==================== SCROLL REVEAL EXTRA ==================== */
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-panel, .feature-premium, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

console.log('Tribun Kidul Suroboyo Premium Website Loaded! ⚡');