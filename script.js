// Romadz Store - Interactive Website Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Romadz Store Website Loaded');
    
    // ===== NAVIGATION =====
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== REVEAL ANIMATIONS ON SCROLL =====
    const revealElements = document.querySelectorAll('.keunggulan-card, .pricelist-card');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay * 1000);
            }
        });
    }
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // ===== TESTIMONIAL SLIDER =====
    const testimoniTrack = document.querySelector('.testimoni-track');
    const testimoniCards = document.querySelectorAll('.testimoni-card');
    const testimoniPrev = document.querySelector('.testimoni-prev');
    const testimoniNext = document.querySelector('.testimoni-next');
    
    let currentSlide = 0;
    const cardWidth = testimoniCards[0].offsetWidth + 30; // Width + gap
    
    function updateSlider() {
        testimoniTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
    
    // Auto slide
    let autoSlideInterval = setInterval(() => {
        if (currentSlide < testimoniCards.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }, 5000);
    
    // Manual controls
    testimoniNext.addEventListener('click', function() {
        if (currentSlide < testimoniCards.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
        resetAutoSlide();
    });
    
    testimoniPrev.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = testimoniCards.length - 1;
        }
        updateSlider();
        resetAutoSlide();
    });
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (currentSlide < testimoniCards.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }, 5000);
    }
    
    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                answer.classList.add('active');
                this.classList.add('active');
            }
        });
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ACTIVE NAV LINK FUNCTION =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== CURSOR EFFECT =====
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Create cursor styles dynamically
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(106, 140, 255, 0.3);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background 0.3s;
            mix-blend-mode: difference;
        }
        
        .custom-cursor.hover {
            width: 40px;
            height: 40px;
            background: rgba(106, 140, 255, 0.5);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn-beli, .nav-link, .faq-question');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when not needed
    document.addEventListener('mouseout', function(e) {
        if (!e.relatedTarget) {
            cursor.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '1';
    });
    
    // ===== PRICELIST CARD INTERACTION =====
    const pricelistCards = document.querySelectorAll('.pricelist-card');
    
    pricelistCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.paket-icon i');
            if (icon) {
                icon.style.animation = 'pulse 1s infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.paket-icon i');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // ===== ANIMATED COUNTER FOR STATS (if needed) =====
    // This is a placeholder for future stats section
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // ===== INITIALIZE ON LOAD =====
    updateActiveNavLink();
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial reveal check
        setTimeout(checkReveal, 500);
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Perform heavy operations after scrolling stops
        }, 100);
    });
    
    // ===== ADDITIONAL EFFECTS =====
    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .btn-beli, .btn-cta').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation style
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ===== FLOATING ELEMENTS ANIMATION =====
    // Add random animation to floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(el => {
        // Randomize animation duration
        const duration = 15 + Math.random() * 15;
        el.style.animationDuration = `${duration}s`;
        
        // Randomize initial position
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        
        if (!el.classList.contains('el-1') && !el.classList.contains('el-2') && 
            !el.classList.contains('el-3') && !el.classList.contains('el-4') && 
            !el.classList.contains('el-5')) {
            el.style.left = `${randomX}%`;
            el.style.top = `${randomY}%`;
        }
    });
    
    // ===== CONSOLE GREETING =====
    console.log('%c🚀 Romadz Store - Panel Private Berkualitas', 'font-size: 18px; font-weight: bold; color: #6a8cff;');
    console.log('%cTerima kasih telah mengunjungi website kami!', 'font-size: 14px; color: #9b6dff;');
    console.log('%cHubungi kami di WhatsApp: +62 831-7188-9474', 'font-size: 14px; color: #6ae2ff;');
});
