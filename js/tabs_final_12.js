// Variables globales para manejar las pestañas
let currentTab = 0;

// Función para mostrar una pestaña específica
let showTab;

// Verificar el ancho de la ventana y ejecutar el código correspondiente
function checkWindowSize() {
    updateButtonVisibility();
    if (window.innerWidth < 801) { // Ejecutar el código para dispositivos móviles
        console.log("Estás en un dispositivo móvil.");

        // Función para mostrar una pestaña específica en dispositivos móviles
        showTab = function(tabIndex) {
            // Tu lógica para dispositivos móviles aquí
            const tabContents = document.querySelectorAll('.dem-tab-content-curso');
            const tabButtons = document.querySelectorAll('.dem-tab-button-curso');
            tabContents.forEach(tab => tab.style.display = 'none');
            tabButtons.forEach(button => button.classList.remove('active'));
            tabContents[tabIndex].style.display = 'block';
            tabButtons[tabIndex].classList.add('active');
            // Actualizar el índice de la pestaña activa
            currentTab = tabIndex;
            updateButtonVisibility();

            // Encontrar todos los divs 'dem-button-container-subtabs' dentro de los divs 'dem-tab-content-curso'
            const allButtonContainers = document.querySelectorAll('.dem-button-container-subtabs');

            // Iterar sobre cada div 'dem-button-container-subtabs'
            allButtonContainers.forEach(container => {
                // Encontrar todos los botones dentro de este div
                const buttons = container.querySelectorAll('.dem-toggle-button-subtabs');

                // Iterar sobre los botones
                buttons.forEach((btn, index) => {
                    // Si es el primer botón dentro de este div, agregar la clase 'dem-active-button-subtabs', de lo contrario, eliminarla
                    if (index === 0) {
                        btn.classList.add('dem-active-button-subtabs');
                    } else {
                        btn.classList.remove('dem-active-button-subtabs');
                    }
                });
            });

            // Encontrar todos los divs 'dem-content-subtabs' dentro del div 'dem-tab-content-curso' activo
            const activeTabContent = tabContents[tabIndex];
            const allContentSubtabs = activeTabContent.querySelectorAll('.dem-content-subtabs');

            // Iterar sobre cada div 'dem-content-subtabs' dentro del div 'dem-tab-content-curso' activo
            allContentSubtabs.forEach((contentSubtabs, index) => {
                // Si es el primer div 'dem-content-subtabs', agregar la clase 'dem-active-content-subtabs', de lo contrario, eliminarla
                if (index === 0) {
                    contentSubtabs.classList.add('dem-active-content-subtabs');
                } else {
                    contentSubtabs.classList.remove('dem-active-content-subtabs');
                }
            });
        };
    } else {
        // Ejecutar el código para versiones web
        console.log("Estás en una versión web.");

        // Función para mostrar una pestaña específica en la versión web
        showTab = function(event) {
            const button = event.target;
            const buttonIndex = Array.from(button.parentElement.children).indexOf(button);

            const tabContents = document.querySelectorAll('.dem-tab-content-curso');
            const tabButtons = document.querySelectorAll('.dem-tab-button-curso');

            tabContents.forEach(tab => {
                tab.style.display = 'none';
                tab.classList.remove('dem-active-tab-content');
            });
            tabButtons.forEach(button => button.classList.remove('active'));

            const activeTabContent = tabContents[buttonIndex - 1];
            activeTabContent.style.display = 'block';
            activeTabContent.classList.add('dem-active-tab-content');
            tabButtons[buttonIndex - 1].classList.add('active');

            // Encontrar todos los divs 'dem-button-container-subtabs' dentro de los divs 'dem-tab-content-curso'
            const allButtonContainers = document.querySelectorAll('.dem-button-container-subtabs');

            // Remover la clase 'dem-active-button-subtabs' de todos los botones excepto del primer botón
            allButtonContainers.forEach(container => {
                const buttons = container.querySelectorAll('button');
                buttons.forEach((btn, index) => {
                    if (index === 0 && container.parentElement === activeTabContent) {
                        btn.classList.add('dem-active-button-subtabs');
                    } else {
                        btn.classList.remove('dem-active-button-subtabs');
                    }
                });
            });

            // Encontrar todos los divs 'dem-content-subtabs' dentro de los divs 'dem-tab-content-curso'
            const allContentSubtabs = document.querySelectorAll('.dem-content-subtabs');

            // Remover la clase 'dem-active-content-subtabs' de todos los divs 'dem-content-subtabs'
            allContentSubtabs.forEach(contentSubtabs => {
                contentSubtabs.classList.remove('dem-active-content-subtabs');
            });

            // Encontrar el primer div 'dem-content-subtabs' dentro del div 'dem-tab-content-curso' activo
            const contentSubtabs = activeTabContent.querySelector('.dem-content-subtabs');
            if (contentSubtabs) {
                contentSubtabs.classList.add('dem-active-content-subtabs');
            } else {
                console.error("No se encontró ningún div 'dem-content-subtabs' dentro del div 'dem-tab-content-curso'");
            }

            // Actualizar el índice de la pestaña activa
            currentTab = buttonIndex;

            // Actualizar visibilidad de botones previo y siguiente
            updateButtonVisibility();
        };
    }
}

