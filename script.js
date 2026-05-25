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

// ==================== DATA BERITA (dengan konten lengkap) ====================
const newsData = [
    {
        id: 1,
        title: "Persebaya Raih Kemenangan Dramatis 3-2 atas Arema FC",
        excerpt: "Gol kemenangan di menit ke-90+4 memastikan Green Force membawa pulang 3 poin dari Derby Jawa Timur yang berlangsung sengit.",
        category: "match",
        date: "12 Mei 2026",
        author: "Tim Redaksi",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=400&fit=crop",
        fullContent: "Pertandingan super klasik antara Persebaya dan Arema FC berlangsung di Stadion Gelora Bung Tomo dengan disaksikan lebih dari 50 ribu pasangan mata. Laga berjalan sengit sejak awal babak pertama. Arema FC sempat unggul lebih dulu melalui gol cepat di menit ke-12. Namun Persebaya tidak patah semangat. Francisco Rivera berhasil menyamakan kedudukan di menit ke-35 melalui tendangan bebas yang indah. Memasuki babak kedua, Persebaya tampil lebih dominan. Namun Arema kembali mencetak gol di menit ke-70 melalui serangan balik. Skor 1-2 membuat tensi semakin panas. Di masa injury time, keajaiban terjadi. Rivera mencetak gol keduanya di menit ke-90+2, kemudian di menit ke-90+4, pemain muda Muhammad Iqbal mencetak gol kemenangan. Stadion bergemuruh, kemenangan dramatis untuk Green Force! Hasil ini membawa Persebaya naik ke peringkat 5 klasemen sementara."
    },
    {
        id: 2,
        title: "Resmi: Striker Asing Baru Bergabung dengan Persebaya",
        excerpt: "Pemain asal Brasil menandatangani kontrak 2 tahun + opsi perpanjangan untuk memperkuat lini serang musim depan.",
        category: "transfer",
        date: "10 Mei 2026",
        author: "Transfer News",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
        fullContent: "Manajemen Persebaya secara resmi mengumumkan perekrutan striker asal Brasil, Carlos Alberto da Silva. Pemain berusia 26 tahun ini sebelumnya bermain untuk klub Serie B Brasil, Cruzeiro. Kontrak ditandatangani untuk durasi 2 tahun dengan opsi perpanjangan satu musim. Dalam konferensi pers, Carlos mengatakan sangat antusias bisa bermain di Indonesia dan bergabung dengan salah satu klub terbesar. 'Saya tahu Persebaya punya suporter luar biasa. Saya siap memberikan yang terbaik dan mencetak banyak gol,' ujarnya. Pelatih kepala juga optimis dengan kedatangan Carlos karena postur dan naluri golnya dianggap cocok dengan skema tim."
    },
    {
        id: 3,
        title: "Latihan Perdana di Stadion GBT: Persebaya Optimis Sambut Liga",
        excerpt: "Skuad Green Force menggelar latihan terbuka yang dihadiri ribuan supporter, suasana penuh semangat.",
        category: "training",
        date: "8 Mei 2026",
        author: "Media Officer",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop",
        fullContent: "Sekitar 2000 supporter memadati Stadion Gelora Bung Tomo untuk menyaksikan latihan terbuka Persebaya. Para pemain menjalani sesi taktik dan small-sided games dengan antusiasme tinggi. Pelatih kepala mengatakan persiapan tim sudah mencapai 85% dan siap untuk laga pembuka liga pekan depan. 'Dukungan suporter seperti ini yang membuat kami makin termotivasi. Kami janji akan berjuang habis-habisan,' ujar kapten tim. Latihan ditutup dengan sesi foto bersama dan tanda tangan untuk para supporter."
    },
    {
        id: 4,
        title: "Wawancara Eksklusif: Kapten Tim Bicara Target Musim Ini",
        excerpt: "Kapten tim mengungkapkan tekad membawa Persebaya juara Liga 1 dan fokus pada konsistensi.",
        category: "interview",
        date: "5 Mei 2026",
        author: "Wawancara",
        image: "https://images.unsplash.com/photo-1568992687947-868a62a9f1a4?w=600&h=400&fit=crop",
        fullContent: "Dalam wawancara eksklusif di sela-sela latihan, kapten tim Ahmad Faiz mengungkapkan target utama Persebaya musim ini adalah merebut gelar juara Liga 1. 'Kami punya skuat yang lebih kuat dari tahun lalu. Pengalaman final tahun lalu menjadi pelajaran berharga. Fokus kami adalah konsistensi sepanjang musim,' ujar Faiz. Ia juga berharap seluruh elemen bisa bekerja sama. 'Supporter adalah kekuatan ke-12 kami. Tanpa mereka, kami bukan apa-apa. Mohon dukungannya dari menit pertama hingga akhir.'"
    },
    {
        id: 5,
        title: "Supporter Tribun Kidul Mewarnai Stadion GBT dengan Chant Luar Biasa",
        excerpt: "Koreografi megah dan chant non-stop sepanjang pertandingan membuat atmosfer stadion luar biasa.",
        category: "match",
        date: "1 Mei 2026",
        author: "Lapangan",
        image: "https://images.unsplash.com/photo-1459865264687-1a3b8e6e5afb?w=600&h=400&fit=crop",
        fullContent: "Pertandingan melawan Persib Bandung menjadi saksi penampilan spektakuler dari Tribun Kidul. Ribuan supporter menampilkan koreografi raksasa bertuliskan 'Satu Nyali Wani' yang membentang di tribun kidul. Chant 'Persebaya... ooo...' bergema non-stop selama 90 menit. Tak hanya itu, mereka juga membawa 2000 bendera kecil yang dikibarkan serempak. Keindahan visual dan audio ini membuat stadion terasa seperti kawah panas. Beberapa pemain Persebaya mengaku merinding mendapat dukungan seperti itu. Suporter Persib pun mengakui Tribun Kidul adalah salah satu yang terbaik di Indonesia."
    },
    {
        id: 6,
        title: "Dua Pemain Muda Dipromosikan ke Tim Utama",
        excerpt: "Hasil seleksi akademi, dua pemain berbakat resmi dikontrak untuk mengisi skuad musim depan.",
        category: "transfer",
        date: "28 April 2026",
        author: "Akademi",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop",
        fullContent: "Akademi Persebaya kembali melahirkan talenta muda potensial. Dua pemain, Rizky Fadillah (18 tahun, gelandang) dan Wawan Setiawan (19 tahun, bek tengah) resmi dipromosikan ke tim utama. Keduanya menandatangani kontrak tiga tahun. Manajer tim mengatakan ini adalah bukti komitmen klub dalam pembinaan pemuda. 'Mereka sudah menunjukkan performa impresif di tim U-20 dan pramusim. Kami yakin mereka bisa berkontribusi,' ujarnya. Rizky dan Wawan akan mengenakan nomor punggung 27 dan 33 untuk musim depan."
    }
];

