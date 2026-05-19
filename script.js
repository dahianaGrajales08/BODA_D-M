// ===================== DOM ELEMENTS =====================
const wrapper = document.getElementById("envelope-wrapper");
const envelope = document.getElementById("envelope");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.getElementById("letter");
const btnVolver = document.getElementById("btnVolver");

// ===================== MUSIC CONFIG =====================
const tiempoInicio = 90;
const tiempoFin = 130;

// ===================== ENVELOPE OPENING =====================
wrapper.addEventListener("click", function() {
    if (envelope.classList.contains("open")) return;

    // Add opening class to envelope
    envelope.classList.add("open");

    // Start music
    try {
        music.currentTime = tiempoInicio;
        music.play().catch(function(err) {
            console.log("Autoplay bloqueado:", err);
        });

        // Loop music between tiempoInicio and tiempoFin
        music.addEventListener("timeupdate", function() {
            if (music.currentTime >= tiempoFin) {
                music.currentTime = tiempoInicio;
            }
        });
    } catch (err) {
        console.log("Error al reproducir música:", err);
    }

    // Start falling petals
    iniciarLluviaFlores();

    // Hide envelope and show content after animation
    setTimeout(function() {
        wrapper.classList.add("hidden");
        content.classList.add("content-visible");
        content.classList.remove("content-hidden");
    }, 1500);

    // Update countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// ===================== BACK BUTTON =====================
btnVolver.addEventListener("click", function() {
    content.classList.remove("content-visible");
    content.classList.add("content-hidden");
    wrapper.classList.remove("hidden");
    envelope.classList.remove("open");

    // Reset music
    try {
        music.pause();
        music.currentTime = tiempoInicio;
    } catch (err) {
        console.log("Error reseteando música:", err);
    }
});

// ===================== MUSIC PLAYER =====================
function toggleMusic() {
    const icon = document.getElementById("musicIcon");
    
    if (music.paused) {
        music.play().catch(function() {
            console.log("No se pudo reproducir música");
        });
        icon.innerText = "||";
    } else {
        music.pause();
        icon.innerText = "▶";
    }
}

// ===================== COUNTDOWN TIMER =====================
function updateCountdown() {
    const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = `
            <div class="timer-text">
                <div class="timer-group"><span class="timer-val">¡YA!</span><span class="timer-lab">Es Hoy</span></div>
            </div>`;
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `
        <div class="timer-text">
            <div class="timer-group">
                <span class="timer-val">${days}</span>
                <span class="timer-lab">Días 💍</span>
            </div>
            <span class="timer-sep">:</span>
            <div class="timer-group">
                <span class="timer-val">${hours < 10 ? '0' + hours : hours}</span>
                <span class="timer-lab">Horas</span>
            </div>
            <span class="timer-sep">:</span>
            <div class="timer-group">
                <span class="timer-val">${minutes < 10 ? '0' + minutes : minutes}</span>
                <span class="timer-lab">Mins</span>
            </div>
        </div>`;
}

// ===================== FALLING PETALS =====================
function iniciarLluviaFlores() {
    const petalsContainer = document.getElementById("falling-flowers");
    const petalCount = 20;
    let petalIndex = 0;

    const petalInterval = setInterval(function() {
        if (petalIndex >= petalCount) {
            clearInterval(petalInterval);
            return;
        }

        const element = document.createElement("div");
        element.classList.add("falling-element");

        // SVG rose petal
        element.innerHTML = `
            <svg width="20" height="24" viewBox="0 0 24 30" fill="none">
                <path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z" fill="#d4a574" opacity="0.8"/>
                <path d="M12 8C16 10 18 14 18 18C18 22 16 26 12 28C8 26 6 22 6 18C6 14 8 10 12 8Z" fill="#e8c4a0"/>
            </svg>`;

        element.style.left = Math.random() * 100 + "vw";
        element.style.animationDuration = (Math.random() * 3 + 4) + "s";

        petalsContainer.appendChild(element);

        // Remove after animation
        setTimeout(function() {
            element.remove();
        }, 7000);

        petalIndex++;
    }, 200);
}

// ===================== WHATSAPP HANDLER =====================
function abrirWhatsApp(telefono, mensaje) {
    const textoCodificado = encodeURIComponent(mensaje);
    const url = "https://wa.me/" + telefono + "?text=" + textoCodificado;
    window.open(url, "_blank");
}

// ===================== INITIALIZATION =====================
document.addEventListener("DOMContentLoaded", function() {
    console.log("✨ Invitación de boda cargada correctamente");
});

// ===================== PREVENT DOUBLE TAP ZOOM =====================
let lastTouchEnd = 0;
document.addEventListener("touchend", function(event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
