// Farmers Portal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initFarmersPortal();
});

// Global state
let currentUser = null;
let farmerData = {
    crops: [],
    problems: [],
    profits: []
};

function initFarmersPortal() {
    initAuthForms();
    initDashboard();
    initModals();
    checkAuthState();
    
    console.log('Farmers Portal initialized successfully!');
}

// Authentication Forms
function initAuthForms() {
    const registerForm = document.getElementById('farmer-register-form');
    const loginForm = document.getElementById('farmer-login-form');
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    const joinPortalBtn = document.getElementById('join-portal-btn');
    const demoBtn = document.getElementById('demo-btn');

    // Form switching
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showRegisterForm();
        });
    }

    if (joinPortalBtn) {
        joinPortalBtn.addEventListener('click', function() {
            scrollToAuthSection();
        });
    }

    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            loginWithDemo();
        });
    }

    // Form submissions
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function showLoginForm() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    if (registerForm) registerForm.classList.add('hidden');
    if (loginForm) loginForm.classList.remove('hidden');
}

function showRegisterForm() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) loginForm.classList.add('hidden');
    if (registerForm) registerForm.classList.remove('hidden');
}

function scrollToAuthSection() {
    const authSection = document.getElementById('auth-section');
    if (authSection) {
        authSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    
    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Simulate registration
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Create user account
        const newUser = {
            id: Date.now(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            state: userData.state,
            district: userData.district,
            farmSize: userData.farmSize,
            crops: userData.crops ? userData.crops.split(',').map(c => c.trim()) : [],
            joinDate: new Date().toISOString()
        };
        
        // Save to localStorage (in real app, this would be sent to backend)
        localStorage.setItem('farmerUser', JSON.stringify(newUser));
        
        showNotification('Account created successfully! Welcome to AgriHort Connect!', 'success');
        
        // Auto login
        currentUser = newUser;
        showDashboard();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData);
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Check if user exists (in real app, this would be backend validation)
        const savedUser = localStorage.getItem('farmerUser');
        
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user.email === loginData.email) {
                currentUser = user;
                showNotification('Login successful! Welcome back!', 'success');
                showDashboard();
            } else {
                showNotification('Invalid email or password', 'error');
            }
        } else {
            showNotification('No account found. Please register first.', 'error');
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function loginWithDemo() {
    // Create demo user
    const demoUser = {
        id: 'demo',
        firstName: 'Demo',
        lastName: 'Farmer',
        email: 'demo@farmer.com',
        phone: '+91 98765 43210',
        state: 'maharashtra',
        district: 'Pune',
        farmSize: 5.5,
        crops: ['Tomato', 'Onion', 'Grapes'],
        joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year ago
    };
    
    currentUser = demoUser;
    loadDemoData();
    showNotification('Welcome to the demo! Explore all features.', 'info');
    showDashboard();
}

function loadDemoData() {
    // Demo crops data with enhanced fields
    farmerData.crops = [
        {
            id: 1,
            name: 'Tomato',
            variety: 'Hybrid',
            category: 'vegetables',
            status: 'sold',
            plantingDate: '2024-01-15',
            expectedHarvest: '2024-04-15',
            actualHarvestDate: '2024-04-12',
            areaPlanted: 2.0,
            investment: 25000,
            harvestQuantity: 4000,
            sellingPrice: 15,
            totalRevenue: 60000,
            additionalExpenses: 5000,
            netProfit: 30000,
            profitPerAcre: 15000,
            notes: 'Excellent yield this season, sold at premium price',
            createdDate: '2024-01-10T10:00:00.000Z'
        },
        {
            id: 2,
            name: 'Onion',
            variety: 'Red Onion',
            category: 'vegetables',
            status: 'ready-harvest',
            plantingDate: '2024-02-01',
            expectedHarvest: '2024-06-01',
            areaPlanted: 1.5,
            investment: 18000,
            notes: 'Ready for harvest, good bulb formation observed',
            createdDate: '2024-01-25T14:30:00.000Z'
        },
        {
            id: 3,
            name: 'Grapes',
            variety: 'Thompson Seedless',
            category: 'fruits',
            status: 'harvested',
            plantingDate: '2023-12-01',
            expectedHarvest: '2024-03-01',
            actualHarvestDate: '2024-02-28',
            areaPlanted: 2.0,
            investment: 45000,
            harvestQuantity: 6000,
            sellingPrice: 25,
            totalRevenue: 150000,
            additionalExpenses: 8000,
            netProfit: 97000,
            profitPerAcre: 48500,
            notes: 'Premium quality grapes, excellent market response',
            createdDate: '2023-11-20T09:15:00.000Z'
        },
        {
            id: 4,
            name: 'Marigold',
            variety: 'African Marigold',
            category: 'flowers',
            status: 'flowering',
            plantingDate: '2024-03-01',
            expectedHarvest: '2024-05-15',
            areaPlanted: 0.5,
            investment: 8000,
            notes: 'Beautiful flowers, high demand for festivals',
            createdDate: '2024-02-25T16:45:00.000Z'
        },
        {
            id: 5,
            name: 'Basil',
            variety: 'Sweet Basil',
            category: 'herbs',
            status: 'growing',
            plantingDate: '2024-03-15',
            expectedHarvest: '2024-05-30',
            areaPlanted: 0.25,
            investment: 3000,
            notes: 'Organic cultivation, good for essential oil extraction',
            createdDate: '2024-03-10T11:20:00.000Z'
        }
    ];
    
    // Demo problems data
    farmerData.problems = [
        {
            id: 1,
            title: 'Leaf Curl in Tomato',
            description: 'Noticed leaf curling in tomato plants. Leaves are turning yellow and curling upwards.',
            crop: 'Tomato',
            date: '2024-01-20',
            status: 'resolved',
            solution: 'Applied recommended fungicide. Problem resolved in 10 days.'
        },
        {
            id: 2,
            title: 'White Fly Attack',
            description: 'White flies are attacking the grape vines. Need immediate solution.',
            crop: 'Grapes',
            date: '2024-02-05',
            status: 'open'
        }
    ];
}

// Dashboard Functions
function initDashboard() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function showDashboard() {
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const authBtn = document.getElementById('auth-btn');
    const authText = document.getElementById('auth-text');
    
    if (authSection) authSection.classList.add('hidden');
    if (dashboardSection) dashboardSection.classList.remove('hidden');
    
    // Update nav button
    if (authBtn && authText) {
        authText.textContent = 'Dashboard';
        authBtn.onclick = () => {
            dashboardSection.scrollIntoView({ behavior: 'smooth' });
        };
    }
    
    updateDashboard();
    loadDashboardData();
}

function updateDashboard() {
    if (!currentUser) return;
    
    // Update welcome message
    const farmerName = document.getElementById('farmer-name');
    if (farmerName) {
        farmerName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    }
    
    // Update stats
    updateDashboardStats();
}

function updateDashboardStats() {
    const totalCropsEl = document.getElementById('total-crops');
    const totalProfitEl = document.getElementById('total-profit');
    const activeProblemsEl = document.getElementById('active-problems');
    
    const activeCrops = farmerData.crops.filter(crop => crop.status === 'growing').length;
    const totalProfit = farmerData.crops.reduce((sum, crop) => sum + (crop.profit || 0), 0);
    const activeProblems = farmerData.problems.filter(problem => problem.status === 'open').length;
    
    if (totalCropsEl) totalCropsEl.textContent = activeCrops;
    if (totalProfitEl) totalProfitEl.textContent = `₹${totalProfit.toLocaleString()}`;
    if (activeProblemsEl) activeProblemsEl.textContent = activeProblems;
}

function loadDashboardData() {
    loadCropsData();
    loadProfitData();
    loadProblemsData();
    loadCommunityData();
}

function switchTab(tabName) {
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    
    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
    
    // Load specific data if needed
    switch(tabName) {
        case 'crops':
            loadCropsData();
            break;
        case 'profits':
            loadProfitData();
            break;
        case 'problems':
            loadProblemsData();
            break;
        case 'community':
            loadCommunityData();
            break;
    }
}

function loadCropsData() {
    const cropsList = document.getElementById('crops-list');
    if (!cropsList) return;
    
    if (farmerData.crops.length === 0) {
        cropsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-seedling"></i>
                <h3>No crops added yet</h3>
                <p>Start by adding your first crop to track its progress</p>
                <button class="btn btn-primary" onclick="openAddCropModal()">
                    <i class="fas fa-plus"></i> Add Your First Crop
                </button>
            </div>
        `;
        return;
    }
    
    const cropsHTML = farmerData.crops.map(crop => `
        <div class="crop-item">
            <div class="crop-item-header">
                <div class="crop-title-section">
                    <h4>${crop.name} ${crop.variety ? `(${crop.variety})` : ''}</h4>
                    <span class="crop-category">${getCategoryIcon(crop.category)} ${formatCategoryName(crop.category)}</span>
                </div>
                <span class="crop-status ${getStatusClass(crop.status)}">${formatStatusName(crop.status)}</span>
            </div>
            <div class="crop-item-details">
                <div class="detail-item">
                    <span class="detail-label">Planting Date</span>
                    <span class="detail-value">${formatDate(crop.plantingDate)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Area</span>
                    <span class="detail-value">${crop.areaPlanted} acres</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Investment</span>
                    <span class="detail-value">₹${crop.investment.toLocaleString()}</span>
                </div>
                ${crop.expectedHarvest ? `
                <div class="detail-item">
                    <span class="detail-label">${crop.actualHarvestDate ? 'Expected Harvest' : 'Expected Harvest'}</span>
                    <span class="detail-value">${formatDate(crop.expectedHarvest)}</span>
                </div>
                ` : ''}
                ${crop.actualHarvestDate ? `
                <div class="detail-item">
                    <span class="detail-label">Actual Harvest</span>
                    <span class="detail-value">${formatDate(crop.actualHarvestDate)}</span>
                </div>
                ` : ''}
                ${crop.harvestQuantity ? `
                <div class="detail-item">
                    <span class="detail-label">Harvest Quantity</span>
                    <span class="detail-value">${crop.harvestQuantity} kg</span>
                </div>
                ` : ''}
                ${crop.sellingPrice ? `
                <div class="detail-item">
                    <span class="detail-label">Selling Price</span>
                    <span class="detail-value">₹${crop.sellingPrice}/kg</span>
                </div>
                ` : ''}
                ${crop.totalRevenue ? `
                <div class="detail-item">
                    <span class="detail-label">Total Revenue</span>
                    <span class="detail-value">₹${crop.totalRevenue.toLocaleString()}</span>
                </div>
                ` : ''}
                ${crop.netProfit !== undefined ? `
                <div class="detail-item">
                    <span class="detail-label">Net Profit</span>
                    <span class="detail-value ${crop.netProfit >= 0 ? 'profit-positive' : 'profit-negative'}">
                        ₹${crop.netProfit.toLocaleString()}
                    </span>
                </div>
                ` : ''}
                ${crop.profitPerAcre !== undefined ? `
                <div class="detail-item">
                    <span class="detail-label">Profit per Acre</span>
                    <span class="detail-value ${crop.profitPerAcre >= 0 ? 'profit-positive' : 'profit-negative'}">
                        ₹${crop.profitPerAcre.toLocaleString()}/acre
                    </span>
                </div>
                ` : ''}
            </div>
            ${crop.notes ? `<p class="crop-notes"><i class="fas fa-sticky-note"></i> ${crop.notes}</p>` : ''}
            <div class="crop-actions">
                <button class="btn btn-secondary btn-sm" onclick="editCrop(${crop.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm" onclick="updateCropStatus(${crop.id})">
                    <i class="fas fa-sync"></i> Update Status
                </button>
            </div>
        </div>
    `).join('');
    
    cropsList.innerHTML = cropsHTML;
}

// Helper functions for crop display
function getCategoryIcon(category) {
    const icons = {
        fruits: '🍎',
        vegetables: '🥕',
        flowers: '🌸',
        herbs: '🌿',
        cereals: '🌾',
        pulses: '🫘',
        other: '🌱'
    };
    return icons[category] || '🌱';
}

function formatCategoryName(category) {
    const names = {
        fruits: 'Fruits',
        vegetables: 'Vegetables',
        flowers: 'Flowers',
        herbs: 'Herbs & Spices',
        cereals: 'Cereals',
        pulses: 'Pulses',
        other: 'Other'
    };
    return names[category] || category;
}

function formatStatusName(status) {
    const names = {
        planning: 'Planning',
        planted: 'Recently Planted',
        growing: 'Growing',
        flowering: 'Flowering',
        fruiting: 'Fruiting',
        'ready-harvest': 'Ready for Harvest',
        harvesting: 'Currently Harvesting',
        harvested: 'Harvested',
        sold: 'Sold'
    };
    return names[status] || status;
}

function getStatusClass(status) {
    const classes = {
        planning: 'planning',
        planted: 'planted',
        growing: 'growing',
        flowering: 'flowering',
        fruiting: 'fruiting',
        'ready-harvest': 'ready-harvest',
        harvesting: 'harvesting',
        harvested: 'harvested',
        sold: 'sold'
    };
    return classes[status] || 'growing';
}

// Placeholder functions for future implementation
function editCrop(cropId) {
    showNotification('Edit crop feature coming soon!', 'info');
}

function updateCropStatus(cropId) {
    showNotification('Update crop status feature coming soon!', 'info');
}

function loadProfitData() {
    const totalRevenueEl = document.getElementById('total-revenue');
    const totalExpensesEl = document.getElementById('total-expenses');
    const netProfitEl = document.getElementById('net-profit');
    
    const totalRevenue = farmerData.crops.reduce((sum, crop) => sum + (crop.revenue || 0), 0);
    const totalExpenses = farmerData.crops.reduce((sum, crop) => sum + crop.investment, 0);
    const netProfit = totalRevenue - totalExpenses;
    
    if (totalRevenueEl) totalRevenueEl.textContent = `₹${totalRevenue.toLocaleString()}`;
    if (totalExpensesEl) totalExpensesEl.textContent = `₹${totalExpenses.toLocaleString()}`;
    if (netProfitEl) netProfitEl.textContent = `₹${netProfit.toLocaleString()}`;
    
    // Load profit chart
    loadProfitChart();
}

function loadProfitChart() {
    const ctx = document.getElementById('profit-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.profitChart) {
        window.profitChart.destroy();
    }
    
    const cropNames = farmerData.crops.map(crop => crop.name);
    const profits = farmerData.crops.map(crop => crop.profit || 0);
    
    window.profitChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cropNames,
            datasets: [{
                label: 'Profit (₹)',
                data: profits,
                backgroundColor: 'rgba(116, 179, 66, 0.8)',
                borderColor: 'rgba(116, 179, 66, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Profit: ₹' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function loadProblemsData() {
    const problemsList = document.getElementById('problems-list');
    if (!problemsList) return;
    
    if (farmerData.problems.length === 0) {
        problemsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>No problems reported</h3>
                <p>Great! Your crops seem to be healthy. Report any issues you encounter.</p>
            </div>
        `;
        return;
    }
    
    const problemsHTML = farmerData.problems.map(problem => `
        <div class="problem-item">
            <div class="problem-header">
                <h5 class="problem-title">${problem.title}</h5>
                <span class="problem-date">${formatDate(problem.date)}</span>
            </div>
            <p class="problem-description">${problem.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <span class="problem-status ${problem.status}">${problem.status}</span>
                <span style="color: var(--gray); font-size: 0.875rem;">Crop: ${problem.crop}</span>
            </div>
            ${problem.solution ? `<p style="margin-top: 0.5rem; color: var(--accent-green); font-weight: 500;">Solution: ${problem.solution}</p>` : ''}
        </div>
    `).join('');
    
    problemsList.innerHTML = problemsHTML;
}

function loadCommunityData() {
    const communityPosts = document.getElementById('community-posts');
    if (!communityPosts) return;
    
    // Sample community posts
    const posts = [
        {
            id: 1,
            author: 'Rajesh Kumar',
            time: '2 hours ago',
            content: 'Just harvested my tomato crop! Got excellent yield this season. The hybrid variety worked really well in our climate.',
            likes: 12,
            comments: 3
        },
        {
            id: 2,
            author: 'Priya Sharma',
            time: '5 hours ago',
            content: 'Has anyone tried organic fertilizers for grapes? Looking for recommendations for next season.',
            likes: 8,
            comments: 7
        },
        {
            id: 3,
            author: 'Amit Patel',
            time: '1 day ago',
            content: 'Weather forecast shows rain next week. Make sure to cover your crops if needed. Stay safe everyone!',
            likes: 25,
            comments: 12
        }
    ];
    
    const postsHTML = posts.map(post => `
        <div class="community-post">
            <div class="post-header">
                <div class="post-avatar">${post.author.split(' ').map(n => n[0]).join('')}</div>
                <div class="post-info">
                    <h5>${post.author}</h5>
                    <span class="post-time">${post.time}</span>
                </div>
            </div>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button class="post-action">
                    <i class="fas fa-heart"></i> ${post.likes}
                </button>
                <button class="post-action">
                    <i class="fas fa-comment"></i> ${post.comments}
                </button>
                <button class="post-action">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
    `).join('');
    
    communityPosts.innerHTML = postsHTML;
}

function handleLogout() {
    currentUser = null;
    farmerData = { crops: [], problems: [], profits: [] };
    
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const authBtn = document.getElementById('auth-btn');
    const authText = document.getElementById('auth-text');
    
    if (authSection) authSection.classList.remove('hidden');
    if (dashboardSection) dashboardSection.classList.add('hidden');
    
    // Reset nav button
    if (authBtn && authText) {
        authText.textContent = 'Login';
        authBtn.onclick = () => {
            authSection.scrollIntoView({ behavior: 'smooth' });
        };
    }
    
    showNotification('Logged out successfully', 'info');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal Functions
function initModals() {
    const addCropModal = document.getElementById('add-crop-modal');
    const addCropBtn = document.getElementById('add-crop-btn');
    const addCropClose = document.getElementById('add-crop-close');
    const addCropForm = document.getElementById('add-crop-form');
    
    if (addCropBtn) {
        addCropBtn.addEventListener('click', openAddCropModal);
    }
    
    if (addCropClose) {
        addCropClose.addEventListener('click', closeAddCropModal);
    }
    
    if (addCropModal) {
        addCropModal.addEventListener('click', function(e) {
            if (e.target === addCropModal) {
                closeAddCropModal();
            }
        });
    }
    
    if (addCropForm) {
        addCropForm.addEventListener('submit', handleAddCrop);
        
        // Add event listeners for dynamic form behavior
        initCropFormDynamics();
    }
}

function initCropFormDynamics() {
    const cropStatus = document.getElementById('crop-status');
    const harvestDetails = document.getElementById('harvest-details');
    const harvestQuantity = document.getElementById('harvest-quantity');
    const sellingPrice = document.getElementById('selling-price');
    const totalRevenueInput = document.getElementById('total-revenue-input');
    
    // Show/hide harvest details based on crop status
    if (cropStatus) {
        cropStatus.addEventListener('change', function() {
            const status = this.value;
            const showHarvestDetails = ['harvested', 'sold'].includes(status);
            
            if (harvestDetails) {
                harvestDetails.style.display = showHarvestDetails ? 'block' : 'none';
                
                // Make harvest fields required for harvested/sold crops
                const harvestInputs = harvestDetails.querySelectorAll('input[type="number"], input[type="date"]');
                harvestInputs.forEach(input => {
                    if (showHarvestDetails && ['actualHarvestDate', 'harvestQuantity', 'sellingPrice'].includes(input.name)) {
                        input.setAttribute('required', '');
                    } else {
                        input.removeAttribute('required');
                    }
                });
            }
        });
    }
    
    // Auto-calculate total revenue
    if (harvestQuantity && sellingPrice && totalRevenueInput) {
        const calculateRevenue = () => {
            const quantity = parseFloat(harvestQuantity.value) || 0;
            const price = parseFloat(sellingPrice.value) || 0;
            const revenue = quantity * price;
            totalRevenueInput.value = revenue > 0 ? revenue.toFixed(2) : '';
        };
        
        harvestQuantity.addEventListener('input', calculateRevenue);
        sellingPrice.addEventListener('input', calculateRevenue);
    }
}

function openAddCropModal() {
    const modal = document.getElementById('add-crop-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeAddCropModal() {
    const modal = document.getElementById('add-crop-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('add-crop-form');
        if (form) form.reset();
    }
}

function handleAddCrop(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const cropData = Object.fromEntries(formData);
    
    // Create new crop with enhanced data
    const newCrop = {
        id: Date.now(),
        name: cropData.cropName,
        variety: cropData.variety || '',
        category: cropData.cropCategory,
        status: cropData.cropStatus,
        plantingDate: cropData.plantingDate,
        expectedHarvest: cropData.expectedHarvest || '',
        areaPlanted: parseFloat(cropData.areaPlanted),
        investment: parseInt(cropData.investment),
        notes: cropData.notes || '',
        createdDate: new Date().toISOString()
    };
    
    // Add harvest data if crop is harvested/sold
    if (['harvested', 'sold'].includes(cropData.cropStatus)) {
        newCrop.actualHarvestDate = cropData.actualHarvestDate;
        newCrop.harvestQuantity = parseFloat(cropData.harvestQuantity) || 0;
        newCrop.sellingPrice = parseFloat(cropData.sellingPrice) || 0;
        newCrop.totalRevenue = parseFloat(cropData.totalRevenue) || 0;
        newCrop.additionalExpenses = parseFloat(cropData.additionalExpenses) || 0;
        newCrop.netProfit = newCrop.totalRevenue - newCrop.investment - newCrop.additionalExpenses;
        newCrop.profitPerAcre = newCrop.netProfit / newCrop.areaPlanted;
    }
    
    // Add to farmer data
    farmerData.crops.push(newCrop);
    
    // Update dashboard
    updateDashboardStats();
    loadCropsData();
    
    // Close modal
    closeAddCropModal();
    
    showNotification(`${cropData.cropName} added successfully!`, 'success');
    
    // Switch to crops tab
    switchTab('crops');
}

// Utility Functions
function checkAuthState() {
    const savedUser = localStorage.getItem('farmerUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        // Don't auto-login, let user choose
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
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
window.FarmersPortal = {
    openAddCropModal,
    closeAddCropModal,
    switchTab,
    loginWithDemo,
    handleLogout
};
