// ===== HOME PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
});

function initHomePage() {
    setupHeroAnimations();
    setupStatsCounter();
    setupTestimonialSlider();
    setupContactForm();
    setupScrollAnimations();
}

// ===== HERO ANIMATIONS =====
function setupHeroAnimations() {
    const heroScroll = document.querySelector('.hero-scroll');
    
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const aboutSection = document.getElementById('nosotros');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// ===== STATS COUNTER ANIMATION =====
function setupStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
        
        animated = true;
    }
    
    // Check if stats section is in viewport
    function checkStatsVisibility() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const inViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (inViewport && !animated) {
            animateStats();
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // Check on load
}

// ===== TESTIMONIAL SLIDER =====
function setupTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialBtns = document.querySelectorAll('.testimonial-btn');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    if (testimonialCards.length === 0) return;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all buttons
        testimonialBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show current testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        
        if (testimonialBtns[index]) {
            testimonialBtns[index].classList.add('active');
        }
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(next);
    }
    
    function startAutoSlide() {
        testimonialInterval = setInterval(nextTestimonial, 5000); // 5 seconds
    }
    
    function stopAutoSlide() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
    }
    
    // Setup button events
    testimonialBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showTestimonial(index);
            stopAutoSlide();
            startAutoSlide(); // Restart timer
        });
    });
    
    // Setup hover events to pause auto-slide
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
        testimonialSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initialize
    showTestimonial(0);
    startAutoSlide();
    
    // Touch/swipe support for mobile
    setupTestimonialSwipe(testimonialCards, showTestimonial);
}

function setupTestimonialSwipe(cards, showCallback) {
    if (cards.length === 0) return;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    cards.forEach(card => {
        card.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        card.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        card.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                const currentIndex = Array.from(cards).findIndex(c => c.classList.contains('active'));
                if (diffX > 0 && currentIndex < cards.length - 1) {
                    // Swipe left - next
                    showCallback(currentIndex + 1);
                } else if (diffX < 0 && currentIndex > 0) {
                    // Swipe right - previous
                    showCallback(currentIndex - 1);
                }
            }
            
            isDragging = false;
        });
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm(contactForm)) {
            showToast('Por favor complete todos los campos obligatorios', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        const contactData = Object.fromEntries(formData);
        
        // Add to database
        try {
            const contact = DB.addContact({
                ...contactData,
                type: 'general_inquiry',
                source: 'home_page'
            });
            
            showToast('Su mensaje ha sido enviado exitosamente. Nos pondremos en contacto pronto.', 'success');
            contactForm.reset();
            clearFormErrors(contactForm);
            
            // Optional: Send to external service
            // await sendContactToServer(contactData);
            
        } catch (error) {
            console.error('Error saving contact:', error);
            showToast('Error al enviar el mensaje. Inténtelo de nuevo.', 'error');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .stat-card, .feature, .about-image');
    animateElements.forEach(el => observer.observe(el));
}

// ===== SERVICE CARD INTERACTIONS =====
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceLink = card.querySelector('.service-link');
        
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking on the actual link
            if (e.target !== serviceLink && !serviceLink.contains(e.target)) {
                serviceLink.click();
            }
        });
        
        // Add hover effect for better UX
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// ===== ABOUT VIDEO PLAY BUTTON =====
function setupAboutVideo() {
    const playButton = document.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Here you would typically open a video modal
            // For this demo, we'll show a placeholder
            showToast('Video de presentación próximamente disponible', 'info');
        });
    }
}

// ===== SOCIAL LINKS =====
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').classList.contains('fa-facebook-f') ? 'facebook' :
                            this.querySelector('i').classList.contains('fa-instagram') ? 'instagram' :
                            this.querySelector('i').classList.contains('fa-linkedin-in') ? 'linkedin' :
                            this.querySelector('i').classList.contains('fa-youtube') ? 'youtube' : 'social';
            
            showToast(`Síguenos en ${platform}. ¡Próximamente enlaces activos!`, 'info');
        });
    });
}

// ===== NAVIGATION HIGHLIGHTING =====
function setupNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
}

// ===== FEATURE HOVER EFFECTS =====
function setupFeatureEffects() {
    const features = document.querySelectorAll('.feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            // Add some interactive feedback
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ===== INITIALIZE ALL COMPONENTS =====
document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
    setupServiceCards();
    setupAboutVideo();
    setupSocialLinks();
    setupNavigationHighlight();
    setupFeatureEffects();
});

// ===== CSS ANIMATIONS SUPPORT =====
// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card, .stat-card, .feature, .about-image {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .service-card.animate-in, .stat-card.animate-in, .feature.animate-in, .about-image.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);