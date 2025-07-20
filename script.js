// Page state management
let currentPage = 1;
const totalPages = 5;
let isInKYCFlow = false;

// Page navigation data
const pageData = {
    1: { title: "Get Started", nextText: "Get Started →" },
    2: { title: "Representative Info", nextText: "Continue →" },
    3: { title: "Ownership Details", nextText: "Continue →" },
    4: { title: "Business Profile", nextText: "Continue →" },
    5: { title: "Complete", nextText: "Back to Dashboard" }
};

// Navigation tab management
function showEmailTab() {
    hideAllScreens();
    document.getElementById('email-entry-screen').classList.remove('hidden');
    setActiveTab('email-tab');
}

function showDashboardTab() {
    hideAllScreens();
    document.getElementById('dashboard-screen').classList.remove('hidden');
    setActiveTab('dashboard-tab');
}

function showKYCTab() {
    hideAllScreens();
    document.getElementById('kyc-flow-container').classList.remove('hidden');
    setActiveTab('kyc-tab');
    
    // Initialize KYC flow if not already done
    if (!isInKYCFlow) {
        isInKYCFlow = true;
        currentPage = 2; // Start from page 2 (Representative Information)
        updateProgressBar();
        updateNavigation();
        showPage(currentPage);
    }
}

function hideAllScreens() {
    document.getElementById('email-entry-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('kyc-flow-container').classList.add('hidden');
}

function setActiveTab(activeTabId) {
    document.querySelectorAll('.nav-item').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(activeTabId).classList.add('active');
}

// Email entry screen to KYC flow transition
function startKYCFlow() {
    showKYCTab();
}

// Dashboard modal functions
function closeDashboardModal() {
    const modal = document.querySelector('.dashboard-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showDashboardModal() {
    const modal = document.querySelector('.dashboard-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Start with email tab active by default
    showEmailTab();
});

// Flip card functionality
function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
}

// Page navigation functions
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateProgressBar();
        updateNavigation();
    } else if (currentPage === totalPages) {
        // Handle final action (back to dashboard)
        backToDashboard();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateProgressBar();
        updateNavigation();
    }
}

function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show current page
    const currentPageElement = document.getElementById(`page-${getPageId(pageNumber)}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('hidden');
    }
}

function getPageId(pageNumber) {
    const pageIds = {
        1: 'get-started',
        2: 'representative',
        3: 'ownership',
        4: 'business',
        5: 'next-steps'
    };
    return pageIds[pageNumber] || 'get-started';
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const progressPercentage = (currentPage / totalPages) * 100;
    
    progressFill.style.width = progressPercentage + '%';
    progressText.textContent = `Step ${currentPage} of ${totalPages}`;
}

function updateNavigation() {
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Update back button
    if (currentPage <= 1) {
        backBtn.disabled = true;
        backBtn.textContent = '← Back';
    } else {
        backBtn.disabled = false;
        backBtn.textContent = '← Back';
    }
    
    // Update next button
    if (currentPage < totalPages) {
        nextBtn.textContent = pageData[currentPage].nextText;
        nextBtn.classList.remove('secondary');
        nextBtn.classList.add('primary');
    } else {
        nextBtn.textContent = 'Back to Dashboard';
        nextBtn.classList.remove('primary');
        nextBtn.classList.add('secondary');
    }
}

// Field editing functionality
function editField(fieldId) {
    const displayElement = document.getElementById(fieldId + '-display');
    const editElement = document.getElementById(fieldId + '-edit');
    
    // Hide display, show edit
    displayElement.classList.add('hidden');
    editElement.classList.remove('hidden');
    
    // Focus on the input
    const input = editElement.querySelector('input, textarea');
    if (input) {
        input.focus();
        input.select();
    }
}

function saveField(fieldId) {
    const displayElement = document.getElementById(fieldId + '-display');
    const editElement = document.getElementById(fieldId + '-edit');
    const input = editElement.querySelector('input, textarea');
    const valueElement = displayElement.querySelector('.field-value');
    
    // Update the display value
    if (input.tagName === 'TEXTAREA') {
        valueElement.innerHTML = input.value.replace(/\n/g, '<br>');
    } else {
        valueElement.textContent = input.value;
    }
    
    // Show updated animation
    displayElement.classList.add('updated-animation');
    setTimeout(() => {
        displayElement.classList.remove('updated-animation');
    }, 600);
    
    // Hide edit, show display
    editElement.classList.add('hidden');
    displayElement.classList.remove('hidden');
    
    // Show brief "Updated!" message
    showUpdateMessage(displayElement);
}

function cancelEdit(fieldId) {
    const displayElement = document.getElementById(fieldId + '-display');
    const editElement = document.getElementById(fieldId + '-edit');
    const input = editElement.querySelector('input, textarea');
    const valueElement = displayElement.querySelector('.field-value');
    
    // Reset input to original value
    if (input.tagName === 'TEXTAREA') {
        input.value = valueElement.innerHTML.replace(/<br>/g, '\n');
    } else {
        input.value = valueElement.textContent;
    }
    
    // Hide edit, show display
    editElement.classList.add('hidden');
    displayElement.classList.remove('hidden');
}

function showUpdateMessage(element) {
    // Create and show a temporary "Updated!" message
    const message = document.createElement('div');
    message.textContent = 'Updated!';
    message.style.cssText = `
        position: absolute;
        background: #10b981;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
        top: -30px;
        right: 0;
        z-index: 1000;
        animation: updateMessage 2s ease;
    `;
    
    element.style.position = 'relative';
    element.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Document modal functionality (placeholder)
function showDocumentModal() {
    alert('Document management modal would open here. This is a placeholder for the actual document upload/review functionality.');
}

// Final action
function backToDashboard() {
    // In a real application, this would navigate to the dashboard
    alert('Thank you for completing the verification process! Returning to dashboard...');
    
    // For demo purposes, reset to first page
    currentPage = 1;
    showPage(currentPage);
    updateProgressBar();
    updateNavigation();
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Allow Enter to go to next page when not editing
    if (e.key === 'Enter' && !e.target.classList.contains('field-input')) {
        if (currentPage < totalPages) {
            nextPage();
        }
    }
    
    // Allow Escape to cancel edits
    if (e.key === 'Escape' && e.target.classList.contains('field-input')) {
        const editElement = e.target.closest('.field-edit');
        if (editElement) {
            const fieldId = editElement.id.replace('-edit', '');
            cancelEdit(fieldId);
        }
    }
    
    // Allow arrow keys for navigation when not editing
    if (!e.target.classList.contains('field-input')) {
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            previousPage();
        } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            nextPage();
        }
    }
});

// Add CSS animation for update message
const style = document.createElement('style');
style.textContent = `
    @keyframes updateMessage {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        20% {
            opacity: 1;
            transform: translateY(0);
        }
        80% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
        currentPage = e.state.page;
        showPage(currentPage);
        updateProgressBar();
        updateNavigation();
    }
});

// Update browser history when navigating
function updateHistory() {
    const state = { page: currentPage };
    const title = `KYC Verification - ${pageData[currentPage].title}`;
    history.pushState(state, title, `#page-${currentPage}`);
}

// Auto-save functionality (placeholder)
function autoSave() {
    // In a real application, this would save the current state
    console.log('Auto-saving current state...');
}

// Set up auto-save interval
setInterval(autoSave, 30000); // Auto-save every 30 seconds 