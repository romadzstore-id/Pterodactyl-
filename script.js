document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's an icon box inside the revealed section, add extra animation
                const icon = entry.target.querySelector('.icon-box svg');
                if(icon) {
                    icon.style.transform = 'scale(1.1)';
                    setTimeout(() => icon.style.transform = 'scale(1)', 500);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button Click Interaction (Press Effect is handled via CSS :active)
    // Adding extra ripple logic or micro-interactions
    const buttons = document.querySelectorAll('.btn, .btn-buy, .btn-contact');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.96)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Subtle parallax effect for background blurs
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const blur1 = document.querySelector('.blur-1');
        const blur2 = document.querySelector('.blur-2');
        
        blur1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        blur2.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
    });

});
