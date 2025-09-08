// Immediate navbar fix - runs as soon as script loads
fixNavbar();

// Also run when DOM is ready
document.addEventListener('DOMContentLoaded', fixNavbar);

// Run again after a short delay to ensure it's working
setTimeout(fixNavbar, 500);

// Detect low-end devices and enable reduced-motion mode
(function enableReducedMotionIfNeeded() {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
        document.body.classList.add('reduced-motion');
        // Thin out stars a bit to save perf, but keep motion
        const stars = document.querySelectorAll('.star');
        if (stars.length > 150) {
            stars.forEach((s, i) => { if (i % 3 === 0) s.remove(); });
        }
    }
})();

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
    initStarryBackground();
    fixNavbar();
    // Project image lightbox
    const imageModal = document.getElementById('image-modal');
    const imageModalClose = document.getElementById('image-modal-close');
    const imageModalContent = document.getElementById('image-modal-content');
    const projectImgs = document.querySelectorAll('.project-card .project-image img');
    if (projectImgs.length && imageModal && imageModalClose && imageModalContent) {
        projectImgs.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                imageModalContent.src = img.src;
                imageModal.classList.add('show');
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            });
        });
        const closeModal = () => {
            imageModal.classList.remove('show');
            imageModalContent.src = '';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
        imageModalClose.addEventListener('click', closeModal);
        imageModal.addEventListener('click', (e) => { if (e.target === imageModal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && imageModal.classList.contains('show')) closeModal(); });
    }

    // Interactive tilt + heart burst for lottie frame
    const lottieFrame = document.querySelector('.lottie-frame');
    if (lottieFrame) {
        let rect = null;
        const maxTilt = 8;
        lottieFrame.addEventListener('mouseenter', () => { rect = lottieFrame.getBoundingClientRect(); });
        lottieFrame.addEventListener('mousemove', (e) => {
            if (!rect) rect = lottieFrame.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            lottieFrame.style.transform = `rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`;
        });
        lottieFrame.addEventListener('mouseleave', () => {
            lottieFrame.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });

        // Click to burst hearts
        lottieFrame.addEventListener('click', (e) => {
            const burstCount = 6;
            const bounds = lottieFrame.getBoundingClientRect();
            for (let i = 0; i < burstCount; i++) {
                const d = document.createElement('span');
                d.className = 'heart-burst';
                const angle = (Math.PI * 2 * i) / burstCount;
                const dist = 60 + Math.random() * 30;
                d.style.left = `${e.clientX - bounds.left}px`;
                d.style.top = `${e.clientY - bounds.top}px`;
                d.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
                d.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
                lottieFrame.appendChild(d);
                setTimeout(() => d.remove(), 900);
            }
        });
    }

    // Recolor Lottie to match theme (convert greenish hues toward pink)
    const lottiePlayer = document.querySelector('.lottie-frame lottie-player');
    if (lottiePlayer) {
        const src = lottiePlayer.getAttribute('src');
        if (src && !src.startsWith('http')) {
            fetch(src)
                .then(r => r.json())
                .then(json => {
                    const clamp01 = (v) => Math.max(0, Math.min(1, v));
                    const toPink = (arr) => {
                        // arr like [r,g,b,a] in 0..1
                        if (!Array.isArray(arr) || arr.length < 3) return arr;
                        let [r, g, b, a = 1] = arr;
                        // Detect greenish (g dominant, low red/blue)
                        const isGreenish = (g > 0.35) && (g > r + 0.08) && (g > b + 0.08);
                        if (!isGreenish) return arr;
                        // Choose a pink based on luminance (darker -> deeper pink, lighter -> soft pink)
                        const lum = 0.2126*r + 0.7152*g + 0.0722*b;
                        const palette = [
                            [236/255, 72/255, 153/255],   // bright pink
                            [244/255, 114/255, 182/255],  // rose pink
                            [251/255, 207/255, 232/255]   // soft pink
                        ];
                        const [pr, pg, pb] = lum < 0.45 ? palette[0] : (lum < 0.75 ? palette[1] : palette[2]);
                        // Blend strongly toward chosen pink
                        const mix = 0.85;
                        r = clamp01(pr*mix + r*(1-mix));
                        g = clamp01(pg*mix + g*(1-mix));
                        b = clamp01(pb*mix + b*(1-mix));
                        return [r, g, b, a];
                    };
                    const recolor = (obj) => {
                        if (!obj || typeof obj !== 'object') return;
                        // fills/strokes typically under it[].ty === 'fl'|'st' with c.k
                        if (obj.c && obj.c.k) {
                            if (Array.isArray(obj.c.k)) {
                                obj.c.k = toPink(obj.c.k);
                            } else if (obj.c.k.x !== undefined && obj.c.k.k) {
                                // animated color: k is array of keyframes
                                obj.c.k.k.forEach(kf => {
                                    if (kf && kf.s) kf.s = toPink(kf.s);
                                });
                            }
                        }
                        // gradients: g.k.k has color stops in pairs [pos,r,g,b,pos,r,g,b,...]
                        if (obj.g && obj.g.k && Array.isArray(obj.g.k.k)) {
                            for (let i = 0; i < obj.g.k.k.length; i += 4) {
                                const r = obj.g.k.k[i+1], g = obj.g.k.k[i+2], b = obj.g.k.k[i+3];
                                const mapped = toPink([r, g, b, 1]);
                                obj.g.k.k[i+1] = mapped[0];
                                obj.g.k.k[i+2] = mapped[1];
                                obj.g.k.k[i+3] = mapped[2];
                            }
                        }
                        // recurse
                        Object.keys(obj).forEach(k => recolor(obj[k]));
                    };
                    recolor(json);
                    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    lottiePlayer.setAttribute('src', url);
                })
                .catch(() => {/* ignore on failure */});
        }
    }
    // Global tap bubble across the page (mouse and touch)
    const spawnBubble = (x, y) => {
        const b = document.createElement('span');
        b.className = 'tap-bubble';
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
        // small random drift
        const driftX = (Math.random() * 20 - 10).toFixed(0) + 'px';
        const driftY = (Math.random() * 20 - 10).toFixed(0) + 'px';
        b.style.setProperty('--tx', `calc(-50% + ${driftX})`);
        b.style.setProperty('--ty', `calc(-50% + ${driftY})`);
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 700);
    };

    window.addEventListener('click', (e) => {
        spawnBubble(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        if (t) spawnBubble(t.clientX, t.clientY);
    }, { passive: true });
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

// First-visit loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('first-visit-loader');
    if (!loader) return;

    // Always show loader on each page load
    loader.style.display = 'flex';
    // Prevent scroll behind
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // After ~2s show a full-page petal explosion, then fade out
    const runOutro = () => {
        createFullPagePetalExplosion();
        setTimeout(hide, 550);
    };

    const hide = () => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }, 500);
    };

    // Ensure flowers swirl for ~2s, then explode petals
    setTimeout(runOutro, 2000);
});

