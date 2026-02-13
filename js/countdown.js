// Valentine's Day countdown logic

// Set the target date: February 14, 2026 at midnight
// const valentinesDay = new Date('2026-02-14T00:00:00').getTime();
// TEST VERSION - Unlocks in 2 minutes
const valentinesDay = new Date(Date.now() + 60 * 100).getTime();

// Get the current time
function checkAndStartCountdown() {
    const now = new Date().getTime();

    // Calculate time remaining
    const timeRemaining = valentinesDay - now;

    // Hide loading screen
    document.getElementById('loading-container').classList.add('hidden');

    // If Valentine's Day has arrived or passed, redirect to next page
    if (timeRemaining <= 0) {
        window.location.href = 'choose-type.html';
        return;
    }

    // Otherwise, show countdown
    document.getElementById('countdown-container').classList.remove('hidden');

    // Start updating the countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = valentinesDay - now;

    // If time is up, redirect
    if (timeRemaining <= 0) {
        window.location.href = 'choose-type.html';
        return;
    }

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the display with leading zeros
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Start everything when page loads
window.addEventListener('DOMContentLoaded', checkAndStartCountdown);