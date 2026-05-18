// ===================== DOM ELEMENTS =====================
const envelopeSection = document.getElementById('envelopeSection');
const contentSection = document.getElementById('contentSection');
const envelope = document.getElementById('envelope');
const envelopeContainer = document.getElementById('envelopeContainer');
const letter = document.getElementById('letter');
const musicBtn = document.getElementById('musicBtn');
const petalsContainer = document.getElementById('petalsContainer');

// ===================== STATE =====================
let isOpening = false;
let isOpened = false;
let musicPlaying = false;
let audioContext;

// ===================== ENVELOPE OPENING =====================
function openEnvelope() {
    if (isOpening || isOpened) return;

    isOpening = true;

    // Add opening animation
    envelope.classList.add('opening');

    // Play music
    playBackgroundMusic();

    // Start falling petals
    createFallingPetals();

    // After envelope animation completes
    setTimeout(() => {
        // Hide envelope section
        envelopeSection.classList.add('hidden');

        // Show content section
        setTimeout(() => {
            contentSection.classList.add('visible');
            startCountdown();
        }, 100);

        isOpened = true;
        isOpening = false;
    }, 1000);
}

// ===================== FALLING PETALS =====================
function createFallingPetals() {
    const petalCount = window.innerWidth > 768 ? 25 : 15;

    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            createPetal();
        }, i * 150);
    }
}

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';

    // Rose petal SVG
    const petalSvg = `
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 2C20.5 5 25 8 25 15C25 22 20 28 15 28C10 28 5 22 5 15C5 8 10 5 15 2Z" fill="#d4957c" opacity="0.85"/>
            <path d="M15 8C18 10 20 12 20 15C20 18 18 22 15 24C12 22 10 18 10 15C10 12 12 10 15 8Z" fill="#e8b4a8"/>
            <circle cx="15" cy="15" r="2" fill="#8b5a4c"/>
        </svg>
    `;

    petal.innerHTML = petalSvg;
    petalsContainer.appendChild(petal);

    // Randomize animation
    const startX = Math.random() * window.innerWidth;
    const duration = 4 + Math.random() * 3;
    const drift = (Math.random() - 0.5) * 300;
    const rotation = Math.random() * 720;
    const delay = Math.random() * 0.5;

    petal.style.left = startX + 'px';
    petal.style.top = '-30px';
    petal.style.animation = `fall ${duration}s linear ${delay}s forwards`;

    // Create keyframes dynamically
    const keyframes = `
        @keyframes fall {
            to {
                transform: translateY(${window.innerHeight + 100}px) translateX(${drift}px) rotateZ(${rotation}deg);
                opacity: 0;
            }
        }
    `;

    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    // Remove after animation
    setTimeout(() => {
        petal.remove();
    }, (duration + delay) * 1000);
}

// ===================== MUSIC PLAYER =====================
function playBackgroundMusic() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    musicPlaying = true;
    musicBtn.classList.add('playing');

    // Simple melody from Ed Sheeran's "Perfect"
    const notes = [
        { freq: 261.63, duration: 0.4 },   // C
        { freq: 293.66, duration: 0.4 },   // D
        { freq: 329.63, duration: 0.8 },   // E
        { freq: 293.66, duration: 0.4 },   // D
        { freq: 261.63, duration: 0.4 },   // C
        { freq: 329.63, duration: 0.8 },   // E
        { freq: 392.00, duration: 0.4 },   // G
        { freq: 329.63, duration: 0.4 },   // E
        { freq: 293.66, duration: 0.8 },   // D
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

function toggleMusic() {
    if (musicPlaying) {
        musicPlaying = false;
        musicBtn.classList.remove('playing');
    } else {
        playBackgroundMusic();
    }
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
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// ===================== MAP NAVIGATION =====================
function openMaps() {
    const mapUrl =
        'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=es&sa=X&geocode=Kdv7YXxKNmwNMSlGqaZq8X2T&daddr=Carretera+de+Arjona,+km+1,+23740+Andújar,+Jaén';
    window.open(mapUrl, '_blank');
}

// ===================== EVENT LISTENERS =====================
document.addEventListener('DOMContentLoaded', function() {
    // Envelope click to open
    envelopeContainer.addEventListener('click', openEnvelope);
    envelopeContainer.addEventListener('touchend', function(e) {
        e.preventDefault();
        openEnvelope();
    });

    // Music button
    musicBtn.addEventListener('click', toggleMusic);

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && !isOpened) {
            openEnvelope();
        }
    });
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    });
});

// ===================== RESPONSIVE ADJUSTMENTS =====================
window.addEventListener('resize', debounce(function() {
    // Recalculate responsive values if needed
}, 250));

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

// ===================== ACCESSIBILITY =====================
// Add focus styles for keyboard navigation
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('focus', function() {
        this.style.outline = '2px solid #556B2F';
        this.style.outlineOffset = '2px';
    });

    el.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Prevent zoom on double tap (mobile)
document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// ===================== INITIALIZATION =====================
console.log('💚 Wedding invitation loaded successfully! ✨');
