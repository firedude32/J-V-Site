// iSupport Ticket System Logic

// Get DOM elements
const statusDropdown = document.getElementById('status-dropdown');
const resolutionTextarea = document.getElementById('resolution-textarea');
const updateButton = document.getElementById('update-button');
const saveCloseBtn = document.getElementById('save-close-btn');
const validationText = document.getElementById('validation-text');

// Track form state
let formState = {
    statusClosed: false,
    hasResolution: false
};

// Update validation when textarea changes
resolutionTextarea.addEventListener('input', function () {
    formState.hasResolution = this.value.trim().length > 0;
    validateForm();
});

// Update validation when status changes
statusDropdown.addEventListener('change', function () {
    formState.statusClosed = this.value === 'Closed';
    validateForm();
});

// Validate form and enable/disable buttons
function validateForm() {
    const isValid = formState.statusClosed && formState.hasResolution;

    updateButton.disabled = !isValid;
    saveCloseBtn.disabled = !isValid;

    if (isValid) {
        validationText.classList.add('hidden');
    } else {
        validationText.classList.remove('hidden');
    }
}

// Handle ticket submission
function handleSubmit() {
    const resolution = resolutionTextarea.value.trim();

    // Store resolution
    localStorage.setItem('valentineResolution', resolution);
    localStorage.setItem('resolutionTimestamp', new Date().toISOString());

    // Visual feedback
    updateButton.textContent = 'Ticket Closed! ✓';
    updateButton.style.background = '#28a745';

    console.log('Resolution submitted:', resolution);

    // Redirect to final page
    setTimeout(() => {
        window.location.href = 'final.html';
    }, 1200);
}

// Attach click handlers
updateButton.addEventListener('click', handleSubmit);
saveCloseBtn.addEventListener('click', handleSubmit);

// Initialize validation state
validateForm();