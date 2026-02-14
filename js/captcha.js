// CAPTCHA Logic - Three Stages
// THIS VERSION AUTO-GENERATES PLACEHOLDER IMAGES!

// Current stage tracker
let currentStage = 'checkbox';

// Get DOM elements
const stageCheckbox = document.getElementById('stage-checkbox');
const stageSimple = document.getElementById('stage-simple');
const stageCustom = document.getElementById('stage-custom');
const robotCheckbox = document.getElementById('robot-checkbox');
const simpleGrid = document.getElementById('simple-grid');
const customGrid = document.getElementById('custom-grid');
const simpleVerifyBtn = document.getElementById('simple-verify-btn');
const customVerifyBtn = document.getElementById('custom-verify-btn');
const errorMessage = document.getElementById('error-message');


// Simple CAPTCHA data (traffic lights) 
const simpleImages = [
    { src: 'assets/images/captcha/traffic-light-1.jpg', correct: true },
    { src: 'assets/images/captcha/traffic-light-2.jpg', correct: false },
    { src: 'assets/images/captcha/traffic-light-3.jpg', correct: false }
];

// Custom CAPTCHA data (your photos + decoys)
const customImages = [
    { src: 'assets/images/captcha/you-1.jpg', correct: true },
    { src: 'assets/images/captcha/decoy-bus.jpg', correct: false },
    { src: 'assets/images/captcha/you-2.jpg', correct: true },
    { src: 'assets/images/captcha/you-3.jpg', correct: true },
    { src: 'assets/images/captcha/decoy-dog.jpg', correct: false },
    { src: 'assets/images/captcha/you-4.jpg', correct: true },
    { src: 'assets/images/captcha/you-5.jpg', correct: true },
    { src: 'assets/images/captcha/decoy-coffee.jpg', correct: false },
    { src: 'assets/images/captcha/you-6.jpg', correct: true },
    { src: 'assets/images/captcha/you-7.jpg', correct: true },
    { src: 'assets/images/captcha/decoy-keyboard.jpg', correct: false },
    { src: 'assets/images/captcha/you-8.jpg', correct: true }
];

// Track selected images
let selectedSimple = [];
let selectedCustom = [];

// Error messages for custom CAPTCHA
const errorMessages = [
    "Almost! Try again.",
    "Hmm, not quite. Look closer!",
    "You're getting warmer...",
    "Hint: it's the one with your favorite smile.",
    "Think about who makes you happiest!"
];
let errorCount = 0;

// ===== STAGE 1: Checkbox =====
robotCheckbox.addEventListener('change', function () {
    if (this.checked) {
        setTimeout(() => {
            moveToSimpleCaptcha();
        }, 500);
    }
});

function moveToSimpleCaptcha() {
    stageCheckbox.classList.add('hidden');
    stageSimple.classList.remove('hidden');
    renderSimpleCaptcha();
}

// ===== STAGE 2: Simple CAPTCHA =====
function renderSimpleCaptcha() {
    simpleGrid.innerHTML = '';

    simpleImages.forEach((img, index) => {
        const tile = document.createElement('div');
        tile.className = 'image-tile';
        tile.innerHTML = `<img src="${img.src}" alt="Image ${index + 1}">`;

        tile.addEventListener('click', () => {
            // Only allow single selection for simple captcha
            document.querySelectorAll('#simple-grid .image-tile').forEach(t => {
                t.classList.remove('selected');
            });
            tile.classList.add('selected');
            selectedSimple = [index];
        });

        simpleGrid.appendChild(tile);
    });
}

simpleVerifyBtn.addEventListener('click', () => {
    if (selectedSimple.length === 0) return;

    // Check if correct image is selected
    const isCorrect = selectedSimple.some(index => simpleImages[index].correct);

    if (isCorrect) {
        // Move to custom CAPTCHA
        stageSimple.classList.add('hidden');
        stageCustom.classList.remove('hidden');
        renderCustomCaptcha();
    }
});

// ===== STAGE 3: Custom CAPTCHA (Your Photos) =====
function renderCustomCaptcha() {
    customGrid.innerHTML = '';

    customImages.forEach((img, index) => {
        const tile = document.createElement('div');
        tile.className = 'image-tile';
        tile.innerHTML = `<img src="${img.src}" alt="Image ${index + 1}">`;

        tile.addEventListener('click', () => {
            tile.classList.toggle('selected');

            // Update selected array
            const imgIndex = selectedCustom.indexOf(index);
            if (imgIndex > -1) {
                selectedCustom.splice(imgIndex, 1);
            } else {
                selectedCustom.push(index);
            }
        });

        customGrid.appendChild(tile);
    });
}

customVerifyBtn.addEventListener('click', () => {
    if (selectedCustom.length === 0) {
        showError("Please select at least one image.");
        return;
    }

    // Check if selection is correct
    const correctIndices = customImages
        .map((img, index) => img.correct ? index : -1)
        .filter(index => index !== -1);

    // Arrays must match exactly
    const selectedSorted = [...selectedCustom].sort((a, b) => a - b);
    const correctSorted = [...correctIndices].sort((a, b) => a - b);

    const isCorrect =
        selectedSorted.length === correctSorted.length &&
        selectedSorted.every((val, index) => val === correctSorted[index]);

    if (isCorrect) {
        // SUCCESS! Move to next page
        customVerifyBtn.textContent = 'Verified! ✓';
        customVerifyBtn.style.background = '#27ae60';

        setTimeout(() => {
            window.location.href = 'ticket.html';
        }, 1000);
    } else {
        // Show helpful error
        showError(errorMessages[errorCount % errorMessages.length]);
        errorCount++;

        // Shake animation
        customGrid.style.animation = 'shake 0.5s';
        setTimeout(() => {
            customGrid.style.animation = '';
        }, 500);
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');

    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 3000);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);