// ===== MAIN JAVASCRIPT FILE =====

// Global Variables
let isLoading = false;

// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setInitialVideoPlaybackRate('light');
});

function setInitialVideoPlaybackRate(theme) {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;
    
    if (theme === 'dark') {
        heroVideo.playbackRate = 1;
    }
}

function setInitialHeroVideo(theme) {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;
    
    if (theme === 'dark') {
        heroVideo.src = 'assets/images/noche.mp4';
        heroVideo.playbackRate = 1;
        heroVideo.load();
        heroVideo.play().catch(() => {});
    }
}

function initializeApp() {
    setupEventListeners();
    setupHeaderScroll();
    setupSmoothScrolling();
    setupMobileMenu();
    setupModals();
    setupFormValidation();
    setupThemeToggle();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Window events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Navigation events
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Form events
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('input', handleFormInput);
}

// ===== HEADER FUNCTIONALITY =====
function setupHeaderScroll() {
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            // Header dinámico: se oculta al bajar, aparece al subir
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Bajando - ocultar header
                header.classList.add('header-hidden');
                header.classList.remove('header-visible');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
                // Subiendo o en el top - mostrar header
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
            }
            
            // Clase para cuando está scrolled
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', throttle(updateHeader, 10));
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    if (!hamburger || !navMenu) return;
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                closeMobileMenu();
            }
        });
    });
}


// ===== MODALS =====
function setupModals() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modal with close button
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openModal(modalId, data = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Populate modal with data if provided
    if (data) {
        populateModal(modal, data);
    }
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    trapFocus(modal);
}

function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
    
    // Clear any form data
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        clearFormErrors(form);
    }
}

function populateModal(modal, data) {
    // Populate modal elements with data
    Object.keys(data).forEach(key => {
        const element = modal.querySelector(`[data-field="${key}"]`);
        if (element) {
            if (element.tagName === 'IMG') {
                element.src = data[key];
            } else {
                element.textContent = data[key];
            }
        }
    });
}

function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    firstElement.focus();
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    // Real-time validation
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, select, textarea')) {
            validateField(e.target);
        }
    });
    
    document.addEventListener('blur', function(e) {
        if (e.target.matches('input, select, textarea')) {
            validateField(e.target);
        }
    });
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    clearFieldError(formGroup);
    
    // Required validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(formGroup, 'Este campo es obligatorio');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showFieldError(formGroup, 'Ingrese un email válido');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            showFieldError(formGroup, 'Ingrese un teléfono válido');
            return false;
        }
    }
    
    // Number validation
    if (field.type === 'number' && field.value) {
        const min = field.getAttribute('min');
        const max = field.getAttribute('max');
        const value = parseFloat(field.value);
        
        if (min && value < parseFloat(min)) {
            showFieldError(formGroup, `El valor mínimo es ${min}`);
            return false;
        }
        
        if (max && value > parseFloat(max)) {
            showFieldError(formGroup, `El valor máximo es ${max}`);
            return false;
        }
    }
    
    return true;
}

function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
        formGroup.appendChild(errorElement);
    } else {
        errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
    }
}

function clearFieldError(formGroup) {
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearFormErrors(form) {
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => clearFieldError(group));
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, wait) {
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

function formatPrice(price) {
    return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);
}

function formatNumber(number) {
    return new Intl.NumberFormat('es-DO').format(number);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-DO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// ===== EVENT HANDLERS =====
function handleScroll() {
    // Implement any scroll-based functionality here
}

function handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

function handleFormSubmit(e) {
    if (e.target.matches('form[data-ajax="true"]')) {
        e.preventDefault();
        submitFormAjax(e.target);
    }
}

function handleFormInput(e) {
    // Handle any input-specific functionality
}

// ===== AJAX FORM SUBMISSION =====
async function submitFormAjax(form) {
    if (isLoading) return;
    
    if (!validateForm(form)) {
        showToast('Por favor corrige los errores en el formulario', 'error');
        return;
    }
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('[type="submit"]');
    
    setLoadingState(form, true);
    
    try {
        const response = await fetch(form.action || window.location.href, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            handleFormSuccess(form, result);
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        handleFormError(form, error);
    } finally {
        setLoadingState(form, false);
    }
}

function setLoadingState(form, loading) {
    isLoading = loading;
    const submitBtn = form.querySelector('[type="submit"]');
    
    if (loading) {
        form.classList.add('form-loading');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        }
    } else {
        form.classList.remove('form-loading');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Enviar';
        }
    }
}

function handleFormSuccess(form, result) {
    showToast(result.message || 'Formulario enviado exitosamente', 'success');
    
    if (result.redirect) {
        setTimeout(() => {
            window.location.href = result.redirect;
        }, 1500);
    } else {
        form.reset();
        clearFormErrors(form);
    }
}

function handleFormError(form, error) {
    console.error('Form submission error:', error);
    showToast('Error al enviar el formulario. Inténtelo de nuevo.', 'error');
}

// ===== THEME TOGGLE =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle) return;
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Establecer video correcto según tema al cargar
    setInitialHeroVideo(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateHeroVideo(newTheme);
        
        // Smooth transition
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
}

function setInitialHeroVideo(theme) {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;
    
    if (theme === 'dark') {
        heroVideo.src = 'assets/images/noche.mp4';
        heroVideo.playbackRate = 1;
        heroVideo.load();
        heroVideo.play().catch(() => {});
    }
}

function updateHeroVideo(theme) {
    const heroVideo = document.querySelector('.hero-video');
    const heroSection = document.querySelector('.hero');
    if (!heroVideo || !heroSection) return;
    
    const videoSrc = theme === 'dark' ? 'assets/images/noche.mp4' : 'assets/images/dia.mp4';
    
    heroSection.classList.add('video-transitioning');
    
    heroVideo.style.opacity = '0';
    
    setTimeout(() => {
        heroVideo.src = videoSrc;
        heroVideo.load();
        
if (theme === 'dark') {
            heroVideo.playbackRate = 1;
        } else {
            heroVideo.playbackRate = 1;
        }
        
        heroVideo.play();
        
        heroVideo.oncanplay = () => {
            heroVideo.style.opacity = '1';
            heroSection.classList.remove('video-transitioning');
        };
        
        if (heroVideo.readyState >= 3) {
            heroVideo.style.opacity = '1';
            heroSection.classList.remove('video-transitioning');
        }
    }, 300);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (!themeIcon) return;
    
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openModal,
        closeModal,
        showToast,
        formatPrice,
        formatNumber,
        formatDate,
        generateId
    };
}