let visibleCount = 3;

function renderNews() {
    const visibleNews = newsData.slice(0, visibleCount);
    const grid = document.getElementById("newsGrid");
    if (!grid) return;

    grid.innerHTML = visibleNews.map(news => `
        <div class="news-card" data-id="${news.id}">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <span class="news-category">${news.category.toUpperCase()}</span>
                <div class="news-date">
                    <i class="far fa-calendar-alt"></i> ${news.date}
                </div>
            </div>
            <div class="news-content">
                <h3>${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-meta">
                    <div class="news-author">
                        <i class="fas fa-user"></i> ${news.author}
                    </div>
                    <a href="#" class="read-more" data-id="${news.id}">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    `).join('');

    const loadBtn = document.getElementById("loadMoreBtn");
    if (loadBtn) {
        if (visibleCount >= newsData.length) {
            loadBtn.style.display = "none";
        } else {
            loadBtn.style.display = "inline-flex";
        }
    }
}

// Fungsi menampilkan modal
function showModal(news) {
    const modal = document.getElementById("newsModal");
    if (!modal) {
        console.error("Modal element not found! Pastikan HTML modal sudah ditambahkan.");
        return;
    }
    document.getElementById("modalCategory").innerText = news.category.toUpperCase();
    document.getElementById("modalImage").src = news.image;
    document.getElementById("modalTitle").innerText = news.title;
    document.getElementById("modalDate").innerText = news.date;
    document.getElementById("modalAuthor").innerText = news.author;
    document.getElementById("modalContent").innerHTML = news.fullContent;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("newsModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

// Event delegation untuk tombol "Baca Selengkapnya" (aman meski konten dinamis)
document.addEventListener('click', function (e) {
    // Cari elemen .read-more yang diklik atau di dalamnya
    const target = e.target.closest('.read-more');
    if (target && target.classList.contains('read-more')) {
        e.preventDefault();
        const newsId = parseInt(target.getAttribute('data-id'));
        const news = newsData.find(n => n.id === newsId);
        if (news) {
            showModal(news);
        }
    }
});

// Event listener untuk menutup modal
document.addEventListener('click', function (e) {
    const modal = document.getElementById("newsModal");
    if (!modal) return;
    // Tutup jika klik pada tombol close, tombol tutup, atau area luar modal
    if (e.target.classList.contains('modal-close') ||
        e.target.classList.contains('modal-close-btn') ||
        e.target === modal) {
        closeModal();
    }
});

// Load More
const loadMoreBtn = document.getElementById("loadMoreBtn");
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        if (visibleCount < newsData.length) {
            visibleCount += 3;
            renderNews();
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', function () {
    renderNews();
});

document.querySelectorAll('.stat-panel, .feature-premium, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

console.log('Tribun Kidul Suroboyo Premium Website Loaded! ⚡');
