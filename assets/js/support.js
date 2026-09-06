// Support Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initSupportPage();
});

function initSupportPage() {
    initSupportOptions();
    initQuestionForm();
    initFAQSystem();
    initScrollToSections();
    
    console.log('Support page initialized successfully!');
}

// FAQ Database
const faqDatabase = [
    {
        id: 1,
        category: 'crop-diseases',
        question: 'How do I identify leaf curl disease in tomatoes?',
        answer: 'Leaf curl in tomatoes is characterized by upward curling of leaves, yellowing, and stunted growth. It\'s often caused by viral infections spread by whiteflies. To manage: 1) Remove affected plants immediately, 2) Control whitefly population using yellow sticky traps, 3) Use resistant varieties, 4) Maintain proper spacing for air circulation, 5) Apply neem oil spray as a preventive measure.'
    },
    {
        id: 2,
        category: 'soil-management',
        question: 'What is the ideal pH for most horticultural crops?',
        answer: 'Most horticultural crops prefer slightly acidic to neutral soil with pH between 6.0-7.0. However, specific crops have different preferences: Blueberries prefer acidic soil (4.5-5.5), while brassicas can tolerate slightly alkaline conditions (6.5-7.5). Test your soil pH regularly and amend with lime to raise pH or sulfur to lower pH as needed.'
    },
    {
        id: 3,
        category: 'irrigation',
        question: 'How often should I water my vegetable garden?',
        answer: 'Watering frequency depends on several factors: soil type, weather, crop stage, and season. Generally, most vegetables need 1-2 inches of water per week. Water deeply but less frequently to encourage deep root growth. Check soil moisture by inserting your finger 2-3 inches deep. Water early morning to reduce evaporation and disease risk.'
    },
    {
        id: 4,
        category: 'fertilizers',
        question: 'What is NPK and how do I choose the right fertilizer?',
        answer: 'NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K) - the three primary nutrients plants need. The numbers on fertilizer bags (like 10-10-10) represent the percentage of each nutrient. Choose based on your crop needs: High N for leafy greens, High P for flowering/fruiting plants, High K for root crops and overall plant health. Always soil test before applying fertilizers.'
    },
    {
        id: 5,
        category: 'crop-diseases',
        question: 'How can I prevent fungal diseases in my crops?',
        answer: 'Prevent fungal diseases by: 1) Ensuring good air circulation with proper plant spacing, 2) Watering at soil level, not on leaves, 3) Removing infected plant debris, 4) Rotating crops annually, 5) Using disease-resistant varieties, 6) Applying preventive fungicide sprays during humid conditions, 7) Avoiding overhead irrigation in evening.'
    },
    {
        id: 6,
        category: 'government-schemes',
        question: 'What government schemes are available for small farmers?',
        answer: 'Several schemes support small farmers: 1) PM-KISAN: ₹6000 annual income support, 2) Crop Insurance schemes for risk coverage, 3) Soil Health Card scheme for soil testing, 4) Pradhan Mantri Fasal Bima Yojana for crop insurance, 5) KCC (Kisan Credit Card) for easy credit access, 6) Various state-specific subsidies for seeds, fertilizers, and equipment. Contact your local agriculture office for details.'
    },
    {
        id: 7,
        category: 'irrigation',
        question: 'What is drip irrigation and is it suitable for small farms?',
        answer: 'Drip irrigation delivers water directly to plant roots through a network of tubes and emitters. Benefits include: 90% water efficiency, reduced weed growth, lower disease incidence, and precise nutrient delivery. It\'s excellent for small farms as it reduces labor and water costs. Initial investment ranges from ₹25,000-50,000 per acre but pays back through water savings and increased yields.'
    },
    {
        id: 8,
        category: 'fertilizers',
        question: 'How do I make organic compost at home?',
        answer: 'Make compost using kitchen scraps and garden waste: 1) Collect green materials (vegetable scraps, grass clippings) and brown materials (dry leaves, paper), 2) Layer in 3:1 brown to green ratio, 3) Turn pile every 2-3 weeks, 4) Keep moist but not soggy, 5) Ready in 3-6 months when dark and crumbly. Avoid meat, dairy, and diseased plant materials.'
    },
    {
        id: 9,
        category: 'crop-diseases',
        question: 'What are the signs of nutrient deficiency in plants?',
        answer: 'Common deficiency signs: Nitrogen - yellowing of older leaves, stunted growth; Phosphorus - purple/reddish leaves, poor flowering; Potassium - brown leaf edges, weak stems; Iron - yellowing between leaf veins; Magnesium - yellowing between veins of older leaves; Calcium - blossom end rot in tomatoes. Soil testing helps identify specific deficiencies.'
    },
    {
        id: 10,
        category: 'soil-management',
        question: 'How can I improve clay soil for better drainage?',
        answer: 'Improve clay soil by: 1) Adding organic matter like compost, aged manure, or leaf mold, 2) Creating raised beds for better drainage, 3) Adding coarse sand (not fine sand), 4) Installing drainage tiles if severely waterlogged, 5) Avoiding working wet clay soil, 6) Growing cover crops to improve soil structure, 7) Adding gypsum to improve soil structure without changing pH.'
    }
];

