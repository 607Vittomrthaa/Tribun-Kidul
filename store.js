// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader-progress');

    if (preloader && progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('hide');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 600);
                }, 500);
            }
            progressBar.style.width = progress + '%';
        }, 150);
    }

    // Animate preloader text
    const preloaderText = document.querySelector('.preloader-text');
    if (preloaderText) {
        const text = preloaderText.textContent;
        preloaderText.innerHTML = text.split('').map(letter =>
            `<span style="display:inline-block; animation: textPop 0.4s ease forwards; opacity:0;">${letter}</span>`
        ).join('');
    }
});

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    const interactiveElements = document.querySelectorAll('a, button, .btn, .product-card, .category-card');
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

// ==================== NAVIGATION ====================
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

    // Active link update
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
}

// ==================== SMOOTH SCROLL ====================
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

// ==================== COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;

    const heroStats = document.querySelector('.hero-stats-premium');
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

// ==================== SWIPER SLIDERS ====================
// Category Swiper
new Swiper('.category-swiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
    },
});

// Testimonials Swiper
new Swiper('.testimonials-swiper-premium', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    effect: 'fade',
    fadeEffect: { crossFade: true },
});

// ==================== COUNTDOWN TIMER ====================
function startCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);

    const daysEl = document.querySelector('.days');
    const hoursEl = document.querySelector('.hours');
    const minutesEl = document.querySelector('.minutes');
    const secondsEl = document.querySelector('.seconds');

    if (!daysEl) return;

    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

startCountdown();

// ==================== WHATSAPP BUY FUNCTION WITH IMAGE (CARA 1) ====================
const phoneNumber = "6281917737513"; // Ganti dengan nomor WhatsApp admin

function sendWhatsAppMessage(productName, productPrice, productImageUrl) {
    // Encode image URL agar aman untuk URL
    const encodedImageUrl = encodeURIComponent(productImageUrl);

    // Format pesan dengan link gambar
    const message = `Halo Kak! Saya ingin memesan produk dari *Tribun Kidul Store* 🛍️%0A%0A` +
        `📸 *Preview Produk:*%0A${productImageUrl}%0A%0A` +
        `🛍️ *Nama Produk:* ${productName}%0A` +
        `💰 *Harga:* Rp ${productPrice.toLocaleString('id-ID')}%0A%0A` +
        `Saya tertarik untuk membeli. Mohon infokan:%0A` +
        `✅ Ketersediaan stok%0A` +
        `✅ Ukuran yang tersedia%0A` +
        `✅ Ongkos kirim ke daerah saya%0A%0A` +
        `Terima kasih! 🙏`;

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}

// Event listener untuk tombol beli via WhatsApp (.btn-buy-wa)
document.querySelectorAll('.btn-buy-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productName = btn.getAttribute('data-product');
        const productPrice = parseInt(btn.getAttribute('data-price'));
        const card = btn.closest('.product-card');
        let productImage = card.querySelector('.product-image img').src;

        // Kirim pesan dengan gambar
        sendWhatsAppMessage(productName, productPrice, productImage);

        // Animation feedback
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Buka WhatsApp...';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
});

// Tombol WhatsApp pada product actions (.whatsapp-buy)
document.querySelectorAll('.whatsapp-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.product-card');
        const productName = card.querySelector('.product-title').textContent;
        const priceText = card.querySelector('.current-price').textContent;
        const productPrice = parseInt(priceText.replace(/[^0-9]/g, ''));
        let productImage = card.querySelector('.product-image img').src;

        sendWhatsAppMessage(productName, productPrice, productImage);
    });
});

// ==================== PRODUCT FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        products.forEach(product => {
            if (filter === 'all' || product.getAttribute('data-category') === filter) {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                }, 10);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==================== QUICK VIEW ====================
document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.product-card');
        const productName = card.querySelector('.product-title').textContent;
        alert(`Quick View: ${productName}\nFull product details coming soon!\n\nSilahkan klik "Beli via WhatsApp" untuk order.`);
    });
});

// ==================== BACK TO TOP ====================
const backToTop = document.querySelector('.back-to-top-premium');

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

// ==================== NEWSLETTER SUBSCRIPTION ====================
const newsletterForm = document.querySelector('.newsletter-form-premium');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input.value) {
            alert(`Terima kasih ${input.value}! Anda telah berlangganan newsletter kami.`);
            input.value = '';
        }
    });
}

// ==================== SEARCH BUTTON ====================
const searchBtn = document.querySelector('.nav-search');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Fitur pencarian akan segera hadir!');
    });
}

// ==================== LOAD MORE BUTTON ====================
const loadMoreBtn = document.querySelector('.btn-load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        alert('Koleksi lainnya akan segera hadir! Stay tuned untuk produk-produk baru.');
    });
}

// ==================== LOGOUT FUNCTION ====================
function handleLogout() {
    const confirmLogout = confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
        window.location.href = "index.html";
    }
}

// ==================== AOS INITIALIZATION ====================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ==================== ADDITIONAL STYLES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes textPop {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ==================== UPDATE COPYRIGHT YEAR ====================
const copyright = document.querySelector('.copyright p');
if (copyright) {
    const year = new Date().getFullYear();
    copyright.innerHTML = copyright.innerHTML.replace('2024', year);
}

console.log('Kidul Premium Store Loaded! 🛍️✨');
