// Valentine Question Page - Fixed Initial Layout & Timing

// Button state
let noAttempts = 0;
let yesButtonScale = 1;
let isFleeing = false;
let lastFleeTime = 0;
const fleeCooldown = 1000; // 1 second cooldown

// NO button position tracking
let noButtonX = 0;
let noButtonY = 0;
let targetX = 0;
let targetY = 0;

// Get elements
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const buttonsContainer = document.getElementById('buttons-container');
const clippyMessage = document.getElementById('clippy-message');
const heartExplosion = document.getElementById('heart-explosion');
const explosionHeartsContainer = document.getElementById('explosion-hearts');

// Clippy messages
const clippyMessages = [
    "", "", "",
    "Come on, give him a chance! 📎",
    "The YES button is looking pretty good right now... 😊",
    "I think you know what you want to click... ❤️",
    "You're just making this harder on yourself! 💕",
    "The NO button is getting tired of running... 😅"
];

// Draw Clippy
function drawClippy() {
    const canvas = document.getElementById('clippy-canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clippy body
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(25, 15, 8, 50);
    ctx.fillRect(15, 15, 18, 8);
    ctx.fillRect(15, 57, 18, 8);
    ctx.fillRect(8, 23, 8, 35);

    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(28, 28, 3, 3);
    ctx.fillRect(28, 45, 3, 3);

    // Smile
    ctx.fillRect(20, 52, 2, 2);
    ctx.fillRect(22, 54, 2, 2);
    ctx.fillRect(24, 55, 2, 2);
}

drawClippy();

// Calculate distance between two points
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Update NO button position with smooth animation (only when fleeing)
function updateNoButtonPosition() {
    if (!isFleeing) {
        requestAnimationFrame(updateNoButtonPosition);
        return;
    }

    // Smooth easing toward target
    const ease = 0.15;
    noButtonX += (targetX - noButtonX) * ease;
    noButtonY += (targetY - noButtonY) * ease;

    noButton.style.left = noButtonX + 'px';
    noButton.style.top = noButtonY + 'px';
    noButton.style.transform = 'translate(-50%, -50%)';

    requestAnimationFrame(updateNoButtonPosition);
}

// Find safe escape position away from mouse AND away from YES button
function findEscapePosition(mouseX, mouseY) {
    const padding = 80;
    const minDistanceFromMouse = 250 + (noAttempts * 30);
    const minDistanceFromYes = 200; // Stay away from YES button

    // Get YES button position
    const yesRect = yesButton.getBoundingClientRect();
    const yesCenterX = yesRect.left + yesRect.width / 2;
    const yesCenterY = yesRect.top + yesRect.height / 2;

    let attempts = 0;
    let newX, newY;

    do {
        newX = padding + Math.random() * (window.innerWidth - padding * 2);
        newY = padding + Math.random() * (window.innerHeight - padding * 2);
        attempts++;

        // Give up after 30 tries and just use the last position
        if (attempts > 30) break;

        // Check distance from mouse
        const distanceFromMouse = getDistance(mouseX, mouseY, newX, newY);

        // Check distance from YES button
        const distanceFromYes = getDistance(yesCenterX, yesCenterY, newX, newY);

        // Position is valid if it's far enough from both mouse AND YES button
        if (distanceFromMouse >= minDistanceFromMouse && distanceFromYes >= minDistanceFromYes) {
            break;
        }

    } while (true);

    return { x: newX, y: newY };
}

// Check if mouse is actually over the button
function isMouseOverButton(mouseX, mouseY) {
    const buttonRect = noButton.getBoundingClientRect();

    return mouseX >= buttonRect.left &&
        mouseX <= buttonRect.right &&
        mouseY >= buttonRect.top &&
        mouseY <= buttonRect.bottom;
}

// Handle mouse movement
function handleMouseMove(e) {
    if (noButton.disabled) return;

    // Check cooldown
    const now = Date.now();
    if (now - lastFleeTime < fleeCooldown) return;

    // Only flee if mouse is actually over the button
    if (isMouseOverButton(e.clientX, e.clientY)) {
        handleNoEscape(e.clientX, e.clientY);
    }
}

// Handle NO button escape
function handleNoEscape(mouseX, mouseY) {
    noAttempts++;
    lastFleeTime = Date.now();

    // Switch to fleeing mode
    if (!isFleeing) {
        isFleeing = true;
        noButton.classList.add('fleeing');

        // Get current position
        const rect = noButton.getBoundingClientRect();
        noButtonX = rect.left + rect.width / 2;
        noButtonY = rect.top + rect.height / 2;
        targetX = noButtonX;
        targetY = noButtonY;
    }

    // Find new safe position
    const newPos = findEscapePosition(mouseX, mouseY);
    targetX = newPos.x;
    targetY = newPos.y;

    // Grow YES button
    yesButtonScale = Math.min(2.5, yesButtonScale + 0.2);
    yesButton.style.transform = `scale(${yesButtonScale})`;
    yesButton.classList.add('growing');

    // Show Clippy message
    if (clippyMessages[noAttempts]) {
        clippyMessage.textContent = clippyMessages[noAttempts];
        clippyMessage.classList.add('show');

        setTimeout(() => {
            clippyMessage.classList.remove('show');
        }, 3000);
    }

    // After 8 attempts, make it very difficult
    if (noAttempts >= 8) {
        clippyMessage.textContent = "Just click YES already! 💕";
        clippyMessage.classList.add('show');
    }
}

// Track mouse globally
document.addEventListener('mousemove', handleMouseMove);

// Handle NO button click (if they somehow manage to click it)
noButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!noButton.disabled) {
        handleNoEscape(e.clientX, e.clientY);
    }
});

// Touch support for mobile
let lastTouchTime = 0;

document.addEventListener('touchstart', (e) => {
    if (noButton.disabled) return;

    const now = Date.now();
    if (now - lastTouchTime < fleeCooldown) return;

    const touch = e.touches[0];

    if (isMouseOverButton(touch.clientX, touch.clientY)) {
        e.preventDefault();
        handleNoEscape(touch.clientX, touch.clientY);
        lastTouchTime = now;
    }
});

document.addEventListener('touchmove', (e) => {
    if (noButton.disabled) return;

    const now = Date.now();
    if (now - lastTouchTime < fleeCooldown) return;

    const touch = e.touches[0];

    if (isMouseOverButton(touch.clientX, touch.clientY)) {
        e.preventDefault();
        handleNoEscape(touch.clientX, touch.clientY);
        lastTouchTime = now;
    }
});

// YES button click
yesButton.addEventListener('click', () => {
    yesButton.disabled = true;
    noButton.disabled = true;

    document.removeEventListener('mousemove', handleMouseMove);

    heartExplosion.classList.remove('hidden');
    generateHeartExplosion();

    setTimeout(() => {
        window.location.href = 'captcha.html';
    }, 3000);
});

// Generate heart explosion
function generateHeartExplosion() {
    const heartTypes = ['❤️', '💕', '💖', '💗', '💝', '💓', '💘', '💞'];
    const numHearts = 50;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];

        heart.style.left = '50%';
        heart.style.top = '50%';

        const angle = (Math.PI * 2 * i) / numHearts + (Math.random() - 0.5) * 0.8;
        const distance = 200 + Math.random() * 400;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.animationDelay = (Math.random() * 0.6) + 's';

        const size = 25 + Math.random() * 35;
        heart.style.fontSize = size + 'px';

        explosionHeartsContainer.appendChild(heart);
    }
}

// Start animation loop
updateNoButtonPosition();