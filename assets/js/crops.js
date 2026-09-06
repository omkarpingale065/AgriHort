// Crops Page JavaScript - Enhanced with Rare Horticultural Crops
document.addEventListener('DOMContentLoaded', function() {
    initCropsPage();
});

function initCropsPage() {
    loadCropDatabase();
    generateCropCards();
    initSearchFunctionality();
    initFilterFunctionality();
    initCategoryCards();
    initCropModals();
    initLazyLoadingForCrops();
    updateResultsCount();
    
    console.log('Crops page initialized successfully with', Object.keys(cropDatabase).length, 'rare horticultural crops!');
}

function loadCropDatabase() {
    // Load the crop database from the separate file
    if (typeof cropDatabase === 'undefined') {
        console.error('Crop database not loaded. Please ensure crop-database.js is included.');
        return;
    }
}

function generateCropCards() {
    const cropsGrid = document.getElementById('crops-grid');
    if (!cropsGrid) return;
    
    const cropCards = Object.entries(cropDatabase).map(([key, crop]) => {
        return `
            <div class="crop-card" data-crop-id="${key}" data-category="${crop.category}" data-season="${crop.season}">
                <div class="crop-image-container">
                    <img src="${crop.image}" alt="${crop.name}" class="crop-image" loading="lazy">
                    <div class="crop-category-badge">${formatCategoryName(crop.category)}</div>
                </div>
                <div class="crop-content">
                    <h3 class="crop-name">${crop.name}</h3>
                    <p class="crop-scientific">${crop.scientificName}</p>
                    <p class="crop-description">${crop.description.substring(0, 120)}...</p>
                    <div class="crop-quick-info">
                        <span class="crop-season">
                            <i class="fas fa-calendar"></i>
                            ${crop.quickFacts.season}
                        </span>
                        <span class="crop-maturity">
                            <i class="fas fa-clock"></i>
                            ${crop.quickFacts.maturity}
                        </span>
                    </div>
                    <div class="crop-market-info">
                        <span class="market-price">
                            <i class="fas fa-rupee-sign"></i>
                            ${extractMarketPrice(crop.benefits.content)}
                        </span>
                    </div>
                </div>
                <div class="crop-overlay">
                    <button class="btn btn-primary crop-details-btn">
                        <i class="fas fa-info-circle"></i>
                        View Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    cropsGrid.innerHTML = cropCards;
}

function formatCategoryName(category) {
    const names = {
        fruits: 'Fruits',
        vegetables: 'Vegetables',
        herbs: 'Herbs',
        spices: 'Spices',
        flowers: 'Flowers'
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function extractMarketPrice(benefits) {
    const priceRegex = /₹[\d,]+-[\d,]+|₹[\d,]+/;
    for (const benefit of benefits) {
        const match = benefit.match(priceRegex);
        if (match) {
            return match[0];
        }
    }
    return 'Premium';
}

// Crop Database
const cropDatabase = {
    mango: {
        name: 'Mango',
        scientificName: 'Mangifera indica',
        category: 'fruits',
        season: 'summer',
        image: '../assets/images/crops/mango.jpg',
        description: 'Mango is known as the "King of Fruits" and is one of the most popular tropical fruits worldwide. It is highly nutritious and has excellent market demand both domestically and internationally.',
        quickFacts: {
            season: 'Summer (March-June)',
            maturity: '3-5 years',
            temperature: '24-27°C',
            rainfall: '750-2500mm',
            soilPH: '5.5-7.5',
            spacing: '10m x 10m'
        },
        cultivation: {
            title: 'Cultivation Practices',
            content: [
                'Select well-drained, deep fertile soil with good organic matter content',
                'Plant grafted saplings during monsoon season (June-August)',
                'Maintain proper spacing of 10m x 10m for better growth',
                'Apply organic manure and balanced fertilizers regularly',
                'Ensure adequate irrigation during flowering and fruit development',
                'Practice regular pruning to maintain tree shape and health'
            ]
        },
        varieties: {
            title: 'Popular Varieties',
            content: [
                'Alphonso - Premium variety with excellent taste and aroma',
                'Kesar - Sweet variety with saffron-colored pulp',
                'Dasheri - North Indian variety with excellent flavor',
                'Langra - Green-skinned variety with sweet taste',
                'Chausa - Large-sized variety with rich flavor',
                'Banganapalli - South Indian variety with good keeping quality'
            ]
        },
        diseases: {
            title: 'Common Diseases & Pests',
            content: [
                'Anthracnose - Fungal disease affecting leaves and fruits',
                'Powdery Mildew - White powdery growth on leaves',
                'Mango Hopper - Insect pest causing leaf damage',
                'Fruit Fly - Major pest affecting fruit quality',
                'Scale Insects - Sucking pests on branches and leaves',
                'Stem Borer - Pest causing damage to tree trunk'
            ]
        },
        harvesting: {
            title: 'Harvesting & Post-Harvest',
            content: [
                'Harvest fruits when they reach physiological maturity',
                'Use proper harvesting tools to avoid fruit damage',
                'Grade fruits based on size, color, and quality',
                'Store in cool, ventilated conditions',
                'Use ethylene treatment for uniform ripening',
                'Package properly for transportation to markets'
            ]
        },
        economics: {
            title: 'Economic Aspects',
            content: [
                'Initial investment: ₹50,000-80,000 per acre',
                'Annual maintenance: ₹15,000-25,000 per acre',
                'Yield: 8-15 tons per acre (mature trees)',
                'Market price: ₹20-100 per kg (variety dependent)',
                'Export potential: High demand in international markets',
                'Processing opportunities: Pulp, juice, dried products'
            ]
        }
    },
    grapes: {
        name: 'Grapes',
        scientificName: 'Vitis vinifera',
        category: 'fruits',
        season: 'all',
        image: '../assets/images/crops/grapes.jpg',
        description: 'Grapes are versatile fruits used for fresh consumption, wine production, and processing. They are high-value crops with excellent export potential and can be grown in various climatic conditions.',
        quickFacts: {
            season: 'All Season',
            maturity: '2-3 years',
            temperature: '15-25°C',
            rainfall: '500-1200mm',
            soilPH: '6.0-7.5',
            spacing: '3m x 2m'
        },
        cultivation: {
            title: 'Cultivation Practices',
            content: [
                'Choose well-drained, fertile soil with good organic content',
                'Plant grafted vines during winter season (December-January)',
                'Install proper trellis system for vine support',
                'Maintain adequate spacing for air circulation',
                'Apply balanced fertilizers and organic manure',
                'Practice regular pruning for better fruit quality'
            ]
        },
        varieties: {
            title: 'Popular Varieties',
            content: [
                'Thompson Seedless - Most popular seedless variety',
                'Flame Seedless - Red-colored seedless variety',
                'Red Globe - Large-sized seeded variety',
                'Bangalore Blue - Traditional Indian variety',
                'Anab-e-Shahi - Large white seeded variety',
                'Sharad Seedless - Late-season seedless variety'
            ]
        },
        diseases: {
            title: 'Common Diseases & Pests',
            content: [
                'Downy Mildew - Major fungal disease in humid conditions',
                'Powdery Mildew - White powdery growth on leaves',
                'Anthracnose - Fungal disease affecting berries',
                'Thrips - Tiny insects causing leaf damage',
                'Mealybugs - Sucking pests on clusters',
                'Flea Beetle - Pest causing holes in leaves'
            ]
        },
        harvesting: {
            title: 'Harvesting & Post-Harvest',
            content: [
                'Harvest when berries reach proper sugar content (18-22 Brix)',
                'Cut clusters carefully to avoid berry damage',
                'Sort and grade based on size and quality',
                'Pre-cool immediately after harvest',
                'Store in cold storage at 0-2°C',
                'Package in ventilated boxes for transportation'
            ]
        },
        economics: {
            title: 'Economic Aspects',
            content: [
                'Initial investment: ₹1,00,000-1,50,000 per acre',
                'Annual maintenance: ₹30,000-50,000 per acre',
                'Yield: 10-20 tons per acre',
                'Market price: ₹30-150 per kg',
                'Export potential: Very high, especially seedless varieties',
                'Value addition: Wine, juice, raisins production'
            ]
        }
    },
    tomato: {
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        category: 'vegetables',
        season: 'summer',
        image: '../assets/images/crops/tomato.jpg',
        description: 'Tomato is one of the most important vegetable crops worldwide. It is rich in vitamins, minerals, and antioxidants. It has consistent market demand and can be grown in various seasons.',
        quickFacts: {
            season: 'Summer/Winter',
            maturity: '3-4 months',
            temperature: '20-25°C',
            rainfall: '600-1200mm',
            soilPH: '6.0-7.0',
            spacing: '60cm x 45cm'
        },
        cultivation: {
            title: 'Cultivation Practices',
            content: [
                'Prepare well-drained, fertile soil with good organic matter',
                'Start with healthy seedlings from disease-free seeds',
                'Transplant 4-5 week old seedlings',
                'Provide support with stakes or cages for indeterminate varieties',
                'Apply balanced fertilizers and maintain soil moisture',
                'Practice crop rotation to prevent soil-borne diseases'
            ]
        },
        varieties: {
            title: 'Popular Varieties',
            content: [
                'Pusa Ruby - Determinate variety with good yield',
                'Arka Vikas - Semi-determinate with disease resistance',
                'Himsona - Suitable for hilly regions',
                'Pusa Rohini - Early maturing variety',
                'Arka Saurabh - High-yielding hybrid variety',
                'Naveen 2000+ - Popular hybrid with good shelf life'
            ]
        },
        diseases: {
            title: 'Common Diseases & Pests',
            content: [
                'Early Blight - Fungal disease causing leaf spots',
                'Late Blight - Serious fungal disease in humid conditions',
                'Bacterial Wilt - Soil-borne bacterial disease',
                'Tomato Leaf Curl Virus - Viral disease spread by whiteflies',
                'Fruit Borer - Caterpillar pest damaging fruits',
                'Whitefly - Sucking pest and virus vector'
            ]
        },
        harvesting: {
            title: 'Harvesting & Post-Harvest',
            content: [
                'Harvest at proper maturity stage based on end use',
                'Pick fruits in early morning for better quality',
                'Handle carefully to avoid bruising',
                'Sort and grade based on size and ripeness',
                'Store in cool, ventilated conditions',
                'Use proper packaging for transportation'
            ]
        },
        economics: {
            title: 'Economic Aspects',
            content: [
                'Initial investment: ₹25,000-40,000 per acre',
                'Annual maintenance: ₹20,000-35,000 per acre',
                'Yield: 20-40 tons per acre',
                'Market price: ₹8-25 per kg',
                'Processing potential: Paste, sauce, ketchup production',
                'Multiple harvests possible with proper management'
            ]
        }
    },
    roses: {
        name: 'Roses',
        scientificName: 'Rosa species',
        category: 'flowers',
        season: 'all',
        image: '../assets/images/crops/roses.jpg',
        description: 'Roses are premium ornamental flowers with high commercial value. They are used for cut flowers, essential oil production, and landscaping. Rose cultivation is highly profitable with proper management.',
        quickFacts: {
            season: 'All Season',
            maturity: '1-2 years',
            temperature: '18-25°C',
            rainfall: '600-1000mm',
            soilPH: '6.0-7.0',
            spacing: '1.5m x 1m'
        },
        cultivation: {
            title: 'Cultivation Practices',
            content: [
                'Select well-drained, fertile soil rich in organic matter',
                'Plant grafted saplings during winter season',
                'Provide adequate spacing for air circulation',
                'Install drip irrigation for efficient water management',
                'Apply organic manure and balanced fertilizers regularly',
                'Practice regular pruning for better flower quality'
            ]
        },
        varieties: {
            title: 'Popular Varieties',
            content: [
                'Red Rose - Classic variety with strong fragrance',
                'Pink Rose - Delicate variety popular for bouquets',
                'White Rose - Symbol of purity, high demand',
                'Yellow Rose - Bright variety for special occasions',
                'Orange Rose - Unique color with good market value',
                'Hybrid Tea Roses - Large flowers with long stems'
            ]
        },
        diseases: {
            title: 'Common Diseases & Pests',
            content: [
                'Black Spot - Fungal disease causing black spots on leaves',
                'Powdery Mildew - White powdery growth on leaves',
                'Rust - Orange-colored spots on leaves',
                'Aphids - Sucking pests on tender shoots',
                'Thrips - Tiny insects damaging flower buds',
                'Spider Mites - Microscopic pests causing leaf damage'
            ]
        },
        harvesting: {
            title: 'Harvesting & Post-Harvest',
            content: [
                'Harvest flowers in early morning when cool',
                'Cut stems at proper length based on market requirement',
                'Place immediately in water after cutting',
                'Grade flowers based on stem length and quality',
                'Store in cold storage at 2-4°C',
                'Package carefully to prevent damage during transport'
            ]
        },
        economics: {
            title: 'Economic Aspects',
            content: [
                'Initial investment: ₹80,000-1,20,000 per acre',
                'Annual maintenance: ₹40,000-60,000 per acre',
                'Yield: 1-2 lakh stems per acre per year',
                'Market price: ₹2-10 per stem',
                'Export potential: High demand in international markets',
                'Value addition: Essential oil, rose water production'
            ]
        }
    },
    basil: {
        name: 'Basil (Tulsi)',
        scientificName: 'Ocimum basilicum',
        category: 'herbs',
        season: 'all',
        image: '../assets/images/crops/basil.jpg',
        description: 'Basil is a sacred herb in Indian culture with significant medicinal properties. It is used for culinary purposes, essential oil production, and traditional medicine. It can be grown year-round in suitable conditions.',
        quickFacts: {
            season: 'All Season',
            maturity: '2-3 months',
            temperature: '20-30°C',
            rainfall: '600-1000mm',
            soilPH: '6.0-7.5',
            spacing: '30cm x 20cm'
        },
        cultivation: {
            title: 'Cultivation Practices',
            content: [
                'Prepare well-drained, fertile soil with good organic content',
                'Sow seeds directly or transplant seedlings',
                'Maintain adequate moisture but avoid waterlogging',
                'Apply organic manure and compost regularly',
                'Practice regular harvesting to encourage new growth',
                'Protect from strong winds and extreme weather'
            ]
        },
        varieties: {
            title: 'Popular Varieties',
            content: [
                'Sweet Basil - Common culinary variety',
                'Holy Basil (Tulsi) - Sacred variety with medicinal properties',
                'Thai Basil - Aromatic variety used in Asian cuisine',
                'Purple Basil - Ornamental variety with purple leaves',
                'Lemon Basil - Citrus-scented variety',
                'African Blue Basil - Perennial variety with blue flowers'
            ]
        },
        diseases: {
            title: 'Common Diseases & Pests',
            content: [
                'Fusarium Wilt - Soil-borne fungal disease',
                'Bacterial Leaf Spot - Bacterial disease causing spots',
                'Downy Mildew - Fungal disease in humid conditions',
                'Aphids - Sucking pests on tender shoots',
                'Whitefly - Small flying insects on leaves',
                'Cutworms - Caterpillars cutting young plants'
            ]
        },
        harvesting: {
            title: 'Harvesting & Post-Harvest',
            content: [
                'Harvest leaves when plants are 6-8 inches tall',
                'Cut stems in early morning for better quality',
                'Regular harvesting encourages bushy growth',
                'Dry leaves in shade for long-term storage',
                'Extract essential oil through steam distillation',
                'Package dried leaves in airtight containers'
            ]
        },
        economics: {
            title: 'Economic Aspects',
            content: [
                'Initial investment: ₹15,000-25,000 per acre',
                'Annual maintenance: ₹10,000-18,000 per acre',
                'Yield: 2-4 tons fresh leaves per acre',
                'Market price: ₹20-40 per kg fresh leaves',
                'Essential oil yield: 15-20 kg per acre',
                'Value addition: Essential oil, dried leaves, tea'
            ]
        }
    }
};

// Search functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('crop-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterCrops(searchTerm);
    });
}

// Filter functionality
function initFilterFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter crops
            const filterValue = this.getAttribute('data-filter');
            filterCropsByCategory(filterValue);
        });
    });
}

// Category cards functionality
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            const targetButton = document.querySelector(`[data-filter="${category}"]`);
            if (targetButton) {
                targetButton.classList.add('active');
            }
            
            // Filter crops
            filterCropsByCategory(category);
            
            // Scroll to crops grid
            const cropsGrid = document.querySelector('.crops-grid-section');
            if (cropsGrid) {
                cropsGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Filter crops by search term
function filterCrops(searchTerm) {
    const cropCards = document.querySelectorAll('.crop-card');
    let visibleCount = 0;
    
    cropCards.forEach(card => {
        const cropName = card.querySelector('h3').textContent.toLowerCase();
        const cropDescription = card.querySelector('.crop-description').textContent.toLowerCase();
        const cropScientific = card.querySelector('.crop-scientific').textContent.toLowerCase();
        const cropCategory = card.getAttribute('data-category');
        const cropSeason = card.getAttribute('data-season');
        
        const isMatch = cropName.includes(searchTerm) ||
                       cropDescription.includes(searchTerm) ||
                       cropScientific.includes(searchTerm) ||
                       cropCategory.includes(searchTerm) ||
                       cropSeason.includes(searchTerm);
        
        if (isMatch || searchTerm === '') {
            card.style.display = 'block';
            card.classList.add('show');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount === 0 && searchTerm !== '');
}

// Filter crops by category
function filterCropsByCategory(category) {
    const cropCards = document.querySelectorAll('.crop-card');
    let visibleCount = 0;
    
    cropCards.forEach(card => {
        const cropCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cropCategory === category) {
            card.style.display = 'block';
            card.classList.add('show');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });
    
    // Clear search input
    const searchInput = document.getElementById('crop-search');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount === 0);
}

// Show no results message
function showNoResultsMessage(show) {
    let noResultsDiv = document.querySelector('.no-results');
    
    if (show && !noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No crops found</h3>
            <p>Try adjusting your search terms or filters</p>
        `;
        
        const cropsGrid = document.getElementById('crops-grid');
        if (cropsGrid) {
            cropsGrid.appendChild(noResultsDiv);
        }
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Modal functionality
function initCropModals() {
    const modal = document.getElementById('crop-modal');
    const modalClose = document.getElementById('modal-close');
    const detailButtons = document.querySelectorAll('.crop-details-btn');
    
    // Open modal
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cropId = this.getAttribute('data-crop');
            showCropDetails(cropId);
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            hideModal();
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            hideModal();
        }
    });
}

