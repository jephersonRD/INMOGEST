// ===== PROPERTY DETAIL PAGE JAVASCRIPT =====

let currentProperty = null;
let currentImageIndex = 0;
let galleryImages = [];

document.addEventListener('DOMContentLoaded', function() {
    initDetailPage();
});

function initDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (!propertyId) {
        window.location.href = 'propiedades.html';
        return;
    }
    
    loadPropertyDetail(propertyId);
    setupImageGallery();
    setupContactForms();
    setupGalleryModal();
}

// ===== LOAD PROPERTY DETAIL =====
function loadPropertyDetail(propertyId) {
    try {
        currentProperty = DB.getPropertyById(propertyId);
        
        if (!currentProperty) {
            showPropertyNotFound();
            return;
        }
        
        displayPropertyDetail(currentProperty);
        updateBreadcrumb(currentProperty);
        loadRelatedProperties(propertyId);
        
    } catch (error) {
        console.error('Error loading property:', error);
        showPropertyNotFound();
    }
}

function displayPropertyDetail(property) {
    const propertyContent = document.getElementById('propertyContent');
    if (!propertyContent) return;
    
    galleryImages = property.images || [];
    
    const detailHTML = createPropertyDetailHTML(property);
    propertyContent.innerHTML = detailHTML;
    
    // Setup gallery after content is loaded
    setTimeout(() => {
        initializeGallery();
        setupPropertyActions();
    }, 100);
}

