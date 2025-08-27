// Modern TABA Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeTechCharts();
    initializeParallaxEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Animation system
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for staggered card animations
                if (entry.target.classList.contains('solution-card')) {
                    const cards = document.querySelectorAll('.solution-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Initialize solution cards with staggered animation
    document.querySelectorAll('.solution-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Hero title animation
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroBadge = document.querySelector('.hero-badge');
        
        if (heroBadge) {
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }
        
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 200);
        
        setTimeout(() => {
            if (heroDescription) {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }
        }, 400);
        
        setTimeout(() => {
            if (heroButtons) {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }
        }, 600);
    }, 500);

    // Set initial states for hero elements
    const heroElements = ['.hero-badge', '.hero-title', '.hero-description', '.hero-buttons'];
    heroElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease';
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            
            // Validate form
            if (!validateContactForm(this)) {
                showNotification('Please fill in all required fields correctly', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<span>Processing...</span><div class="submit-arrow">⟳</div>';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you! Our technical team will contact you within 24 hours for detailed consultation.', 'success');
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                // Success animation
                submitBtn.classList.add('success');
                setTimeout(() => submitBtn.classList.remove('success'), 2000);
            }, 2500);
        });

        // Real-time validation
        const formFields = form.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                }
            });
        });
    }
}

// Form validation functions
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error styling
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
    
    return isValid;
}

// Technology charts animation
function initializeTechCharts() {
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.getPropertyValue('--percentage') || '0%';
                    }, index * 200);
                });
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const techChart = document.querySelector('.tech-chart');
    if (techChart) {
        // Reset bar widths
        const bars = techChart.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const percentage = bar.style.getPropertyValue('--percentage');
            bar.style.setProperty('--percentage', '0%');
            bar.dataset.targetPercentage = percentage;
        });
        
        chartObserver.observe(techChart);
    }
}

// Parallax effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate * 0.3}px)`;
        }

        // Floating specs animation
        const floatingSpecs = document.querySelectorAll('.spec-card');
        floatingSpecs.forEach((spec, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            spec.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Mouse parallax for cards
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.solution-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = (rect.left + rect.width / 2) / window.innerWidth;
            const cardY = (rect.top + rect.height / 2) / window.innerHeight;
            
            const deltaX = (mouseX - cardX) * 15;
            const deltaY = (mouseY - cardY) * 15;
            
            card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    });
}

// Notification system
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
            <div class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 6 seconds
    const autoHide = setTimeout(() => hideNotification(notification), 6000);
    
    // Close button
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

// Performance optimizations
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
    // Heavy scroll calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Dynamic CSS for notifications and loading states
const dynamicStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: var(--light-bg);
        border-radius: 12px;
        box-shadow: var(--shadow-heavy);
        transform: translateX(450px);
        transition: transform 0.3s ease;
        z-index: 10000;
        border-left: 4px solid var(--primary-red);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left-color: #4caf50;
    }
    
    .notification.error {
        border-left-color: #f44336;
    }
    
    .notification-content {
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        gap: 1rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 0.2rem;
    }
    
    .notification.success .notification-icon {
        color: #4caf50;
    }
    
    .notification.error .notification-icon {
        color: #f44336;
    }
    
    .notification-message {
        flex: 1;
        color: var(--text-dark);
        line-height: 1.4;
        font-size: 0.95rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        color: #666;
        background: #f0f0f0;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #f44336;
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }
    
    .form-submit.loading {
        cursor: not-allowed;
        opacity: 0.8;
    }
    
    .form-submit.success {
        background: linear-gradient(135deg, #4caf50, #66bb6a);
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-150px);
            top: 20px;
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

// Initialize loading animations for hero elements
function initializeHeroAnimations() {
    const heroElements = [
        { selector: '.hero-badge', delay: 0 },
        { selector: '.hero-title .title-line:nth-child(1)', delay: 200 },
        { selector: '.hero-title .title-line:nth-child(2)', delay: 400 },
        { selector: '.hero-title .title-line:nth-child(3)', delay: 600 },
        { selector: '.hero-description', delay: 800 },
        { selector: '.hero-buttons', delay: 1000 }
    ];

    heroElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay + 500);
        }
    });
}

// Call hero animations after DOM load
setTimeout(initializeHeroAnimations, 100);

// Enhanced scroll-based animations
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.solution-card, .tech-feature, .contact-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'all 0.7s ease';
        scrollObserver.observe(element);
    });
}

// Initialize enhanced scroll animations
initializeScrollAnimations();

// Smooth page transitions and loading states
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Enhanced tire rotation animation
function enhanceTireAnimation() {
    const tireCircle = document.querySelector('.tire-circle');
    let rotationSpeed = 0;
    let targetSpeed = 0;

    window.addEventListener('scroll', () => {
        const scrollSpeed = Math.abs(window.scrollY - (window.lastScrollY || 0));
        window.lastScrollY = window.scrollY;
        
        targetSpeed = Math.min(scrollSpeed * 0.1, 5);
    });

    function animateTire() {
        rotationSpeed += (targetSpeed - rotationSpeed) * 0.1;
        
        if (tireCircle) {
            const currentRotation = parseFloat(tireCircle.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            tireCircle.style.transform = `rotate(${currentRotation + rotationSpeed}deg)`;
        }
        
        targetSpeed *= 0.95; // Decay
        requestAnimationFrame(animateTire);
    }
    
    animateTire();
}

// Initialize enhanced tire animation
enhanceTireAnimation();

// Add loading state for page
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance monitoring and optimization
const performanceOptimizer = {
    init() {
        this.optimizeImages();
        this.lazyLoadElements();
        this.prefetchCriticalResources();
    },

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.loading !== 'lazy') {
                img.loading = 'lazy';
            }
        });
    },

    lazyLoadElements() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.dataset.lazy;
                    if (src) {
                        element.src = src;
                        element.removeAttribute('data-lazy');
                    }
                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    },

    prefetchCriticalResources() {
        const criticalResources = [
            '/fonts/orbitron-v31-latin-regular.woff2',
            '/fonts/inter-v13-latin-regular.woff2'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
};

// Initialize performance optimizations
performanceOptimizer.init();
