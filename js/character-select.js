// Character Selection Logic - 5 Characters

// Character data - THE RIGHT ANSWER is "The Goofy IT/EBA Kid"
const characters = [
    {
        id: 1,
        name: "Gym Bro",
        image: "assets/images/characters/gym-guy.png",
        recommended: false
    },
    {
        id: 2,
        name: "The Debate Bro",
        image: "assets/images/characters/debate-guy.png",
        recommended: false
    },
    {
        id: 3,
        name: "Roman Life",
        image: "assets/images/characters/bookworm.png",
        recommended: false
    },
    {
        id: 4,
        name: "The Goofy IT/EBA Kid",
        image: "assets/images/characters/it-guy.png",
        recommended: true  // THE RIGHT ANSWER
    },
    {
        id: 5,
        name: "The Producer",
        image: "assets/images/characters/outdoorsman.png",
        recommended: false
    }
];

// Current selection index - START WITH FIRST CHARACTER
let currentIndex = 0;

// DOM elements
const characterGrid = document.getElementById('character-grid');
const selectedNameSpan = document.getElementById('selected-name');
const selectBtn = document.getElementById('select-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Generate character cards
function renderCharacters() {
    characterGrid.innerHTML = '';

    characters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';

        if (index === currentIndex) {
            card.classList.add('selected');
        }

        if (char.recommended && index === currentIndex) {
            card.classList.add('recommended');
        }

        card.innerHTML = `
            <div class="character-image-container">
                <img src="${char.image}" alt="${char.name}" class="character-image">
            </div>
            <div class="character-name">${char.name}</div>
        `;

        card.addEventListener('click', () => {
            currentIndex = index;
            updateSelection();
        });

        characterGrid.appendChild(card);
    });
}

// Update selection display
function updateSelection() {
    renderCharacters();
    selectedNameSpan.textContent = characters[currentIndex].name;
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateSelection();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % characters.length;
    updateSelection();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === 'Enter') {
        selectBtn.click();
    }
});

// Select button
selectBtn.addEventListener('click', selectCharacter);

function selectCharacter() {
    const selectedChar = characters[currentIndex];

    // Check if they selected the correct character
    if (selectedChar.recommended) {
        // CORRECT! Show Clippy notification
        localStorage.setItem('selectedCharacter', JSON.stringify(selectedChar));
        showClippyNotification();
    } else {
        // WRONG! Show error message
        showWrongSelectionMessage(selectedChar.name);
    }
}

function showWrongSelectionMessage(characterName) {
    // Create error overlay
    const overlay = document.createElement('div');
    overlay.className = 'wrong-selection-overlay';
    overlay.innerHTML = `
        <div class="wrong-selection-box">
            <div class="wrong-selection-title">🤔 Hmm...</div>
            <div class="wrong-selection-message">
                Are you sure <strong>${characterName}</strong> is the right choice?
            </div>
            <div class="wrong-selection-hint">
                Maybe try someone else? Look for the [recommended] tag!
            </div>
            <button class="wrong-selection-button" onclick="this.parentElement.parentElement.remove()">
                Try Again
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Auto-remove after clicking
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function showClippyNotification() {
    const clippyNotification = document.getElementById('clippy-notification');

    // Draw Clippy in notification
    drawNotificationClippy();

    // Show notification
    clippyNotification.classList.remove('hidden');

    // Click to go to valentine question page
    clippyNotification.addEventListener('click', () => {
        window.location.href = 'valentine-question.html';
    });
}

function drawNotificationClippy() {
    // Don't draw on canvas, we'll use an image instead
    const canvas = document.getElementById('clippy-notification-canvas');
    if (canvas) {
        canvas.style.display = 'none'; // Hide the canvas
    }

    // Check if we already added the image
    const clippyNotification = document.getElementById('clippy-notification');
    const existingImg = clippyNotification.querySelector('img.clippy-img');

    if (!existingImg) {
        // Create an img element
        const img = document.createElement('img');
        img.src = 'assets/images/clippy.png';
        img.className = 'clippy-img';
        img.style.width = '60px';
        img.style.height = '80px';
        img.style.imageRendering = 'pixelated';

        // Insert before the notification bubble
        clippyNotification.insertBefore(img, clippyNotification.firstChild);
    }
}

// Auto-generate placeholder images for characters
function createPlaceholderImage(text, bgColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 80, 80);

    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = text.split('\n');
    lines.forEach((line, i) => {
        ctx.fillText(line, 40, 40 + (i - (lines.length - 1) / 2) * 15);
    });

    return canvas.toDataURL();
}

// Generate placeholders if images fail to load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to let images render first
    setTimeout(() => {
        const images = document.querySelectorAll('.character-image');

        images.forEach((img, index) => {
            img.addEventListener('error', () => {
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#00B894', '#96CEB4'];
                const labels = ['GYM\nBRO', 'DEBATE\nBRO', 'ROMAN\nLIFE', 'IT/EBA\nKID', 'PRODUCER'];
                img.src = createPlaceholderImage(labels[index], colors[index]);
            });
        });
    }, 100);
});

// Initialize
updateSelection();