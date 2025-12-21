// ===== SMOOTH SCROLL TO PRICELIST =====
function scrollToPricelist() {
    const pricelistSection = document.getElementById('pricelist');
    pricelistSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== WHATSAPP BUY FUNCTION =====
function buyPanel(ram, price) {
    // Format pesan WhatsApp
    const message = `Saya mau beli panel RAM ${ram} Harga Rp${price}, Ready?`;
    const whatsappNumber = '6283171889474';
    const encodedMessage = encodeURIComponent(message);
    
    // Buat URL WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Redirect ke WhatsApp
    window.open(whatsappURL, '_blank');
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// ===== ANIMATE ON SCROLL =====
function initScrollAnimations() {
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate price cards
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate footer
    const footer = document.querySelector('.footer');
    footer.classList.add('scroll-animate');
    observer.observe(footer);
}

// ===== PAGE LOAD ANIMATION =====
function initPageLoadAnimation() {
    // Add fade-in class to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }

    // Animate section title
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('scroll-animate');
        observer.observe(title);
    });
}

// ===== BUTTON CLICK ANIMATION =====
function addButtonClickEffect() {
    const buttons = document.querySelectorAll('.buy-button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== ADD RIPPLE STYLE =====
function addRippleStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== PARALLAX EFFECT ON SCROLL =====
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== HIGHLIGHT POPULAR PACKAGE =====
function highlightPopularPackage() {
    const popularCard = document.querySelector('.price-card.popular');
    
    if (popularCard) {
        // Add pulse animation
        setInterval(() => {
            popularCard.style.transform = 'scale(1.02)';
            setTimeout(() => {
                popularCard.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
}

// ===== INITIALIZE ALL FUNCTIONS ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Romadz Store - Website Loaded Successfully!');
    
    // Initialize all animations and effects
    initPageLoadAnimation();
    initScrollAnimations();
    addButtonClickEffect();
    addRippleStyle();
    initParallaxEffect();
    initSmoothScroll();
    highlightPopularPackage();
    
    // Add loaded class to body for additional animations
    document.body.classList.add('loaded');
});

// ===== LOADING STATE =====
window.addEventListener('load', function() {
    console.log('✅ All resources loaded!');
    
    // Remove any loading states if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ===== PREVENT SCROLL DURING ANIMATION =====
let isScrolling = false;

window.addEventListener('scroll', function() {
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            // Update any scroll-based animations here
            isScrolling = false;
        });
        
        isScrolling = true;
    }
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', function(e) {
    // Allow Enter key to trigger button clicks
    if (e.key === 'Enter' && e.target.classList.contains('buy-button')) {
        e.target.click();
    }
});

// ===== LOG FUNCTION FOR DEBUGGING =====
console.log('%c Romadz Store ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Website by Romadz Store - Premium Panel Provider ', 'color: #667eea; font-size: 12px;');