// Support Options
function initSupportOptions() {
    const optionCards = document.querySelectorAll('.option-card');
    const askQuestionBtn = document.getElementById('ask-question-btn');
    const browseFaqsBtn = document.getElementById('browse-faqs-btn');
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const option = this.getAttribute('data-option');
            handleSupportOption(option);
        });
    });
    
    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', function() {
            scrollToSection('ask-question-section');
        });
    }
    
    if (browseFaqsBtn) {
        browseFaqsBtn.addEventListener('click', function() {
            scrollToSection('faq-section');
        });
    }
}

function handleSupportOption(option) {
    switch(option) {
        case 'expert-chat':
            showNotification('Expert chat feature coming soon! For now, please use the question form below.', 'info');
            scrollToSection('ask-question-section');
            break;
        case 'video-call':
            showNotification('Video consultation booking coming soon! Please submit your question for now.', 'info');
            scrollToSection('ask-question-section');
            break;
        case 'field-visit':
            showNotification('Field visit requests coming soon! Please describe your issue in the question form.', 'info');
            scrollToSection('ask-question-section');
            break;
        case 'community-forum':
            showNotification('Community forum launching soon! Check our FAQ section for common questions.', 'info');
            scrollToSection('faq-section');
            break;
        default:
            scrollToSection('ask-question-section');
    }
}

// Question Form
function initQuestionForm() {
    const questionForm = document.getElementById('question-form');
    
    if (questionForm) {
        questionForm.addEventListener('submit', handleQuestionSubmission);
        
        // Add real-time validation
        const inputs = questionForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // File upload handling
        const fileInput = document.getElementById('question-images');
        if (fileInput) {
            fileInput.addEventListener('change', handleFileUpload);
        }
    }
}

function handleQuestionSubmission(e) {
    e.preventDefault();
    
    if (!validateQuestionForm()) {
        return;
    }
    
    const formData = new FormData(e.target);
    const questionData = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Question...';
    submitBtn.disabled = true;
    
    // Simulate submission
    setTimeout(() => {
        // Add timestamp and ID
        questionData.questionId = 'Q' + Date.now();
        questionData.submissionDate = new Date().toISOString();
        questionData.status = 'pending';
        questionData.priority = getPriorityFromUrgency(questionData.urgencyLevel);
        
        // Save to localStorage (in real app, this would be sent to backend)
        const existingQuestions = JSON.parse(localStorage.getItem('supportQuestions') || '[]');
        existingQuestions.push(questionData);
        localStorage.setItem('supportQuestions', JSON.stringify(existingQuestions));
        
        // Show success message
        showQuestionSuccess(questionData.questionId);
        
        // Reset form
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.log('Question submitted:', questionData);
    }, 2500);
}

