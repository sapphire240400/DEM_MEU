    // Variable to store the current tab index
let currentTabMcupaz = 0;

// Function to handle tab navigation and button visibility
function showTabMcupaz(tabIndex) {
    const nextButtonMcupaz = document.querySelector('.next-mcupaz');
    const preButtonMcupaz = document.querySelector('.pre-mcupaz');
    const tabButtonsMcupaz = document.querySelectorAll('.tab-button-mcupaz');
    const numTabsMcupaz = tabButtonsMcupaz.length;

    document.querySelectorAll('.tab-content-mcupaz').forEach(tab => {
        tab.style.display = 'none';  // Hide all tabs
    });

    document.querySelectorAll('.tab-button-mcupaz').forEach(button => {
        button.classList.remove('active-mcupaz');  // Remove the 'active' class from all tab buttons
    });

    // Ocultar 'pre'  tab 1 
    preButtonMcupaz.style.visibility = (tabIndex === 0) ? 'hidden' : 'visible';

    // Ocultar 'next'last tab 
    nextButtonMcupaz.style.visibility = (tabIndex === numTabsMcupaz - 1) ? 'hidden' : 'visible';

    const currentTabMcupazId = `tab${tabIndex + 1}`;
    const currentTabMcupazContent = document.getElementById(currentTabMcupazId);

    currentTabMcupazContent.style.display = 'block';  // Show the selected tab
    document.getElementById(`tabButton${tabIndex + 1}`).classList.add('active-mcupaz');  // Add the 'active' class to the clicked tab button

    currentTabMcupaz = tabIndex;
}

// Boton next tab
function showNextTab() {
    const nextButtonMcupaz = document.querySelector('.next-mcupaz');
    const tabButtonsMcupaz = document.querySelectorAll('.tab-button-mcupaz');
    const numTabsMcupaz = tabButtonsMcupaz.length;

    if (currentTabMcupaz < numTabsMcupaz - 1 && nextButtonMcupaz.style.visibility !== 'hidden') {
        currentTabMcupaz++; 
        showTabMcupaz(currentTabMcupaz);
    }
}

// Boton previous tab
function showPreviousTab() {
    const preButtonMcupaz = document.querySelector('.pre-mcupaz');

    if (currentTabMcupaz > 0 && preButtonMcupaz.style.visibility !== 'hidden') {
        currentTabMcupaz--; 
        showTabMcupaz(currentTabMcupaz);
    }
}

showTabMcupaz(0);