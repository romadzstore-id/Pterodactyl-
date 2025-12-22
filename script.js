// Main JavaScript for Romadz Store Website

// DOM Elements
const themeCheckbox = document.getElementById('theme-checkbox');
const htmlElement = document.documentElement;
const languageButtons = document.querySelectorAll('.lang-btn');
const rippleContainer = document.getElementById('ripple-container');

// Current language state
let currentLanguage = CONFIG.defaultLanguage;

// Initialize the website
function initWebsite() {
    // Load saved theme preference
    loadThemePreference();
    
    // Load saved language preference
    loadLanguagePreference();
    
    // Generate dynamic content
    generateMarketplaceCards();
    generateExclusiveCard();
    generateChannelCard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update all text content based on current language
    updateTextContent();
}

// Load theme preference from localStorage
function loadThemePreference() {
    const savedTheme = localStorage.getItem('romadz-theme') || CONFIG.defaultTheme;
    
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeCheckbox.checked = true;
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeCheckbox.checked = false;
    }
}

// Load language preference from localStorage
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('romadz-language') || CONFIG.defaultLanguage;
    currentLanguage = savedLanguage;
    
    // Update language buttons
    languageButtons.forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update HTML lang attribute
    htmlElement.lang = currentLanguage;
}

// Generate marketplace cards dynamically
function generateMarketplaceCards() {
    const container = document.querySelector('.groups-section .cards-container');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get current language content
    const groups = CONFIG.content[currentLanguage].marketplaceGroups;
    
    // Create cards for each group
    groups.forEach(group => {
        const card = document.createElement('a');
        card.href = group.link;
        card.target = '_blank';
        card.className = 'group-card';
        
        // Add click animation
        card.addEventListener('click', function(e) {
            createRippleEffect(e);
            animateIcon(this);
        });
        
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <h3 class="card-title">${group.title}</h3>
                    <p class="card-subtitle">${group.subtitle}</p>
                </div>
                <div class="card-badge">
                    <i class="fas fa-fire"></i>
                    <span>${group.badge}</span>
                </div>
            </div>
            <p class="card-description">${group.description}</p>
            <div class="card-footer">
                <div class="card-members">
                    <i class="fas fa-users"></i>
                    <span>${group.members}</span>
                </div>
                <div class="card-join">
                    <span>Join Group</span>
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Generate exclusive card dynamically
function generateExclusiveCard() {
    const container = document.querySelector('.exclusive-section .cards-container');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get current language content
    const group = CONFIG.content[currentLanguage].exclusiveGroup;
    
    const card = document.createElement('a');
    card.href = group.link;
    card.target = '_blank';
    card.className = 'exclusive-card';
    
    // Add click animation
    card.addEventListener('click', function(e) {
        createRippleEffect(e);
        animateIcon(this);
    });
    
    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${group.title}</h3>
                <p class="card-subtitle">${group.subtitle}</p>
            </div>
            <div class="card-badge">
                <i class="fas fa-lock"></i>
                <span>${group.badge}</span>
            </div>
        </div>
        <p class="card-description">${group.description}</p>
        <div class="card-footer">
            <div class="card-members">
                <i class="fas fa-user-shield"></i>
                <span>${group.members}</span>
            </div>
            <div class="card-join">
                <span>Access Group</span>
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `;
    
    container.appendChild(card);
}

// Generate channel card dynamically
function generateChannelCard() {
    const container = document.querySelector('.channel-section .cards-container');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get current language content
    const channel = CONFIG.content[currentLanguage].channel;
    
    const card = document.createElement('a');
    card.href = channel.link;
    card.target = '_blank';
    card.className = 'channel-card';
    
    // Add click animation
    card.addEventListener('click', function(e) {
        createRippleEffect(e);
        animateIcon(this);
    });
    
    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${channel.title}</h3>
                <p class="card-subtitle">${channel.subtitle}</p>
            </div>
            <div class="card-badge">
                <i class="fas fa-verified"></i>
                <span>${channel.badge}</span>
            </div>
        </div>
        <p class="card-description">${channel.description}</p>
        <div class="card-footer">
            <div class="card-members">
                <i class="fas fa-bell"></i>
                <span>${channel.members}</span>
            </div>
            <div class="card-join">
                <span>View Channel</span>
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `;
    
    container.appendChild(card);
}

// Update all text content based on current language
function updateTextContent() {
    const content = CONFIG.content[currentLanguage];
    
    // Update header
    document.getElementById('store-title').textContent = content.storeTitle;
    document.getElementById('store-subtitle').textContent = content.storeSubtitle;
    document.getElementById('store-tagline').textContent = content.storeTagline;
    
    // Update contact section
    document.getElementById('contact-title').textContent = content.contactTitle;
    document.getElementById('whatsapp-title').textContent = content.whatsappTitle;
    document.getElementById('whatsapp-subtitle').textContent = content.whatsappSubtitle;
    document.getElementById('telegram-title').textContent = content.telegramTitle;
    document.getElementById('telegram-subtitle').textContent = content.telegramSubtitle;
    
    // Update marketplace section
    document.getElementById('marketplace-title').textContent = content.marketplaceTitle;
    document.getElementById('marketplace-subtitle').textContent = content.marketplaceSubtitle;
    
    // Update exclusive section
    document.getElementById('exclusive-title').textContent = content.exclusiveTitle;
    document.getElementById('exclusive-badge').textContent = content.exclusiveBadge;
    
    // Update channel section
    document.getElementById('channel-title').textContent = content.channelTitle;
    document.getElementById('channel-subtitle').textContent = content.channelSubtitle;
    
    // Update footer
    document.getElementById('footer-text').textContent = content.footerText;
    document.getElementById('footer-tagline').textContent = content.footerTagline;
    
    // Regenerate dynamic cards with new language
    generateMarketplaceCards();
    generateExclusiveCard();
    generateChannelCard();
}

// Create ripple effect on click
function createRippleEffect(event) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    // Calculate position
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Set ripple styles
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Add ripple to container
    rippleContainer.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animate icon on click
function animateIcon(element) {
    const icon = element.querySelector('.btn-icon i, .card-badge i');
    if (icon) {
        icon.classList.add('icon-animate');
        setTimeout(() => {
            icon.classList.remove('icon-animate');
        }, 500);
    }
    
    // Add button click animation
    element.classList.add('button-clicked');
    setTimeout(() => {
        element.classList.remove('button-clicked');
    }, 400);
}

// Toggle theme
function toggleTheme() {
    if (themeCheckbox.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('romadz-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('romadz-theme', 'light');
    }
}

// Change language
function changeLanguage(lang) {
    if (lang === currentLanguage) return;
    
    // Update current language
    currentLanguage = lang;
    
    // Update language buttons
    languageButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Save to localStorage
    localStorage.setItem('romadz-language', lang);
    
    // Update HTML lang attribute
    htmlElement.lang = lang;
    
    // Update all content
    updateTextContent();
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    themeCheckbox.addEventListener('change', toggleTheme);
    
    // Language toggle
    languageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });
    
    // Add click animations to all interactive elements
    const interactiveElements = document.querySelectorAll('.action-btn, .group-card, .exclusive-card, .channel-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(e);
            animateIcon(this);
        });
    });
}

// Add some interactive animations on page load
function addPageLoadAnimations() {
    // Add subtle fade-in animation to elements
    const elementsToAnimate = document.querySelectorAll('.profile-section, .contact-section, .groups-section, .exclusive-section, .channel-section');
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWebsite();
    
    // Add page load animations after a short delay
    setTimeout(addPageLoadAnimations, 300);
});