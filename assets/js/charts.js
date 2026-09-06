// Charts JavaScript for AgriHort Connect
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
});

function initCharts() {
    // Initialize impact chart on homepage
    initImpactChart();
    
    console.log('Charts initialized successfully!');
}

// Impact Chart for Homepage
function initImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;

    // Sample data for community impact
    const impactData = {
        labels: ['Farmers Helped', 'Crops Improved', 'Problems Solved', 'Training Sessions'],
        datasets: [{
            label: 'Community Impact',
            data: [500, 150, 320, 85],
            backgroundColor: [
                'rgba(116, 179, 66, 0.8)',
                'rgba(45, 80, 22, 0.8)',
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 143, 0, 0.8)'
            ],
            borderColor: [
                'rgba(116, 179, 66, 1)',
                'rgba(45, 80, 22, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(255, 143, 0, 1)'
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'doughnut',
        data: impactData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            family: 'Poppins'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000
            }
        }
    };

    new Chart(ctx, config);
}

// Crop Growth Chart (for farmers dashboard)
function initCropGrowthChart(canvasId, cropData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const config = {
        type: 'line',
        data: {
            labels: cropData.labels,
            datasets: [{
                label: 'Crop Growth Progress',
                data: cropData.values,
                borderColor: 'rgba(116, 179, 66, 1)',
                backgroundColor: 'rgba(116, 179, 66, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(116, 179, 66, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Poppins'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Poppins'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(45, 80, 22, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(116, 179, 66, 1)',
                    borderWidth: 1
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    };

    return new Chart(ctx, config);
}

// Profit Analysis Chart
function initProfitChart(canvasId, profitData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const config = {
        type: 'bar',
        data: {
            labels: profitData.labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: profitData.revenue,
                    backgroundColor: 'rgba(116, 179, 66, 0.8)',
                    borderColor: 'rgba(116, 179, 66, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expenses',
                    data: profitData.expenses,
                    backgroundColor: 'rgba(255, 143, 0, 0.8)',
                    borderColor: 'rgba(255, 143, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Profit',
                    data: profitData.profit,
                    backgroundColor: 'rgba(45, 80, 22, 0.8)',
                    borderColor: 'rgba(45, 80, 22, 1)',
                    borderWidth: 1
                }
            ]
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
                        },
                        font: {
                            family: 'Poppins'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Poppins'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: {
                            family: 'Poppins'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(45, 80, 22, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    };

    return new Chart(ctx, config);
}

// Survey Results Chart
function initSurveyChart(canvasId, surveyData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const config = {
        type: 'horizontalBar',
        data: {
            labels: surveyData.labels,
            datasets: [{
                label: 'Responses',
                data: surveyData.values,
                backgroundColor: [
                    'rgba(116, 179, 66, 0.8)',
                    'rgba(45, 80, 22, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(255, 143, 0, 0.8)',
                    'rgba(139, 69, 19, 0.8)'
                ],
                borderColor: [
                    'rgba(116, 179, 66, 1)',
                    'rgba(45, 80, 22, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(255, 143, 0, 1)',
                    'rgba(139, 69, 19, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Poppins'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: 'Poppins'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(45, 80, 22, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    };

    return new Chart(ctx, config);
}

// Weather Chart (for future implementation)
function initWeatherChart(canvasId, weatherData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const config = {
        type: 'line',
        data: {
            labels: weatherData.labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: weatherData.temperature,
                    borderColor: 'rgba(255, 143, 0, 1)',
                    backgroundColor: 'rgba(255, 143, 0, 0.1)',
                    yAxisID: 'y'
                },
                {
                    label: 'Humidity (%)',
                    data: weatherData.humidity,
                    borderColor: 'rgba(116, 179, 66, 1)',
                    backgroundColor: 'rgba(116, 179, 66, 0.1)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Days'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    };

    return new Chart(ctx, config);
}

// Export functions for use in other scripts
window.ChartsModule = {
    initImpactChart,
    initCropGrowthChart,
    initProfitChart,
    initSurveyChart,
    initWeatherChart
};

