// Survey Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initSurveyPage();
});

// Survey state
let currentStep = 1;
const totalSteps = 6;
let surveyData = {};

function initSurveyPage() {
    initSurveyNavigation();
    initFormValidation();
    initConditionalFields();
    initProgressTracking();
    initCounterAnimations();
    
    console.log('Survey page initialized successfully!');
}

// Survey Navigation
function initSurveyNavigation() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('community-survey-form');

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateCurrentStep()) {
                nextStep();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevStep();
        });
    }

    if (form) {
        form.addEventListener('submit', handleSurveySubmission);
    }

    // Initialize first step
    updateStepDisplay();
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Save current step data
        saveCurrentStepData();
        
        // Move to next step
        currentStep++;
        updateStepDisplay();
        updateProgress();
        
        // Scroll to top of form
        const surveyContainer = document.querySelector('.survey-container');
        if (surveyContainer) {
            surveyContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        updateProgress();
        
        // Scroll to top of form
        const surveyContainer = document.querySelector('.survey-container');
        if (surveyContainer) {
            surveyContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function updateStepDisplay() {
    // Hide all steps
    const steps = document.querySelectorAll('.survey-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }

    // Update navigation buttons
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (prevBtn) {
        prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }

    if (nextBtn && submitBtn) {
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }

    // Update step indicator
    const currentStepEl2 = document.getElementById('current-step');
    const totalStepsEl = document.getElementById('total-steps');
    
    if (currentStepEl2) currentStepEl2.textContent = currentStep;
    if (totalStepsEl) totalStepsEl.textContent = totalSteps;
}

function updateProgress() {
    const progressFill = document.getElementById('survey-progress');
    if (progressFill) {
        const progressPercentage = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('community-survey-form');
    if (!form) return;

    // Add real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });

        // Special handling for radio buttons and checkboxes
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.addEventListener('change', function() {
                validateField(this);
            });
        }
    });
}

function validateCurrentStep() {
    const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepEl) return true;

    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // Special validation for checkbox groups with required attribute
    const checkboxGroups = currentStepEl.querySelectorAll('input[type="checkbox"][required]');
    const groupNames = [...new Set(Array.from(checkboxGroups).map(cb => cb.name))];
    
    groupNames.forEach(groupName => {
        const groupCheckboxes = currentStepEl.querySelectorAll(`input[name="${groupName}"]`);
        const checkedBoxes = currentStepEl.querySelectorAll(`input[name="${groupName}"]:checked`);
        
        if (groupCheckboxes.length > 0 && checkedBoxes.length === 0) {
            showFieldError(groupCheckboxes[0], 'Please select at least one option');
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields before proceeding', 'error');
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name') || field.getAttribute('id') || 'Field';
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required')) {
        if (field.type === 'checkbox' || field.type === 'radio') {
            const groupName = field.name;
            const checkedInputs = document.querySelectorAll(`input[name="${groupName}"]:checked`);
            if (checkedInputs.length === 0) {
                errorMessage = 'This field is required';
                isValid = false;
            }
        } else if (!value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
    }

    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }

    // Phone validation
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
    }

    // Number validation
    if (field.type === 'number' && value) {
        const min = field.getAttribute('min');
        const max = field.getAttribute('max');
        const numValue = parseFloat(value);
        
        if (min && numValue < parseFloat(min)) {
            errorMessage = `Value must be at least ${min}`;
            isValid = false;
        }
        
        if (max && numValue > parseFloat(max)) {
            errorMessage = `Value must be at most ${max}`;
            isValid = false;
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // For radio and checkbox groups, show error after the group
    if (field.type === 'radio' || field.type === 'checkbox') {
        const group = field.closest('.radio-group, .checkbox-grid');
        if (group && group.parentNode) {
            group.parentNode.appendChild(errorElement);
        }
    } else {
        field.parentNode.appendChild(errorElement);
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    // Remove error message
    if (field.type === 'radio' || field.type === 'checkbox') {
        const group = field.closest('.radio-group, .checkbox-grid');
        if (group && group.parentNode) {
            const errorElement = group.parentNode.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    } else {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Conditional Fields
function initConditionalFields() {
    const conditionalTriggers = document.querySelectorAll('input[name="agricultural_involvement"]');
    
    conditionalTriggers.forEach(trigger => {
        trigger.addEventListener('change', function() {
            updateConditionalFields();
        });
    });
}

function updateConditionalFields() {
    const selectedValue = document.querySelector('input[name="agricultural_involvement"]:checked');
    const conditionalFields = document.querySelectorAll('.conditional-field');
    
    conditionalFields.forEach(field => {
        const condition = field.getAttribute('data-condition');
        const values = field.getAttribute('data-values').split(',');
        
        if (selectedValue && values.includes(selectedValue.value)) {
            field.classList.add('show');
            // Make fields required if shown
            const inputs = field.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (field.hasAttribute('data-required')) {
                    input.setAttribute('required', '');
                }
            });
        } else {
            field.classList.remove('show');
            // Remove required attribute if hidden
            const inputs = field.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.removeAttribute('required');
                input.value = ''; // Clear value
                clearFieldError(input);
            });
        }
    });
}

// Progress Tracking
function initProgressTracking() {
    updateProgress();
}

// Save step data
function saveCurrentStepData() {
    const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepEl) return;

    const formData = new FormData();
    const inputs = currentStepEl.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (input.checked) {
                if (!surveyData[input.name]) {
                    surveyData[input.name] = [];
                }
                surveyData[input.name].push(input.value);
            }
        } else if (input.type === 'radio') {
            if (input.checked) {
                surveyData[input.name] = input.value;
            }
        } else if (input.value.trim()) {
            surveyData[input.name] = input.value.trim();
        }
    });
}

