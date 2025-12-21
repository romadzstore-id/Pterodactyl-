// Page Loader
window.addEventListener('load', function() {
    const pageLoader = document.getElementById('pageLoader');
    
    // Add loaded class to trigger fade out
    setTimeout(() => {
        pageLoader.classList.add('loaded');
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation
function checkScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', checkScroll);

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Neon Button Hover Effect Enhancement
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const glow = this.querySelector('.btn-glow');
        if (glow) {
            glow.style.transition = 'left 0.7s ease';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        const glow = this.querySelector('.btn-glow');
        if (glow) {
            glow.style.transition = 'left 0.3s ease';
        }
    });
});

// Contact Button Hover Effect Enhancement
document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const glow = this.querySelector('.contact-glow');
        if (glow) {
            glow.style.transition = 'left 0.7s ease';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        const glow = this.querySelector('.contact-glow');
        if (glow) {
            glow.style.transition = 'left 0.3s ease';
        }
    });
});

// Card Hover Effect with Delay for Glow
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const glow = this.querySelector('.card-glow');
        if (glow) {
            glow.style.transition = 'opacity 0.4s ease 0.1s';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const glow = this.querySelector('.card-glow');
        if (glow) {
            glow.style.transition = 'opacity 0.4s ease';
        }
    });
});

// Dynamic Text Effect for Hero Title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titleText = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    // Split text into characters and wrap each in span for potential animation
    const chars = titleText.split('');
    chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        heroTitle.appendChild(span);
    });
}

// RGB Background Animation
function createFloatingRGBElements() {
    const section = document.querySelector('.hero-section');
    if (!section) return;
    
    // Create floating RGB elements
    for (let i = 0; i < 8; i++) {
        const rgbElement = document.createElement('div');
        rgbElement.className = 'floating-rgb';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 40 + 10;
        const colorIndex = Math.floor(Math.random() * 3);
        const colors = ['var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-pink)'];
        const color = colors[colorIndex];
        
        // Set styles
        rgbElement.style.position = 'absolute';
        rgbElement.style.left = `${left}%`;
        rgbElement.style.top = `${top}%`;
        rgbElement.style.width = `${size}px`;
        rgbElement.style.height = `${size}px`;
        rgbElement.style.borderRadius = '50%';
        rgbElement.style.background = color;
        rgbElement.style.opacity = '0.05';
        rgbElement.style.filter = 'blur(10px)';
        rgbElement.style.zIndex = '0';
        rgbElement.style.animation = `floatRGB ${Math.random() * 20 + 10}s infinite ease-in-out`;
        rgbElement.style.animationDelay = `${Math.random() * 5}s`;
        
        section.appendChild(rgbElement);
    }
}

// Add CSS for floating RGB animation
const style = document.createElement('style');
style.textContent = `
@keyframes floatRGB {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(20px, -20px) rotate(90deg); }
    50% { transform: translate(0, -40px) rotate(180deg); }
    75% { transform: translate(-20px, -20px) rotate(270deg); }
}
`;
document.head.appendChild(style);

// Initialize floating RGB elements after page load
window.addEventListener('load', createFloatingRGBElements);

// Update WhatsApp links with correct phone number
// Replace 628XXXXXXXXXX with actual phone number
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    // You can replace this with your actual WhatsApp number
    // For now, it keeps the placeholder
    console.log('Update WhatsApp links with actual phone number in the HTML');
});

// Performance optimization: Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            checkScroll();
            scrollTimeout = null;
        }, 100);
    }
});

// Initialize all animations when page is ready
document.addEventListener('DOMContentLoaded', function() {
    // Trigger initial scroll check after a small delay
    setTimeout(checkScroll, 300);
    
    // Add loaded class to body for potential additional styling
    document.body.classList.add('page-loaded');
});