function createPropertyDetailHTML(property) {
    const features = getPropertyFeaturesList(property);
    const specifications = getPropertySpecs(property);
    const amenities = getPropertyAmenities(property);
    const agent = property.agent || {};
    
    return `
        <div class="detail-container">
            <div class="detail-main">
                <!-- Image Gallery -->
                <div class="detail-gallery">
                    <div class="gallery-main">
                        <img id="mainImage" src="${galleryImages[0] || 'https://via.placeholder.com/800x400'}" alt="${property.title}">
                        <button class="gallery-nav gallery-prev" onclick="previousImage()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gallery-nav gallery-next" onclick="nextImage()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="gallery-counter">
                            <span id="imageCounter">1</span> / ${galleryImages.length}
                        </div>
                        <button class="gallery-expand" onclick="openGalleryModal()">
                            <i class="fas fa-expand"></i>
                            Ver todas
                        </button>
                    </div>
                    <div class="gallery-thumbnails" id="galleryThumbnails">
                        ${galleryImages.map((img, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="selectImage(${index})">
                                <img src="${img}" alt="Imagen ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Property Description -->
                <div class="detail-description">
                    <div class="description-header">
                        <div class="description-icon">
                            <i class="fas fa-align-left"></i>
                        </div>
                        <h3 class="description-title">Descripción</h3>
                    </div>
                    <div class="description-content">
                        ${property.description}
                    </div>
                </div>
                
                <!-- Property Specifications -->
                <div class="detail-specs">
                    <div class="description-header">
                        <div class="description-icon">
                            <i class="fas fa-list"></i>
                        </div>
                        <h3 class="description-title">Especificaciones</h3>
                    </div>
                    <div class="specs-grid">
                        ${specifications}
                    </div>
                </div>
                
                <!-- Property Features -->
                ${amenities.length > 0 ? `
                <div class="detail-features-list">
                    <div class="description-header">
                        <div class="description-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <h3 class="description-title">Características Especiales</h3>
                    </div>
                    <div class="features-list">
                        ${amenities}
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="detail-sidebar">
                <!-- Property Info Card -->
                <div class="detail-info">
                    <div class="detail-header">
                        <h1 class="detail-title">${property.title}</h1>
                        <div class="detail-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${property.address}, ${property.city}</span>
                        </div>
                        <div class="detail-price">
                            ${formatPrice(property.price)}
                            <div class="price-note">Precio negociable</div>
                        </div>
                    </div>
                    
                    <div class="detail-features">
                        <div class="features-grid">
                            ${features}
                        </div>
                    </div>
                    
                    <div class="detail-actions">
                        <div class="action-buttons">
                            <button class="btn btn-primary" onclick="openContactModal('${property.id}')">
                                <i class="fas fa-envelope"></i>
                                Contactar Agente
                            </button>
                            <button class="btn btn-secondary" onclick="openScheduleModal('${property.id}')">
                                <i class="fas fa-calendar"></i>
                                Programar Visita
                            </button>
                            <a href="comprar.html?id=${property.id}" class="btn btn-success">
                                <i class="fas fa-shopping-cart"></i>
                                Iniciar Compra
                            </a>
                            <button class="btn btn-outline" onclick="openContactModal('${property.id}')">
                                <i class="fas fa-comment"></i>
                                Enviar Mensaje
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Agent Contact -->
                <div class="agent-contact">
                    <img src="${agent.avatar || 'https://via.placeholder.com/80x80'}" alt="${agent.name}" class="agent-avatar">
                    <h4 class="agent-name">${agent.name || 'Agente INMOGES'}</h4>
                    <p class="agent-title">Agente de Bienes Raíces</p>
                    <div class="agent-contact-info">
                        <p><i class="fas fa-phone"></i> ${agent.phone || '+1 (809) 555-0123'}</p>
                        <p><i class="fas fa-envelope"></i> ${agent.email || 'info@inmoges.com.do'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== IMAGE GALLERY =====
function initializeGallery() {
    currentImageIndex = 0;
    updateImageDisplay();
}

function selectImage(index) {
    currentImageIndex = index;
    updateImageDisplay();
}

function previousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
    updateImageDisplay();
}

function nextImage() {
    currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
    updateImageDisplay();
}

function updateImageDisplay() {
    if (galleryImages.length === 0) return;
    
    const mainImage = document.getElementById('mainImage');
    const imageCounter = document.getElementById('imageCounter');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        mainImage.src = galleryImages[currentImageIndex];
    }
    
    if (imageCounter) {
        imageCounter.textContent = currentImageIndex + 1;
    }
    
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function setupImageGallery() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

// ===== GALLERY MODAL =====
function setupGalleryModal() {
    const galleryModal = document.getElementById('galleryModal');
    if (!galleryModal) return;
    
    // Setup Swiper if available
    if (typeof Swiper !== 'undefined') {
        setupSwiperGallery();
    }
}

function openGalleryModal() {
    const galleryModal = document.getElementById('galleryModal');
    const gallerySlides = document.getElementById('gallerySlides');
    
    if (!galleryModal || !gallerySlides) return;
    
    // Populate slides
    const slidesHTML = galleryImages.map(img => `
        <div class="swiper-slide">
            <img src="${img}" alt="Imagen de la propiedad">
        </div>
    `).join('');
    
    gallerySlides.innerHTML = slidesHTML;
    
    openModal('galleryModal');
    
    // Initialize Swiper if available
    if (typeof Swiper !== 'undefined') {
        setTimeout(() => initGallerySwiper(), 100);
    }
}

function initGallerySwiper() {
    if (typeof Swiper === 'undefined') return;
    
    new Swiper('.gallerySwiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
        loop: true,
        initialSlide: currentImageIndex,
    });
}

// ===== PROPERTY ACTIONS =====
function setupPropertyActions() {
    // Add any additional property-specific actions here
}

// ===== CONTACT FORMS =====
function setupContactForms() {
    // Contact Agent Form
    const contactForm = document.getElementById('contactAgentForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Schedule Visit Form
    const scheduleForm = document.getElementById('scheduleVisitForm');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', handleScheduleSubmit);
    }
}

function openContactModal(propertyId) {
    const modal = document.getElementById('contactModal');
    const propertyIdInput = document.getElementById('propertyId');
    
    if (propertyIdInput) {
        propertyIdInput.value = propertyId;
    }
    
    openModal('contactModal');
}

function openScheduleModal(propertyId) {
    const modal = document.getElementById('scheduleModal');
    const propertyIdInput = document.getElementById('schedulePropertyId');
    
    if (propertyIdInput) {
        propertyIdInput.value = propertyId;
    }
    
    // Set minimum date to tomorrow
    const visitDate = document.getElementById('visitDate');
    if (visitDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        visitDate.min = tomorrow.toISOString().split('T')[0];
    }
    
    openModal('scheduleModal');
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = Object.fromEntries(formData);
    
    try {
        const contact = DB.addContact({
            ...contactData,
            type: 'property_inquiry',
            source: 'property_detail',
            propertyTitle: currentProperty?.title
        });
        
        showToast('Su mensaje ha sido enviado. El agente se pondrá en contacto pronto.', 'success');
        closeModal(document.getElementById('contactModal'));
        
    } catch (error) {
        console.error('Error sending message:', error);
        showToast('Error al enviar el mensaje. Inténtelo de nuevo.', 'error');
    }
}

