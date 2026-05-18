// ===================== ENVELOPE INTERACTION =====================
document.addEventListener('DOMContentLoaded', function() {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const envelope = document.querySelector('.envelope');
    
    function openEnvelope() {
        envelopeScreen.classList.add('active');
        setTimeout(() => {
            envelopeScreen.classList.add('opened');
            createFallingPetals();
            playBackgroundMusic();
            startCountdown();
        }, 800);
    }

    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('touchend', function(e) {
        e.preventDefault();
        openEnvelope();
    });

    // Allow also clicking on the envelope-screen
    document.addEventListener('click', function(e) {
        if (e.target.closest('.envelope-wrapper') && !envelopeScreen.classList.contains('opened')) {
            openEnvelope();
        }
    });
});

// ===================== FALLING PETALS =====================
function createFallingPetals() {
    const petalsContainer = document.getElementById('petalsContainer');
    const petalCount = window.innerWidth > 768 ? 20 : 12;

    for (let i = 0; i < petalCount; i++) {
        const petal = createPetalElement();
        petalsContainer.appendChild(petal);
        animatePetal(petal);
    }
}

function createPetalElement() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Rose petal SVG
    const svg = `
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 2C20.5 5 25 8 25 15C25 22 20 28 15 28C10 28 5 22 5 15C5 8 10 5 15 2Z" fill="#d4957c" opacity="0.85"/>
            <path d="M15 8C18 10 20 12 20 15C20 18 18 22 15 24C12 22 10 18 10 15C10 12 12 10 15 8Z" fill="#e8b4a8"/>
            <circle cx="15" cy="15" r="2" fill="#8b5a4c"/>
        </svg>
    `;
    petal.innerHTML = svg;
    return petal;
}

function animatePetal(petal) {
    const startX = Math.random() * window.innerWidth;
    const startY = -50;
    const duration = 3 + Math.random() * 4;
    const drift = (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 360;

    petal.style.left = startX + 'px';
    petal.style.top = startY + 'px';
    petal.style.opacity = Math.random() * 0.5 + 0.3;

    const keyframes = `
        @keyframes fall-${Math.random().toString(36).substr(2, 9)} {
            0% {
                top: -50px;
                left: ${startX}px;
                opacity: ${Math.random() * 0.5 + 0.3};
                transform: rotateZ(0deg);
            }
            100% {
                top: 100vh;
                left: ${startX + drift}px;
                opacity: 0;
                transform: rotateZ(${rotation + 720}deg);
            }
        }
    `;

    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    const animName = `fall-${Math.random().toString(36).substr(2, 9)}`;
    petal.style.animation = `${animName.split('-')[0]}-${animName.split('-')[1]} ${duration}s linear forwards`;
}

// ===================== COUNTDOWN TIMER =====================
function startCountdown() {
    const weddingDate = new Date('2026-10-03T13:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// ===================== MUSIC PLAYER =====================
let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;

function playBackgroundMusic() {
    const musicToggle = document.getElementById('musicToggle');
    
    musicToggle.addEventListener('click', function(e) {
        e.preventDefault();
        if (isPlaying) {
            stopMusic();
            musicToggle.classList.remove('playing');
        } else {
            playEdSheeranPerfect();
            musicToggle.classList.add('playing');
        }
    });
}

function playEdSheeranPerfect() {
    // Create Web Audio API context for playing a simple musical representation
    // This is a simplified version - in production you'd use an actual audio file
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    isPlaying = true;

    // Simple melody based on Ed Sheeran's "Perfect"
    const notes = [
        { freq: 261.63, duration: 0.5 },   // C
        { freq: 293.66, duration: 0.5 },   // D
        { freq: 329.63, duration: 1 },     // E
        { freq: 293.66, duration: 0.5 },   // D
        { freq: 261.63, duration: 0.5 },   // C
        { freq: 329.63, duration: 1 },     // E
    ];

    playMelody(notes);
}

function playMelody(notes) {
    let currentTime = audioContext.currentTime;

    notes.forEach(note => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.value = note.freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.1, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);

        osc.start(currentTime);
        osc.stop(currentTime + note.duration);

        currentTime += note.duration;
    });
}

function stopMusic() {
    isPlaying = false;
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
}

// ===================== LOCATION HANDLER =====================
function openMaps() {
    const mapUrl = 'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=es&sa=X&geocode=Kdv7YXxKNmwNMSlGqaZq8X2T&daddr=Carretera+de+Arjona,+km+1,+23740+Andújar,+Jaén';
    window.open(mapUrl, '_blank');
}

// ===================== SMOOTH SCROLL FOR INTERNAL LINKS =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================== ANIMATIONS ON SCROLL =====================
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideUp 0.6s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.info-block, .rsvp-section').forEach(el => {
        observer.observe(el);
    });
}

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', function() {
    observeElements();

    // Handle touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Prevent zoom on double tap
    document.addEventListener('touchend', function(e) {
        if (e.touches.length === 0) {
            // Reset zoom
        }
    });
});

// ===================== PERFORMANCE OPTIMIZATION =====================
// Debounce function for resize events
function debounce(func, wait) {
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate petals if needed
}, 250));

// ===================== ACCESSIBILITY IMPROVEMENTS =====================
// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('envelope') || focused.closest('.envelope-wrapper')) {
            openEnvelope();
        }
    }
});

// Focus management
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('focus', function() {
        this.style.outline = '2px solid #556B2F';
        this.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ===================== PRINT STYLES =====================
if (window.matchMedia) {
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
        if (mql.matches) {
            document.getElementById('petalsContainer').style.display = 'none';
            document.getElementById('musicToggle').style.display = 'none';
        }
    });
}

console.log('Wedding invitation loaded successfully! 💚✨');
