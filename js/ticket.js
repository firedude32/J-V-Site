// iSupport Ticket System Logic with EmailJS

// Initialize EmailJS
(function () {
    emailjs.init("7eDxZwQol7bD0VUa6"); // You'll need to get this from EmailJS dashboard
})();

// Get DOM elements
const statusDropdown = document.getElementById('status-select');
const resolutionTextarea = document.getElementById('resolution-textarea');
const updateButton = document.getElementById('update-button');
const validationMessage = document.getElementById('validation-message');

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

    if (isValid) {
        validationMessage.classList.add('hidden');
        updateButton.style.background = '#28a745';
    } else {
        validationMessage.classList.remove('hidden');
        updateButton.style.background = '#6c757d';
    }
}

// Handle ticket submission
function handleSubmit() {
    const resolution = resolutionTextarea.value.trim();

    // Store resolution locally
    localStorage.setItem('valentineResolution', resolution);
    localStorage.setItem('resolutionTimestamp', new Date().toISOString());

    // Visual feedback - sending
    updateButton.textContent = 'Sending... ✉️';
    updateButton.style.background = '#6c757d';
    updateButton.disabled = true;

    console.log('Sending email with resolution:', resolution);

    // Send email via EmailJS
    emailjs.send("service_bphn29e", "template_eez82jq", {
        resolution: resolution,
        timestamp: new Date().toLocaleString(),
        from_name: "Your Valentine"
    })
        .then(function (response) {
            console.log('Email sent successfully!', response.status, response.text);

            // Success feedback
            updateButton.textContent = 'Ticket Closed! ✓';
            updateButton.style.background = '#28a745';

            // Redirect to final page
            setTimeout(() => {
                window.location.href = 'final.html';
            }, 1200);
        })
        .catch(function (error) {
            console.error('Email failed to send:', error);

            // Still proceed even if email fails
            updateButton.textContent = 'Ticket Closed! ✓';
            updateButton.style.background = '#28a745';

            setTimeout(() => {
                window.location.href = 'final.html';
            }, 1200);
        });
}

// Attach click handler
updateButton.addEventListener('click', handleSubmit);

// Initialize validation state
validateForm();