// Asignar la función checkWindowSize al evento de cambio de tamaño de la ventana
window.addEventListener('resize', function(){
    checkWindowSize();
    updateButtonVisibility();
});

// Llamar a checkWindowSize al cargar la página para determinar el estado inicial
checkWindowSize();

// Simular un clic en el primer elemento con la clase dem-tab-button-curso al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const firstTabButton = document.querySelector('.dem-tab-button-curso');
    if (firstTabButton) {
        firstTabButton.click();
    }
});

// Función para manejar la visibilidad de los botones previo y siguiente
function updateButtonVisibility() {
    const prevButton = document.querySelector('.dem-pre');
    const nextButton = document.querySelector('.dem-next');
    const tabButtons = document.querySelectorAll('.dem-tab-button-curso');
    prevButton.style.visibility = currentTab === 0 ? 'hidden' : 'visible';
    
    // Obtener el número total de pestañas
    const totalTabs = tabButtons.length;

    // Ocultar el botón "Siguiente" si la pestaña actual es la última
    nextButton.style.visibility = currentTab === (totalTabs - 1) ? 'hidden' : 'visible';

    // Obtener la pestaña actual
    const currentTabContent = document.querySelector('.dem-tab-wrapper_act .dem-tab-content-curso:nth-child(' + (currentTab + 1) + ')');

    // Verificar si la pestaña actual es la última
    if (currentTab === totalTabs - 1) {
        // Verificar si hay actividad en la última pestaña
        const activityLink = currentTabContent.querySelector('a[target="_blank2"]');
        if (activityLink) {
            activityLink.addEventListener('click', function() {
                //alert("Es la última actividad");
            });
        }
    } else { // Si no es la última pestaña
        // Verificar si hay algún enlace dentro de la pestaña actual
        const activityLink = currentTabContent.querySelector('a[target="_blank2"]');
        if (activityLink) {
            nextButton.style.visibility = 'hidden'; // Ocultar el botón "Siguiente" si hay un enlace dentro de la pestaña actual
            
            // Deshabilitar los botones de las pestañas que están más adelante
            for (let i = currentTab + 1; i < totalTabs; i++) {
                tabButtons[i].style.pointerEvents = 'none'; // Deshabilitar hacer clic en las pestañas siguientes
                tabButtons[i].classList.add('dem-disabled'); // Agregar un estilo para indicar que están deshabilitadas
            }

            // Agregar un controlador de eventos al enlace de actividad
            activityLink.addEventListener('click', function() {
                nextButton.style.visibility = 'visible'; // Mostrar nuevamente el botón "Siguiente" cuando se hace clic en un enlace de actividad
                
                // Habilitar los botones de las pestañas que están más adelante
                for (let i = currentTab + 1; i < totalTabs; i++) {
                    tabButtons[i].style.pointerEvents = 'auto'; // Habilitar hacer clic en las pestañas siguientes
                    tabButtons[i].classList.remove('dem-disabled'); // Quitar el estilo de deshabilitado
                }
            });
        }
    }
}

// Función para mostrar la siguiente pestaña
function showNextTab() {
    const nextButton = document.querySelector('.dem-next');
    if (nextButton.style.visibility !== 'hidden') {
        showTab(currentTab + 1);
    }
}

// Función para mostrar la pestaña anterior
function showPreviousTab() {
    const prevButton = document.querySelector('.dem-pre');
    if (prevButton.style.visibility !== 'hidden') {
        showTab(currentTab - 1);
    }
}

// Event listeners para los botones de las pestañas
document.querySelectorAll('.dem-tab-button-curso').forEach((button, index) => {
    button.addEventListener('click', () => showTab(index));
});

// Mostrar la primera pestaña al cargar la página
showTab(0);