function validateQuestionForm() {
    const form = document.getElementById('question-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function handleFileUpload(e) {
    const files = e.target.files;
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (files.length > maxFiles) {
        showNotification(`Maximum ${maxFiles} files allowed`, 'error');
        e.target.value = '';
        return;
    }
    
    for (let file of files) {
        if (file.size > maxSize) {
            showNotification(`File ${file.name} is too large. Maximum size is 10MB`, 'error');
            e.target.value = '';
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            showNotification(`File ${file.name} is not an image`, 'error');
            e.target.value = '';
            return;
        }
    }
    
    if (files.length > 0) {
        showNotification(`${files.length} image(s) selected successfully`, 'success');
    }
}

function getPriorityFromUrgency(urgency) {
    const priorityMap = {
        'low': 1,
        'medium': 2,
        'high': 3,
        'urgent': 4
    };
    return priorityMap[urgency] || 1;
}

function showQuestionSuccess(questionId) {
    const successMessage = `
        <div style="text-align: center; padding: 2rem; background: var(--light-gray); border-radius: 10px; margin-top: 2rem;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent-green); margin-bottom: 1rem;"></i>
            <h3 style="color: var(--primary-green); margin-bottom: 1rem;">Question Submitted Successfully!</h3>
            <p style="margin-bottom: 1rem;">Your question has been received and assigned to our expert team.</p>
            <p><strong>Question ID:</strong> ${questionId}</p>
            <p><strong>Expected Response Time:</strong> Within 24 hours</p>
            <p style="margin-top: 1rem; color: var(--gray);">You will receive updates via email and SMS.</p>
        </div>
    `;
    
    const questionContainer = document.querySelector('.question-container');
    questionContainer.insertAdjacentHTML('beforeend', successMessage);
    
    // Scroll to success message
    questionContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Question submitted successfully! Our experts will respond soon.', 'success');
}

// FAQ System
function initFAQSystem() {
    loadFAQs();
    initFAQSearch();
    initFAQCategories();
}

function loadFAQs(category = 'all', searchTerm = '') {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return;
    
    let filteredFAQs = faqDatabase;
    
    // Filter by category
    if (category !== 'all') {
        filteredFAQs = filteredFAQs.filter(faq => faq.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredFAQs = filteredFAQs.filter(faq => 
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (filteredFAQs.length === 0) {
        faqList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No FAQs found</h3>
                <p>Try adjusting your search terms or category filter</p>
            </div>
        `;
        return;
    }
    
    const faqsHTML = filteredFAQs.map(faq => `
        <div class="faq-item" data-faq-id="${faq.id}">
            <button class="faq-question" onclick="toggleFAQ(${faq.id})">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-answer">
                <div class="faq-category">${getCategoryName(faq.category)}</div>
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
    
    faqList.innerHTML = faqsHTML;
}

function initFAQSearch() {
    const searchInput = document.getElementById('faq-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        const activeCategory = document.querySelector('.faq-category-btn.active').getAttribute('data-category');
        loadFAQs(activeCategory, searchTerm);
    });
}

function initFAQCategories() {
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter FAQs
            const category = this.getAttribute('data-category');
            const searchTerm = document.getElementById('faq-search').value.trim();
            loadFAQs(category, searchTerm);
        });
    });
}

function toggleFAQ(faqId) {
    const faqItem = document.querySelector(`[data-faq-id="${faqId}"]`);
    if (faqItem) {
        faqItem.classList.toggle('active');
    }
}

function getCategoryName(category) {
    const categoryNames = {
        'crop-diseases': 'Diseases & Pests',
        'soil-management': 'Soil Management',
        'irrigation': 'Irrigation',
        'fertilizers': 'Fertilizers',
        'government-schemes': 'Government Schemes',
        'crop-selection': 'Crop Selection',
        'harvesting': 'Harvesting',
        'market-prices': 'Market Prices',
        'technology': 'Technology'
    };
    return categoryNames[category] || category;
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function initScrollToSections() {
    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

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

// Export functions for global access
window.SupportPage = {
    toggleFAQ,
    handleSupportOption,
    scrollToSection,
    loadFAQs
};

