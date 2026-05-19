// ===================== ELEMENTOS =====================
const wrapper   = document.getElementById("envelope-wrapper");
const content   = document.getElementById("content");
const music     = document.getElementById("music");
const btnVolver = document.getElementById("btnVolver");

// ===================== MÚSICA =====================
const tiempoInicio = 90;
const tiempoFin    = 130;

// ===================== ABRIR SOBRE =====================
wrapper.addEventListener("click", function () {
    if (wrapper.classList.contains("open")) return;
    wrapper.classList.add("open");

    // Música
    try {
        music.currentTime = tiempoInicio;
        music.play().catch(function () {});
        music.addEventListener("timeupdate", function () {
            if (music.currentTime >= tiempoFin) music.currentTime = tiempoInicio;
        });
    } catch (e) {}

    // Pétalos
    iniciarLluviaFlores();

    // Mostrar contenido
    setTimeout(function () {
        wrapper.classList.add("hide");
        document.body.style.overflow    = "auto";
        document.documentElement.style.overflow = "auto";
        content.classList.add("show");
        updateCountdown();
        setInterval(updateCountdown, 1000);
        // Actualizar icono del player
        document.getElementById("musicIcon").innerText = "⏸";
    }, 800);
});

// ===================== BOTÓN VOLVER =====================
btnVolver.addEventListener("click", function () {
    content.classList.remove("show");
    wrapper.classList.remove("hide", "open");

    document.body.style.overflow    = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Scroll al principio del content para que no quede a medias
    content.scrollTop = 0;

    try {
        music.pause();
        music.currentTime = tiempoInicio;
        document.getElementById("musicIcon").innerText = "▶";
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
    const m = Math.floor((diff % 3600000) / 60000);

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

    const colors = ["#c8915a","#a8d878","#e8c860","#c87040","#90c050"];

    const interval = setInterval(function () {
        if (count >= 28) { clearInterval(interval); return; }

        const el = document.createElement("div");
        el.classList.add("falling-element");
        const color = colors[Math.floor(Math.random() * colors.length)];
        el.innerHTML = `
            <svg width="16" height="20" viewBox="0 0 24 30">
                <path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"
                      fill="${color}" opacity="0.85"/>
            </svg>`;
        el.style.left = Math.random() * 100 + "vw";
        el.style.animationDuration = (2.5 + Math.random() * 3.5) + "s";

        container.appendChild(el);
        setTimeout(function () { el.remove(); }, 8000);
        count++;
    }, 150);
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
    document.body.style.overflow    = "hidden";
    document.documentElement.style.overflow = "hidden";
});
