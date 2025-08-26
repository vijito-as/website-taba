// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeCounters();
    initializeContactForm();
    initializeParticleSystem();
});

// Initialize all animations
function initializeAnimations() {
    // Animate hero content on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.animate-on-load');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 500 + 500);
        });
    }, 100);

    // Initialize intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('product-card')) {
                    const cards = document.querySelectorAll('.product-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Observe product cards for staggered animation
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Navigation functionality
function initializeNavigation() {
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Header background change on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
            header.style.backdropFilter = 'none';
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translate3d(0, ${rate}px, 0)`;
            
            // Fade out hero content on scroll
            const opacity = Math.max(0, 1 - scrolled / (hero.offsetHeight * 0.6));
            heroContent.style.opacity = opacity;
        }
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBarFill = document.querySelector('.scroll-progress-bar');
        if (progressBarFill) {
            progressBarFill.style.width = scrolled + '%';
        }
    });
}

// Animated counters for statistics (removed - no stats section)
function initializeCounters() {
    // Counter functionality removed as statistics section was removed
    return;
}

// Counter animation function (removed - no stats section)
function animateCounter(element) {
    // Counter animation removed as statistics section was removed
    return;
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Validate form
            if (!validateForm(this)) {
                showNotification('Mohon lengkapi semua field yang diperlukan', 'error');
                return;
            }
            
            // Simulate form submission
            button.textContent = 'Mengirim...';
            button.disabled = true;
            
            // Add loading animation to button
            button.classList.add('loading');
            
            setTimeout(() => {
                showNotification('Terima kasih! Konsultasi Anda telah diterima. Tim teknis kami akan menghubungi Anda dalam 24 jam.', 'success');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.classList.remove('loading');
                
                // Add success animation
                button.classList.add('success');
                setTimeout(() => button.classList.remove('success'), 2000);
            }, 2000);
        });

        // Real-time form validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                }
            });
        });
    }
}

function validateForm(form) {
    const required = form.querySelectorAll('[required]');
    let valid = true;
    
    required.forEach(field => {
        if (!validateField(field)) {
            valid = false;
        }
    });
    
    return valid;
}

function validateField(field) {
    const value = field.value.trim();
    let valid = true;
    
    // Remove existing error styling
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        valid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            valid = false;
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            valid = false;
        }
    }
    
    if (!valid) {
        field.classList.add('error');
    }
    
    return valid;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 5 seconds
    const autoHide = setTimeout(() => hideNotification(notification), 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Dynamic particle system
function initializeParticleSystem() {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;
    
    let particleCount = 0;
    const maxParticles = 8;
    
    function createParticle() {
        if (particleCount >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        hero.appendChild(particle);
        particleCount++;
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particleCount--;
            }
        }, duration * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 3000);
    
    // Create initial particles
    for (let i = 0; i < 3; i++) {
        setTimeout(createParticle, i * 1000);
    }
}

// Mouse movement parallax effect
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.product-card, .service-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = (rect.left + rect.width / 2) / window.innerWidth;
        const cardY = (rect.top + rect.height / 2) / window.innerHeight;
        
        const deltaX = (mouseX - cardX) * 10;
        const deltaY = (mouseY - cardY) * 10;
        
        card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any heavy scroll calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add CSS for dynamic elements
const dynamicStyles = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 107, 53, 0.2);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(45deg, #ff6b35, #ffa500);
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .dynamic-particle {
        position: absolute;
        background: radial-gradient(circle, rgba(255, 107, 53, 0.8), rgba(255, 165, 0, 0.4));
        border-radius: 50%;
        pointer-events: none;
        animation: dynamicFloat 15s infinite linear;
    }
    
    @keyframes dynamicFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border: 2px solid #e74c3c;
        background: rgba(231, 76, 60, 0.1);
    }
    
    .cta-button.loading {
        position: relative;
        color: transparent;
    }
    
    .cta-button.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .cta-button.success {
        background: linear-gradient(45deg, #27ae60, #2ecc71);
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 5px solid #27ae60;
    }
    
    .notification.error {
        border-left: 5px solid #e74c3c;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        padding: 15px;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 20px;
        font-weight: bold;
    }
    
    .notification.success .notification-icon {
        color: #27ae60;
    }
    
    .notification.error .notification-icon {
        color: #e74c3c;
    }
    
    .notification-message {
        flex: 1;
        color: #333;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        color: #666;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-100px);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
