// ===================== ELEMENTOS =====================
const wrapper  = document.getElementById("envelope-wrapper");
const content  = document.getElementById("content");
const music    = document.getElementById("music");
const btnVolver = document.getElementById("btnVolver");

// ===================== MÚSICA =====================
const tiempoInicio = 90;
const tiempoFin    = 130;

// ===================== ABRIR SOBRE =====================
wrapper.addEventListener("click", function () {
    if (wrapper.classList.contains("open")) return;

    // 1. Clase open → anima el flap
    wrapper.classList.add("open");

    // 2. Iniciar música
    try {
        music.currentTime = tiempoInicio;
        music.play().catch(function () {});
        music.addEventListener("timeupdate", function () {
            if (music.currentTime >= tiempoFin) {
                music.currentTime = tiempoInicio;
            }
        });
    } catch (e) {}

    // 3. Pétalos
    iniciarLluviaFlores();

    // 4. Mostrar contenido después de la animación (1s flap + 0.4s pausa)
    setTimeout(function () {
        wrapper.classList.add("hide");

        // Permitir scroll en body
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";

        content.classList.add("show");
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }, 1400);
});

// ===================== BOTÓN VOLVER =====================
btnVolver.addEventListener("click", function () {
    content.classList.remove("show");
    wrapper.classList.remove("hide", "open");

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    try {
        music.pause();
        music.currentTime = tiempoInicio;
    } catch (e) {}
});

// ===================== TOGGLE MÚSICA =====================
function toggleMusic() {
    const icon = document.getElementById("musicIcon");
    if (music.paused) {
        music.play().catch(function () {});
        icon.innerText = "⏸";
    } else {
        music.pause();
        icon.innerText = "▶";
    }
}

// ===================== COUNTDOWN =====================
function updateCountdown() {
    const target = new Date("Oct 3, 2026 13:00:00").getTime();
    const diff   = target - Date.now();

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML =
            '<div class="timer-text"><div class="timer-group"><span class="timer-val">🎉</span><span class="timer-lab">¡Hoy es el día!</span></div></div>';
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);

    document.getElementById("countdown").innerHTML = `
        <div class="timer-text">
            <div class="timer-group">
                <span class="timer-val">${d}</span>
                <span class="timer-lab">Días 💍</span>
            </div>
            <span class="timer-sep">:</span>
            <div class="timer-group">
                <span class="timer-val">${String(h).padStart(2,"0")}</span>
                <span class="timer-lab">Horas</span>
            </div>
            <span class="timer-sep">:</span>
            <div class="timer-group">
                <span class="timer-val">${String(m).padStart(2,"0")}</span>
                <span class="timer-lab">Mins</span>
            </div>
        </div>`;
}

// ===================== PÉTALOS =====================
function iniciarLluviaFlores() {
    const container = document.getElementById("falling-flowers");
    let count = 0;

    const interval = setInterval(function () {
        if (count >= 22) { clearInterval(interval); return; }

        const el = document.createElement("div");
        el.classList.add("falling-element");
        el.innerHTML = `
            <svg width="18" height="22" viewBox="0 0 24 30">
                <path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"
                      fill="#c8915a" opacity="0.8"/>
                <path d="M12 7C15 10 17 14 17 18C17 22 15 26 12 28C9 26 7 22 7 18C7 14 9 10 12 7Z"
                      fill="#e8b48a" opacity="0.6"/>
            </svg>`;
        el.style.left = Math.random() * 100 + "vw";
        el.style.animationDuration = (3 + Math.random() * 3) + "s";

        container.appendChild(el);
        setTimeout(function () { el.remove(); }, 7000);
        count++;
    }, 180);
}

// ===================== WHATSAPP =====================
function abrirWhatsApp(telefono, mensaje) {
    window.open(
        "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", function () {
    // Bloquear scroll hasta que se abra el sobre
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
});