// Survey Submission
function handleSurveySubmission(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }

    // Save final step data
    saveCurrentStepData();
    
    // Show loading state
    const form = document.getElementById('community-survey-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (form) form.classList.add('loading');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
    }

    // Simulate submission (in real app, this would send to backend)
    setTimeout(() => {
        // Add timestamp and ID
        surveyData.submissionId = Date.now();
        surveyData.submissionDate = new Date().toISOString();
        surveyData.submissionTime = new Date().toLocaleString();
        
        // Save to localStorage (in real app, this would be sent to server)
        const existingSurveys = JSON.parse(localStorage.getItem('communitysurveys') || '[]');
        existingSurveys.push(surveyData);
        localStorage.setItem('communitysurveys', JSON.stringify(existingSurveys));
        
        // Show success message
        showSurveySuccess();
        
        // Reset form state
        if (form) form.classList.remove('loading');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Survey';
            submitBtn.disabled = false;
        }
        
        console.log('Survey submitted:', surveyData);
    }, 3000);
}

function showSurveySuccess() {
    const surveyContainer = document.querySelector('.survey-container');
    if (!surveyContainer) return;

    const successHTML = `
        <div class="survey-success">
            <i class="fas fa-check-circle"></i>
            <h3>Survey Submitted Successfully!</h3>
            <p>Thank you for your valuable feedback. Your responses will help us improve agricultural practices and support in your community.</p>
            <p><strong>Submission ID:</strong> ${surveyData.submissionId}</p>
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="location.reload()">
                    <i class="fas fa-redo"></i> Submit Another Response
                </button>
                <a href="../index.html" class="btn btn-secondary" style="margin-left: 1rem;">
                    <i class="fas fa-home"></i> Back to Home
                </a>
            </div>
        </div>
    `;

    surveyContainer.innerHTML = successHTML;
    
    // Scroll to success message
    surveyContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Show notification
    showNotification('Survey submitted successfully! Thank you for your participation.', 'success');
}

// Counter animations for stats
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showNotification(message, type = 'info', duration = 5000) {
    // Use the global notification function from main.js
    if (window.AgriHortConnect && window.AgriHortConnect.showNotification) {
        window.AgriHortConnect.showNotification(message, type, duration);
    } else {
        // Fallback alert
        alert(message);
    }
}

// Auto-save functionality
function initAutoSave() {
    const form = document.getElementById('community-survey-form');
    if (!form) return;

    // Save progress every 30 seconds
    setInterval(() => {
        saveCurrentStepData();
        const savedData = {
            currentStep,
            surveyData,
            timestamp: Date.now()
        };
        localStorage.setItem('surveyProgress', JSON.stringify(savedData));
    }, 30000);
}

// Load saved progress
function loadSavedProgress() {
    const savedProgress = localStorage.getItem('surveyProgress');
    if (!savedProgress) return;

    try {
        const progress = JSON.parse(savedProgress);
        const timeDiff = Date.now() - progress.timestamp;
        
        // Only restore if saved within last hour
        if (timeDiff < 3600000) {
            currentStep = progress.currentStep;
            surveyData = progress.surveyData;
            
            // Restore form values
            Object.keys(surveyData).forEach(key => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        if (Array.isArray(surveyData[key])) {
                            surveyData[key].forEach(value => {
                                const checkbox = document.querySelector(`[name="${key}"][value="${value}"]`);
                                if (checkbox) checkbox.checked = true;
                            });
                        } else {
                            const radio = document.querySelector(`[name="${key}"][value="${surveyData[key]}"]`);
                            if (radio) radio.checked = true;
                        }
                    } else {
                        field.value = surveyData[key];
                    }
                }
            });
            
            updateStepDisplay();
            updateProgress();
            updateConditionalFields();
            
            showNotification('Previous progress restored', 'info');
        }
    } catch (error) {
        console.error('Error loading saved progress:', error);
    }
}

// Initialize auto-save and load progress
initAutoSave();
loadSavedProgress();

// Export functions for global access
window.SurveyPage = {
    nextStep,
    prevStep,
    validateCurrentStep,
    saveCurrentStepData,
    handleSurveySubmission
};