// Show crop details in modal
function showCropDetails(cropId) {
    const crop = cropDatabase[cropId];
    if (!crop) return;
    
    const modal = document.getElementById('crop-modal');
    const modalTitle = document.getElementById('modal-crop-name');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    // Set modal title
    modalTitle.textContent = crop.name;
    
    // Create modal content
    const modalContent = `
        <div class="crop-detail-content">
            <div class="crop-detail-header">
                <img src="${crop.image}" alt="${crop.name}" class="crop-detail-image" loading="lazy">
                <div class="crop-basic-info">
                    <h3>${crop.name}</h3>
                    <p class="scientific-name">${crop.scientificName}</p>
                    <p class="description">${crop.description}</p>
                </div>
            </div>
            
            <div class="crop-quick-facts">
                ${Object.entries(crop.quickFacts).map(([key, value]) => `
                    <div class="quick-fact">
                        <div class="label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                        <div class="value">${value}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="crop-sections">
                ${Object.entries(crop).filter(([key]) => 
                    !['name', 'scientificName', 'category', 'season', 'image', 'description', 'quickFacts'].includes(key)
                ).map(([key, section]) => `
                    <div class="crop-section">
                        <h4>
                            <i class="fas ${getSectionIcon(key)}"></i>
                            ${section.title}
                        </h4>
                        ${Array.isArray(section.content) ? 
                            `<ul>${section.content.map(item => `<li>${item}</li>`).join('')}</ul>` :
                            `<p>${section.content}</p>`
                        }
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Hide modal
function hideModal() {
    const modal = document.getElementById('crop-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Get section icon based on section type
function getSectionIcon(sectionKey) {
    const icons = {
        cultivation: 'fa-seedling',
        varieties: 'fa-list',
        diseases: 'fa-bug',
        harvesting: 'fa-cut',
        economics: 'fa-chart-line'
    };
    return icons[sectionKey] || 'fa-info-circle';
}

// Lazy loading for crop images
function initLazyLoadingForCrops() {
    const cropImages = document.querySelectorAll('.crop-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Create placeholder if image fails to load
                img.addEventListener('error', function() {
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNyb3AgSW1hZ2U8L3RleHQ+PC9zdmc+';
                    this.alt = 'Crop image placeholder';
                });
                
                observer.unobserve(img);
            }
        });
    });
    
    cropImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for external use
window.CropsPage = {
    filterCrops,
    filterCropsByCategory,
    showCropDetails,
    hideModal,
    cropDatabase
};
