/*
  script.js
  - Animasi typewriter, partikel hati, musik otomatis, buka kejutan.
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== ELEMEN =====
    const openingScreen = document.getElementById('openingScreen');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openSurpriseBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');

    // ===== 🎵 MUSIK OTOMATIS (play setelah interaksi) =====
    // Autoplay mungkin diblokir browser, maka kita coba play saat buka halaman
    let musicPlaying = true;
    
    function initMusic() {
        bgMusic.volume = 0.35;
        bgMusic.play().catch(e => {
            console.log('Autoplay diblokir, menunggu interaksi user');
            musicPlaying = false;
            musicIcon.className = 'fas fa-play-circle'; // pause -> play
        });
    }
    initMusic();

    // Tombol Play / Pause
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.className = 'fas fa-pause-circle';
            musicPlaying = true;
        } else {
            bgMusic.pause();
            musicIcon.className = 'fas fa-play-circle';
            musicPlaying = false;
        }
    });

    // ===== ✨ BUKA KEJUTAN =====
    openBtn.addEventListener('click', function() {
        // Fade out opening screen
        openingScreen.style.opacity = '0';
        setTimeout(() => {
            openingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            // Pastikan musik berjalan setelah interaksi
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {});
                musicIcon.className = 'fas fa-pause-circle';
                musicPlaying = true;
            }
        }, 700);
    });

    // ===== 💌 TYPEWRITER EFFECT =====
    const messageEl = document.getElementById('typewriterText');
    const fullText = "Selamat ulang tahun, cintaku. Hari ini dan setiap hari, aku bersyukur memilikimu. Kamu adalah pelangi setelah hujan, ketenangan di setiap gelisah, dan rumah yang selalu kurindukan. Semoga tahun ini membawa ribuan kebahagiaan untukmu. Aku mencintaimu, sekarang, nanti, dan selamanya. 💕";
    
    let i = 0;
    function typeWriter() {
        if (i < fullText.length) {
            messageEl.innerHTML += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 55); // kecepatan mengetik
        } else {
            // Hapus cursor setelah selesai
            messageEl.style.borderRight = 'none';
        }
    }
    
    // Mulai typewriter ketika main content muncul (observer)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (!mainContent.classList.contains('hidden')) {
                    setTimeout(typeWriter, 500);
                    observer.disconnect();
                }
            }
        });
    });
    observer.observe(mainContent, { attributes: true });

    // ===== 💖 PARTIKEL HATI CANVAS =====
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let hearts = [];

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    initCanvas();

    function createHeart() {
        return {
            x: Math.random() * width,
            y: Math.random() * height * 0.2 + height * 0.1, // mulai di atas
            size: Math.random() * 16 + 12,
            speedY: Math.random() * 1.2 + 0.6,
            opacity: Math.random() * 0.5 + 0.3,
            heartChar: ['❤️', '💖', '💗', '💓', '💕', '🌸', '🌷'][Math.floor(Math.random() * 7)]
        };
    }

    function initHearts(count = 18) {
        for (let i = 0; i < count; i++) {
            hearts.push(createHeart());
        }
    }
    initHearts();

    function drawHearts() {
        ctx.clearRect(0, 0, width, height);
        ctx.font = '28px Arial, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        
        for (let i = 0; i < hearts.length; i++) {
            const h = hearts[i];
            ctx.globalAlpha = h.opacity;
            ctx.fillStyle = '#ff9eb5';
            ctx.shadowColor = '#ffb6c1';
            ctx.shadowBlur = 15;
            ctx.fillText(h.heartChar, h.x, h.y);
            
            // jatuh ke bawah
            h.y += h.speedY * 0.6;
            
            // reset jika keluar layar
            if (h.y > height + 30) {
                hearts[i] = createHeart();
                hearts[i].y = -20;
            }
        }
        ctx.shadowBlur = 0;
        requestAnimationFrame(drawHearts);
    }
    drawHearts();

    // resize handler
    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        hearts = [];
        initHearts(22);
    });

    // ===== SMOOTH HOVER & GLOW =====
    // Sudah di CSS, tambahan interaksi dikit
    console.log('Romantic Birthday Site Siap 💞');

    // Cegah scroll saat opening
    document.body.style.overflow = 'hidden';
    openBtn.addEventListener('click', function() {
        document.body.style.overflow = 'auto';
    });
});