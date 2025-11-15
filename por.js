document.addEventListener('DOMContentLoaded', () => {

    // --- Inisialisasi Elemen Umum ---
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section[id]');
    
    // Elemen untuk hamburger menu
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar'); // Navbar ini akan digunakan untuk semua fitur

    // Elemen untuk dark mode toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;


    // --- 1. Navigasi Aktif Otomatis (Scroll Spy) ---
    const sectionObserverOptions = {
        root: null, // Mengamati viewport
        threshold: 0.5, // Bagian aktif ketika 50% terlihat
        rootMargin: "-50px 0px -50px 0px" // Sedikit margin untuk penyesuaian posisi aktif
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active')); // Hapus active dari semua
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`.navbar a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Handle klik pada link navigasi untuk smooth scroll (dan tutup menu mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Tutup menu hamburger setelah klik jika terbuka (untuk mobile)
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                body.classList.remove('no-scroll'); // Pastikan body scroll kembali normal
            }
        });
    });


    // --- 2. Efek Fade-In Saat Menggulir (Reveal on Scroll) ---
    // Gunakan kelas 'reveal-on-scroll' di HTML pada elemen yang ingin di-fade-in
    const revealElements = document.querySelectorAll('.hero-content, .project-card, .about-card, .contact-section, .footer .social-links');

    const revealObserverOptions = {
        root: null,
        threshold: 0.1, // Element akan muncul saat 10% terlihat
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Berhenti mengamati setelah terlihat
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll'); // Tambahkan kelas awal untuk CSS
        revealObserver.observe(el);
    });


    // --- 3. Menu Hamburger (untuk Tampilan Seluler) ---
    if (hamburgerBtn && navbar) { // Pastikan elemen ditemukan
        hamburgerBtn.addEventListener('click', () => {
            navbar.classList.toggle('open');
            hamburgerBtn.classList.toggle('active'); // Ganti ikon (misal: dari bars ke times)
            body.classList.toggle('no-scroll'); // Cegah scroll body saat menu terbuka
        });
    } else {
        console.warn("Hamburger menu atau navbar tidak ditemukan.");
    }


    // --- 6. Mode Gelap (Dark Mode Toggle) ---
    if (themeToggleBtn) { // Pastikan elemen ditemukan
        // Periksa preferensi pengguna dari localStorage atau default
        const currentTheme = localStorage.getItem('theme') || 'light-theme';
        body.classList.add(currentTheme); // Terapkan tema saat halaman dimuat

        // Set ikon yang benar berdasarkan tema saat ini
        if (currentTheme === 'dark-theme') {
            themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            themeToggleBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon'); // Pastikan ikon default adalah bulan
        }

        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            } else {
                body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light-theme');
                themeToggleBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            }
        });
    } else {
        console.error("Elemen dengan ID 'theme-toggle' tidak ditemukan.");
    }

}); // End DOMContentLoaded