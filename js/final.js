// Final Page Logic

// ===== COUNTDOWN TO DATE =====
const dateTime = new Date('2026-02-14T19:30:00').getTime(); // 7:30 PM on Feb 14

function updateFinalCountdown() {
    const now = new Date().getTime();
    const timeRemaining = dateTime - now;

    if (timeRemaining <= 0) {
        document.getElementById('final-days').textContent = '00';
        document.getElementById('final-hours').textContent = '00';
        document.getElementById('final-minutes').textContent = '00';
        document.getElementById('final-seconds').textContent = '00';
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('final-days').textContent = String(days).padStart(2, '0');
    document.getElementById('final-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('final-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('final-seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateFinalCountdown();
setInterval(updateFinalCountdown, 1000);

// ===== DRAW PIXEL ART CHARACTERS =====

// Clippy (simple paperclip character)
function drawClippy() {
    const canvas = document.getElementById('clippy-canvas');
    const ctx = canvas.getContext('2d');

    // Simple Clippy design
    ctx.fillStyle = '#FFD700'; // Gold color

    // Body (curved paperclip shape)
    ctx.fillRect(30, 20, 10, 50);
    ctx.fillRect(20, 20, 20, 10);
    ctx.fillRect(20, 60, 20, 10);
    ctx.fillRect(10, 30, 10, 30);

    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(35, 35, 4, 4);
    ctx.fillRect(35, 50, 4, 4);

    // Smile
    ctx.fillRect(25, 55, 2, 2);
    ctx.fillRect(27, 57, 2, 2);
    ctx.fillRect(29, 58, 2, 2);
}

// IT Guy with flowers
function drawITGuy() {
    const canvas = document.getElementById('it-guy-canvas');
    const ctx = canvas.getContext('2d');

    // Head
    ctx.fillStyle = '#FDBCB4'; // Skin tone
    ctx.fillRect(30, 15, 20, 20);

    // Hair
    ctx.fillStyle = '#4A3728';
    ctx.fillRect(28, 10, 24, 8);

    // Glasses
    ctx.fillStyle = '#000';
    ctx.fillRect(32, 20, 6, 6);
    ctx.fillRect(42, 20, 6, 6);
    ctx.fillRect(38, 22, 4, 2);

    // Smile
    ctx.fillStyle = '#000';
    ctx.fillRect(35, 30, 10, 2);

    // Body (suit)
    ctx.fillStyle = '#2C3E50';
    ctx.fillRect(25, 35, 30, 35);

    // Shirt
    ctx.fillStyle = '#ECF0F1';
    ctx.fillRect(35, 40, 10, 30);

    // Flowers (bouquet)
    // Stems
    ctx.fillStyle = '#27AE60';
    ctx.fillRect(60, 50, 3, 30);
    ctx.fillRect(55, 55, 3, 25);
    ctx.fillRect(65, 52, 3, 28);

    // Flower petals (hearts)
    ctx.fillStyle = '#E74C3C'; // Red
    ctx.fillRect(58, 45, 5, 5);
    ctx.fillStyle = '#FF69B4'; // Pink
    ctx.fillRect(53, 50, 5, 5);
    ctx.fillStyle = '#E74C3C'; // Red
    ctx.fillRect(63, 47, 5, 5);
}

// Draw characters on load
drawClippy();
drawITGuy();

// ===== DISPLAY RESOLUTION (OPTIONAL) =====
const resolution = localStorage.getItem('valentineResolution');
const resolutionDisplay = document.getElementById('resolution-display');

if (resolution && resolution.trim()) {
    resolutionDisplay.innerHTML = `
        <p><strong>Her response:</strong></p>
        <p>"${resolution}"</p>
    `;
    resolutionDisplay.classList.remove('hidden');
} else {
    resolutionDisplay.classList.add('hidden');
}