async function handleScheduleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const scheduleData = Object.fromEntries(formData);
    
    try {
        const contact = DB.addContact({
            ...scheduleData,
            type: 'visit_request',
            source: 'property_detail',
            propertyTitle: currentProperty?.title,
            requestedDateTime: `${scheduleData.date} ${scheduleData.time}`
        });
        
        showToast('Su solicitud de visita ha sido programada. Recibirá confirmación pronto.', 'success');
        closeModal(document.getElementById('scheduleModal'));
        
    } catch (error) {
        console.error('Error scheduling visit:', error);
        showToast('Error al programar la visita. Inténtelo de nuevo.', 'error');
    }
}

// ===== RELATED PROPERTIES =====
function loadRelatedProperties(propertyId) {
    try {
        const relatedProperties = DB.getRelatedProperties(propertyId, 3);
        displayRelatedProperties(relatedProperties);
    } catch (error) {
        console.error('Error loading related properties:', error);
    }
}

function displayRelatedProperties(properties) {
    const relatedGrid = document.getElementById('relatedProperties');
    if (!relatedGrid) return;
    
    if (properties.length === 0) {
        document.querySelector('.related-properties').style.display = 'none';
        return;
    }
    
    const defaultImg = 'https://placehold.co/300x200/B7791F/FFFFFF?text=INMOGEST';
    
    const relatedHTML = properties.map(property => {
        const imgUrl = property.images && property.images[0] ? property.images[0] : defaultImg;
        return `
        <div class="related-card" onclick="goToProperty('${property.id}')">
            <div class="related-image">
                <img src="${imgUrl}" alt="${property.title}" onerror="this.onerror=null;this.src='${defaultImg}'">
                <div class="related-price">${formatPrice(property.price)}</div>
            </div>
            <div class="related-info">
                <h4 class="related-title">${property.title}</h4>
                <div class="related-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.city}, ${property.province}
                </div>
                <div class="related-features">
                    ${property.bedrooms > 0 ? `<span><i class="fas fa-bed"></i> ${property.bedrooms} hab</span>` : ''}
                    ${property.bathrooms > 0 ? `<span><i class="fas fa-bath"></i> ${property.bathrooms} baños</span>` : ''}
                    ${property.constructionSize > 0 ? `<span><i class="fas fa-ruler"></i> ${property.constructionSize} m²</span>` : ''}
                </div>
            </div>
        </div>
    `}).join('');
    
    relatedGrid.innerHTML = relatedHTML;
}

function goToProperty(propertyId) {
    window.location.href = `detalle.html?id=${propertyId}`;
}

// ===== UTILITY FUNCTIONS =====
function updateBreadcrumb(property) {
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = property.title;
    }
    
    // Update page title
    document.title = `${property.title} - INMOGEST SRL`;
}

