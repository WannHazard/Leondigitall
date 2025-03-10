/**
 * main.js - Funcionalidades JavaScript para Leon Digital
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initMobileMenu();
    updateCurrentYear();
    initScrollAnimations();
});

/**
 * Inicializa la funcionalidad del menú móvil
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navMobile = document.querySelector('.nav-mobile');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Abrir menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMobile.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    }

    // Cerrar menú móvil
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            navMobile.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    }

    // Cerrar menú al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    });
}

/**
 * Actualiza el año actual en el footer
 */
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Inicializa las animaciones al hacer scroll
 */
function initScrollAnimations() {
    // Seleccionar todos los elementos que deberían animarse al hacer scroll
    const animatedElements = document.querySelectorAll('.service-card, .ai-feature, .section-header');
    
    // Configurar el observador de intersección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target); // Dejar de observar después de animar
            }
        });
    }, {
        threshold: 0.1, // Activar cuando al menos 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Margen negativo para activar un poco antes
    });

    // Observar cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Validación simple de formulario de contacto
 * (Se implementará cuando se cree la página de contacto)
 */
function validateContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validación de email
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                event.preventDefault();
                alert('Por favor, completa correctamente todos los campos requeridos.');
            }
        });
    }
}