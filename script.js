// Mobile navigation functionality is now handled by initializeNavbar() function

// Navbar functionality is now handled by initializeNavbar() function

// Active link functionality is now handled by initializeNavbar() function

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields! 💕', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... 💕';
        submitBtn.disabled = true;
        
        // Submit to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Message sent successfully! 💖', 'success');
                this.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Oops! Something went wrong. Please try again! 💕', 'error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
        backdrop-filter: blur(20px);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced floating particles animation
function createFloatingParticle() {
    const particles = ['✨', '💫', '⭐', '🌟', '💖', '🌸', '🎀'];
    const particle = document.createElement('div');
    particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
    particle.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 15}px;
        pointer-events: none;
        z-index: 9999;
        animation: floatParticle ${Math.random() * 3 + 2}s linear forwards;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;
    
    // Random position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => particle.remove(), 5000);
}

// Add floating particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create floating particles periodically
setInterval(createFloatingParticle, 2000);

// Enhanced scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.project-card, .about-content, .contact-content, .education-item, .skill-tag');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('visible');
        }
    });
}

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for scroll reveal
    const elements = document.querySelectorAll('.project-card, .about-content, .contact-content, .education-item, .skill-tag');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial check
    revealOnScroll();
});

// Add scroll event listener for reveal
window.addEventListener('scroll', revealOnScroll);

// Enhanced typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize title animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Let CSS animation handle the title appearance
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
    }

    // Initialize new features
    initScrollProgress();
    initFloatingActionButton();
    initBackToTop();
    initStarryBackground();
    initializeNavbar();
});

// Enhanced parallax effect to floating elements
window.addEventListener('scroll', () => {
    const floatingElements = document.querySelectorAll('.floating-emoji');
    const scrolled = window.pageYOffset;
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Enhanced hover effect to project cards with performance optimization
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!isMobile) {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.3)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!isMobile) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 25px rgba(236, 72, 153, 0.12)';
        }
    });
});

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced confetti effect on button clicks
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * window.innerWidth}px;
            animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Add confetti to primary buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', createConfetti);
});

// Mouse cursor trail effect
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }
    
    // Create trail particles
    if (Math.random() < 0.3) {
        const trailParticle = document.createElement('div');
        trailParticle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trailParticle);
        
        setTimeout(() => trailParticle.remove(), 1000);
    }
});

// Add trail animation CSS
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Smooth scroll behavior for all browsers
document.documentElement.style.scrollBehavior = 'smooth';

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content, .education-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Performance optimization: throttle scroll events
let ticking = false;
let lastScrollTop = 0;
const scrollThreshold = 5;

function updateOnScroll() {
    updateActiveNav();
    revealOnScroll();
    ticking = false;
}

// Optimized scroll handler with throttling
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (!ticking && Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
        lastScrollTop = scrollTop;
    }
}, { passive: true });

// Mobile-specific optimizations
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Reduce animation intensity on mobile
    document.documentElement.style.setProperty('--transition-smooth', '0.2s cubic-bezier(0.4, 0, 0.2, 1)');
    
    // Disable hover effects on touch devices
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Optimize touch interactions
    document.querySelectorAll('.btn, .nav-link, .contact-link, .skill-tag').forEach(element => {
        element.style.touchAction = 'manipulation';
        element.style.webkitTapHighlightColor = 'rgba(236, 72, 153, 0.2)';
    });
    
    // Reduce particle effects on mobile for better performance
    const particleInterval = setInterval(createFloatingParticle, 5000);
    
    // Add mobile-specific viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('.btn, .nav-link, .contact-link').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadResources);

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', throttle(updateProgress, 10));
}

// Floating Action Button
function initFloatingActionButton() {
    const fab = document.querySelector('.floating-action-btn');
    const fabMain = document.querySelector('.fab-main');
    if (!fab || !fabMain) return;

    fabMain.addEventListener('click', (e) => {
        e.preventDefault();
        fab.classList.toggle('active');
    });

    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!fab.contains(e.target)) {
            fab.classList.remove('active');
        }
    });

    // Smooth scroll for FAB links
    const fabItems = document.querySelectorAll('.fab-item');
    fabItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                fab.classList.remove('active');
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', throttle(toggleBackToTop, 100));

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Starry Background
function initStarryBackground() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;

    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starsContainer.appendChild(star);
    }
}

// Enhanced navbar functionality - stays visible throughout page
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;

    // Force navbar to stay visible with maximum priority
    function keepNavbarVisible() {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.zIndex = '99999';
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
        navbar.style.width = '100%';
    }

    // Keep navbar visible immediately
    keepNavbarVisible();

    // Enhanced scroll effect with performance optimization
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrolled = window.scrollY;
                
                if (scrolled > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Update active navigation link
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Mobile menu toggle
    if (navbarToggle && navMenu) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu
                    if (navbarToggle && navMenu) {
                        navbarToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll to target
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbarToggle && navMenu && 
            !navbarToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navbarToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Monitor navbar visibility continuously
    const observer = new MutationObserver(function() {
        keepNavbarVisible();
    });

    observer.observe(navbar, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Also check periodically to ensure navbar stays visible
    setInterval(keepNavbarVisible, 2000);
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}