// Sparkly particle burst matching theme
function createSparkleExplosion(anchor) {
    try {
        const bounds = anchor.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const particles = ['✨', '🌸', '💖', '⭐', '🎀'];
        const count = 24;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.textContent = particles[i % particles.length];
            p.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                transform: translate(-50%, -50%);
                font-size: ${Math.random() * 16 + 14}px;
                pointer-events: none;
                z-index: 10001;
                opacity: 0.95;
                will-change: transform, opacity;
            `;
            document.body.appendChild(p);
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
            const dist = 80 + Math.random() * 60;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            p.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.2)`, opacity: 0 }
            ], { duration: 800, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
            setTimeout(() => p.remove(), 850);
        }
    } catch (_) { /* noop */ }
}

// Full-page petal explosion using emoji particles
function createFullPagePetalExplosion() {
    const particles = ['🌸','💮','🌺','💖','✨'];
    const count = 60;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.textContent = particles[i % particles.length];
        p.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            transform: translate(-50%, -50%);
            font-size: ${Math.random() * 18 + 16}px;
            pointer-events: none;
            z-index: 10001;
            opacity: 0.95;
            will-change: transform, opacity;
        `;
        document.body.appendChild(p);
        const angle = Math.random() * Math.PI * 2;
        const dist = 120 + Math.random() * 180;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const duration = 900 + Math.random() * 500;
        p.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${(Math.random()*360)|0}deg) scale(0.3)`, opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
        setTimeout(() => p.remove(), duration + 50);
    }
}

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

// Simple and robust navbar fix
function fixNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
        console.log('Navbar not found, retrying...');
        setTimeout(fixNavbar, 100);
        return;
    }

    // Force navbar to be visible and fixed
    navbar.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        background: rgba(255, 255, 255, 0.9) !important;
        border-bottom: 1px solid rgba(236, 72, 153, 0.2) !important;
        z-index: 99999 !important;
        padding: 0.8rem 0 !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        margin: 0 !important;
    `;

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu
                    if (hamburger && navMenu) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll
                    const offsetTop = targetElement.offsetTop - 80;
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

    // Enhanced scroll effect with real-time active link detection
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Navbar scroll effect
                if (window.scrollY > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Real-time active link detection
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Real-time active link detection function
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100; // Offset for navbar height
        
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update active states
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
        
        // If no section is active, default to home
        if (!currentSection && window.scrollY < 200) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }

    // Keep navbar visible every 2 seconds
    setInterval(() => {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.zIndex = '99999';
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
    }, 2000);

    console.log('Navbar fixed successfully!');
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