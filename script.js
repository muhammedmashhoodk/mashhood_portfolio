// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Sticky Header Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle Icon between Bars and Times (X)
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close Mobile Menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Dark Mode Toggle Logic
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Check Local Storage on Load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme('dark');
}

// Event Listener for Toggle Button
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
}

// ScrollReveal Animation (Simple version with Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all sections to animate
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Contact Form & Modal Logic
var submitted = false;
const modal = document.getElementById('confirmationModal');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');

function openModal() {
    modal.style.display = 'flex';
    contactForm.reset();
    submitted = false; // Reset for next time
}

// Close Modal functions
if (closeModal) {
    closeModal.onclick = function () {
        modal.style.display = 'none';
    }
}

const closeModalBtn = document.getElementById('closeModalBtn');
if (closeModalBtn) {
    closeModalBtn.onclick = function () {
        modal.style.display = 'none';
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Typing Animation
// Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.typing-text');
    const cursorElement = document.querySelector('.cursor');

    // Check if elements exist
    if (!textElement || !cursorElement) return;

    const textToType = textElement.textContent;
    textElement.textContent = ''; // Clear text initially

    let charIndex = 0;
    const typingSpeed = 100; // ms per char

    function type() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);

            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Typing finished
            cursorElement.style.animation = 'blink 1s infinite';
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
});

// Project Details Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.querySelector('.close-project-modal');
    const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');

    // Modal Elements
    const modalImg = document.getElementById('modalProjectImage');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalDesc = document.getElementById('modalProjectDesc');

    // Open Modal
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const title = this.getAttribute('data-title');
            const img = this.getAttribute('data-img');
            const desc = this.getAttribute('data-desc');

            modalTitle.textContent = title;
            modalImg.src = img;
            modalDesc.textContent = desc;

            projectModal.style.display = 'flex';
        });
    });

    // Close Modal Helper
    function closeProjectModalFunc() {
        projectModal.style.display = 'none';
    }

    // Close Events
    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', closeProjectModalFunc);
    }

    if (closeProjectModalBtn) {
        closeProjectModalBtn.addEventListener('click', closeProjectModalFunc);
    }

    // Window Click (Handle both modals)
    window.onclick = function (event) {
        const confirmationModal = document.getElementById('confirmationModal');
        if (event.target == confirmationModal) {
            confirmationModal.style.display = 'none';
        }
        if (event.target == projectModal) {
            projectModal.style.display = 'none';
        }
    }
});
