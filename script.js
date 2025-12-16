// Function untuk mengisi tahun saat ini di Footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

// Function untuk Toggle Dark/Light Mode
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cek preferensi tema di localStorage (jika ada)
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    // Update icon setelah reload
    themeToggle.querySelector('i').className = currentTheme === 'light-theme' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    // Toggle class di body
    body.classList.toggle('light-theme');

    // Update icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light-theme');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark-theme');
    }
});

// Function untuk Menu Burger
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    // Ganti ikon menjadi X saat menu terbuka
    icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

// Tutup menu saat link diklik (khusus mobile)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            navLinks.classList.remove('open');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});