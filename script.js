// Configurar la fecha de la boda: 3 de Octubre de 2026 a las 18:00
const weddingDate = new Date("Oct 3, 2026 18:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Cálculos de tiempo para días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Insertar resultados en el HTML agregando un cero a la izquierda si es menor de 10
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Si la fecha límite ha expirado
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("clock").innerHTML = "<p style='font-family:\'Cormorant Garamond\', serif; font-size:1.5rem; color:var(--verde-olivo); font-style:italic;'>¡Llegó el gran día!</p>";
    }
}, 1000);