function showPropertyNotFound() {
    const propertyContent = document.getElementById('propertyContent');
    if (propertyContent) {
        propertyContent.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <i class="fas fa-home" style="font-size: 4rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h2>Propiedad no encontrada</h2>
                <p>La propiedad que busca no existe o ha sido removida.</p>
                <a href="propiedades.html" class="btn btn-primary">Ver todas las propiedades</a>
            </div>
        `;
    }
}

function getPropertyFeaturesList(property) {
    const features = [];
    
    if (property.bedrooms > 0) {
        features.push(`
            <div class="feature-box">
                <i class="fas fa-bed"></i>
                <div class="feature-value">${property.bedrooms}</div>
                <div class="feature-label">Habitaciones</div>
            </div>
        `);
    }
    
    if (property.bathrooms > 0) {
        features.push(`
            <div class="feature-box">
                <i class="fas fa-bath"></i>
                <div class="feature-value">${property.bathrooms}</div>
                <div class="feature-label">Baños</div>
            </div>
        `);
    }
    
    if (property.constructionSize > 0) {
        features.push(`
            <div class="feature-box">
                <i class="fas fa-ruler"></i>
                <div class="feature-value">${property.constructionSize}</div>
                <div class="feature-label">m² Construidos</div>
            </div>
        `);
    }
    
    if (property.landSize > 0) {
        features.push(`
            <div class="feature-box">
                <i class="fas fa-map"></i>
                <div class="feature-value">${property.landSize}</div>
                <div class="feature-label">m² Terreno</div>
            </div>
        `);
    }
    
    if (property.parking > 0) {
        features.push(`
            <div class="feature-box">
                <i class="fas fa-car"></i>
                <div class="feature-value">${property.parking}</div>
                <div class="feature-label">Estacionamientos</div>
            </div>
        `);
    }
    
    if (property.yearBuilt) {
        features.push(`
            <div class="feature-box">
                <i class="fas fa-calendar"></i>
                <div class="feature-value">${property.yearBuilt}</div>
                <div class="feature-label">Año</div>
            </div>
        `);
    }
    
    return features.join('');
}

function getPropertySpecs(property) {
    const specs = [
        { label: 'Tipo de Propiedad', value: getTypeLabel(property.type) },
        { label: 'Precio', value: formatPrice(property.price) },
        { label: 'Ubicación', value: `${property.city}, ${property.province}` },
        { label: 'Dirección', value: property.address }
    ];
    
    if (property.constructionSize > 0) {
        specs.push({ label: 'Área Construida', value: `${property.constructionSize} m²` });
    }
    
    if (property.landSize > 0) {
        specs.push({ label: 'Área del Terreno', value: `${property.landSize} m²` });
    }
    
    if (property.yearBuilt) {
        specs.push({ label: 'Año de Construcción', value: property.yearBuilt });
    }
    
    return specs.map(spec => `
        <div class="spec-item">
            <span class="spec-label">${spec.label}</span>
            <span class="spec-value">${spec.value}</span>
        </div>
    `).join('');
}

function getPropertyAmenities(property) {
    if (!property.features || property.features.length === 0) return '';
    
    const featureLabels = {
        'piscina': 'Piscina',
        'jardin': 'Jardín',
        'terraza': 'Terraza',
        'balcon': 'Balcón',
        'garage': 'Garage',
        'seguridad': 'Seguridad 24/7',
        'ascensor': 'Ascensor',
        'aire-acondicionado': 'Aire Acondicionado',
        'cocina-equipada': 'Cocina Equipada',
        'amueblada': 'Amueblada',
        'vista-mar': 'Vista al Mar',
        'gimnasio': 'Gimnasio'
    };
    
    const featureIcons = {
        'piscina': 'fa-swimming-pool',
        'jardin': 'fa-leaf',
        'terraza': 'fa-building',
        'balcon': 'fa-home',
        'garage': 'fa-car',
        'seguridad': 'fa-shield-alt',
        'ascensor': 'fa-elevator',
        'aire-acondicionado': 'fa-snowflake',
        'cocina-equipada': 'fa-utensils',
        'amueblada': 'fa-couch',
        'vista-mar': 'fa-water',
        'gimnasio': 'fa-dumbbell'
    };
    
    return property.features.map(feature => `
        <div class="feature-item">
            <div class="feature-icon">
                <i class="fas ${featureIcons[feature] || 'fa-check'}"></i>
            </div>
            <span class="feature-text">${featureLabels[feature] || feature}</span>
        </div>
    `).join('');
}

function getTypeLabel(type) {
    const types = {
        'casa': 'Casa',
        'apartamento': 'Apartamento',
        'terreno': 'Terreno',
        'hotel': 'Hotel',
        'residencial': 'Residencial',
        'edificio': 'Edificio',
        'local-comercial': 'Local Comercial',
        'oficina': 'Oficina',
        'bodega': 'Bodega'
    };
    
    return types[type] || 'Propiedad';
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.selectImage = selectImage;
window.previousImage = previousImage;
window.nextImage = nextImage;
window.openGalleryModal = openGalleryModal;
window.openContactModal = openContactModal;
window.openScheduleModal = openScheduleModal;
window.goToProperty = goToProperty;