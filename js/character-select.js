// Character selection logic

// Character data
const characters = [
    {
        id: 1,
        name: "The Gym Guy",
        image: "assets/images/characters/gym-guy.png",
        recommended: false
    },
    {
        id: 2,
        name: "The Debate Dude",
        image: "assets/images/characters/debate-guy.png",
        recommended: false
    },
    {
        id: 3,
        name: "The Bookworm",
        image: "assets/images/characters/bookworm.png",
        recommended: false
    },
    {
        id: 4,
        name: "YOU: The IT Guy",
        image: "assets/images/characters/it-guy.png",
        recommended: true  // THE RIGHT ANSWER
    },
    {
        id: 5,
        name: "The Outdoorsman",
        image: "assets/images/characters/outdoorsman.png",
        recommended: false
    },
    {
        id: 6,
        name: "The Musician",
        image: "assets/images/characters/musician.png",
        recommended: false
    },
    {
        id: 7,
        name: "The Business Guy",
        image: "assets/images/characters/business-guy.png",
        recommended: false
    },
    {
        id: 8,
        name: "The Mysterious Guy",
        image: "assets/images/characters/mysterious-guy.png",
        recommended: false
    }
];

// Current selection (start with "YOU: The IT Guy" at index 3)
let currentIndex = 3;

// Get DOM elements
const container = document.getElementById('characters-container');
const leftArrow = document.getElementById('arrow-left');
const rightArrow = document.getElementById('arrow-right');
const selectBtn = document.getElementById('select-btn');
const selectedNameDisplay = document.getElementById('selected-name');

// Render all characters
function renderCharacters() {
    container.innerHTML = '';

    characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';

        // Add selected class to current character
        if (index === currentIndex) {
            card.classList.add('selected');
        }

        // Add recommended class to the IT Guy
        if (character.recommended) {
            card.classList.add('recommended');
        }

        card.innerHTML = `
            <div class="character-image-container">
                <img src="${character.image}" alt="${character.name}" class="character-image">
            </div>
            <div class="character-name">${character.name}</div>
        `;

        // Click to select
        card.addEventListener('click', () => {
            currentIndex = index;
            updateDisplay();
        });

        container.appendChild(card);
    });

    updateDisplay();
}

// Update the display when selection changes
function updateDisplay() {
    // Remove all selected classes
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => card.classList.remove('selected'));

    // Add selected class to current
    cards[currentIndex].classList.add('selected');

    // Update selected name display
    selectedNameDisplay.textContent = characters[currentIndex].name;

    // Scroll to center the selected character (smooth visual effect)
    const selectedCard = cards[currentIndex];
    const containerWidth = container.offsetWidth;
    const cardWidth = selectedCard.offsetWidth;
    const scrollPosition = selectedCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);

    container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Navigate left
function goLeft() {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateDisplay();
}

// Navigate right
function goRight() {
    currentIndex = (currentIndex + 1) % characters.length;
    updateDisplay();
}

// Event listeners
leftArrow.addEventListener('click', goLeft);
rightArrow.addEventListener('click', goRight);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        goLeft();
    } else if (e.key === 'ArrowRight') {
        goRight();
    } else if (e.key === 'Enter') {
        selectCharacter();
    }
});

// Select button
selectBtn.addEventListener('click', selectCharacter);

function selectCharacter() {
    // Store selection in localStorage (optional, for later use)
    localStorage.setItem('selectedCharacter', JSON.stringify(characters[currentIndex]));

    // Add a brief animation
    selectBtn.textContent = 'SELECTED!';
    selectBtn.style.background = '#f39c12';

    // Proceed to next page after short delay
    setTimeout(() => {
        window.location.href = 'captcha.html';
    }, 800);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', renderCharacters);