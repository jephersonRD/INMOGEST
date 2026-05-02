// ===== PROPERTIES PAGE JAVASCRIPT =====

let currentPage = 1;
let itemsPerPage = 12;
let currentFilters = {};
let currentSort = 'newest';
let currentView = 'grid';
let allProperties = [];

document.addEventListener('DOMContentLoaded', function() {
    initPropertiesPage();
});

function initPropertiesPage() {
    setupFilters();
    setupViewToggle();
    setupSorting();
    setupPagination();
    setupPropertyModal();
    loadProperties();
    setupSearchDebounce();
}

// ===== LOAD PROPERTIES =====
function loadProperties() {
    try {
        allProperties = DB.getAllProperties();
        applyFiltersAndDisplay();
    } catch (error) {
        console.error('Error loading properties:', error);
        showToast('Error al cargar las propiedades', 'error');
        showNoResults();
    }
}

// ===== FILTERS =====
function setupFilters() {
    const filtersForm = document.getElementById('propertyFilters');
    if (!filtersForm) return;
    
    filtersForm.addEventListener('submit', function(e) {
        e.preventDefault();
        applyFilters();
    });
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', clearFilters);
    }
}

function setupSearchDebounce() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let timeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            applyFilters();
        }, 500);
    });
}

function applyFilters() {
    const formData = new FormData(document.getElementById('propertyFilters'));
    currentFilters = Object.fromEntries(formData);
    currentPage = 1; // Reset to first page
    applyFiltersAndDisplay();
}

function clearFilters() {
    const form = document.getElementById('propertyFilters');
    if (form) {
        form.reset();
        currentFilters = {};
        currentPage = 1;
        applyFiltersAndDisplay();
    }
}

function applyFiltersAndDisplay() {
    // Get filtered properties
    const filteredProperties = DB.searchProperties(currentFilters);
    
    // Apply sorting
    const sortedProperties = sortProperties(filteredProperties, currentSort);
    
    // Update results count
    updateResultsCount(sortedProperties.length);
    
    // Paginate
    const paginatedProperties = paginateProperties(sortedProperties, currentPage, itemsPerPage);
    
    // Display
    displayProperties(paginatedProperties);
    
    // Update pagination
    updatePagination(sortedProperties.length);
    
    // Show no results if empty
    if (sortedProperties.length === 0) {
        showNoResults();
    }
}

// ===== SORTING =====
function setupSorting() {
    const sortSelect = document.getElementById('sortBy');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        applyFiltersAndDisplay();
    });
}

function sortProperties(properties, sortBy) {
    const sorted = [...properties];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'size-big':
            return sorted.sort((a, b) => b.constructionSize - a.constructionSize);
        case 'size-small':
            return sorted.sort((a, b) => a.constructionSize - b.constructionSize);
        case 'newest':
        default:
            return sorted.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    }
}

// ===== VIEW TOGGLE =====
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentView = this.dataset.view;
            updatePropertiesView();
        });
    });
}

function updatePropertiesView() {
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (!propertiesGrid) return;
    
    propertiesGrid.classList.remove('grid-view', 'list-view');
    propertiesGrid.classList.add(`${currentView}-view`);
}

// ===== PAGINATION =====
function setupPagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                applyFiltersAndDisplay();
                scrollToResults();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(allProperties.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                applyFiltersAndDisplay();
                scrollToResults();
            }
        });
    }
}

function paginateProperties(properties, page, perPage) {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return properties.slice(startIndex, endIndex);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    
    // Update prev/next buttons
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    
    // Generate page numbers
    if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            // Show all pages if total is 7 or less
            // Otherwise show first, last, current, and adjacent pages
            const showPage = totalPages <= 7 || 
                            i === 1 || 
                            i === totalPages || 
                            Math.abs(i - currentPage) <= 2;
            
            if (showPage) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    applyFiltersAndDisplay();
                    scrollToResults();
                });
                paginationNumbers.appendChild(pageBtn);
            } else if (i === 2 || i === totalPages - 1) {
                // Add ellipsis
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                paginationNumbers.appendChild(ellipsis);
            }
        }
    }
}

function scrollToResults() {
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== DISPLAY PROPERTIES =====
function displayProperties(properties) {
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (!propertiesGrid) return;
    
    if (properties.length === 0) {
        propertiesGrid.innerHTML = '';
        return;
    }
    
    const propertiesHTML = properties.map(property => createPropertyCard(property)).join('');
    propertiesGrid.innerHTML = propertiesHTML;
    
    // Setup property card events
    setupPropertyCardEvents();
}

function createPropertyCard(property) {
    let mainImage = 'https://placehold.co/400x300/B7791F/FFFFFF?text=INMOGEST';
    if (property.images && property.images.length > 0 && property.images[0]) {
        mainImage = property.images[0];
    }
    const features = getPropertyFeatures(property);
    const typeLabel = getTypeLabel(property.type);
    
    return `
        <div class="property-card" data-property-id="${property.id}">
            <div class="property-image">
                <img src="${mainImage}" alt="${property.title}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x300/B7791F/FFFFFF?text=INMOGEST'">
                <div class="property-badge">${typeLabel}</div>
                <div class="property-price">${formatPrice(property.price)}</div>
                <div class="property-actions">
                    <button class="action-btn" title="Vista rápida" onclick="openPropertyModal('${property.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" title="Favoritos" onclick="toggleFavorite('${property.id}')">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" title="Compartir" onclick="shareProperty('${property.id}')">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.city}, ${property.province}</span>
                </div>
                <div class="property-features">
                    ${features}
                </div>
                <p class="property-description">${property.description}</p>
                <div class="property-footer">
                    <span class="property-type">${typeLabel}</span>
                    <span class="property-date">${formatDate(property.dateCreated)}</span>
                </div>
            </div>
        </div>
    `;
}

function getPropertyFeatures(property) {
    const features = [];
    
    if (property.bedrooms > 0) {
        features.push(`<div class="feature-item"><i class="fas fa-bed"></i><span>${property.bedrooms} hab</span></div>`);
    }
    
    if (property.bathrooms > 0) {
        features.push(`<div class="feature-item"><i class="fas fa-bath"></i><span>${property.bathrooms} baños</span></div>`);
    }
    
    if (property.constructionSize > 0) {
        features.push(`<div class="feature-item"><i class="fas fa-ruler"></i><span>${property.constructionSize} m²</span></div>`);
    }
    
    if (property.parking > 0) {
        features.push(`<div class="feature-item"><i class="fas fa-car"></i><span>${property.parking} estac.</span></div>`);
    }
    
    return features.slice(0, 4).join(''); // Show max 4 features
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

// ===== PROPERTY CARD EVENTS =====
function setupPropertyCardEvents() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.action-btn')) return;
            
            const propertyId = this.dataset.propertyId;
            window.location.href = `detalle.html?id=${propertyId}`;
        });
    });
}

// ===== PROPERTY MODAL =====
function setupPropertyModal() {
    // Modal will be handled by main.js modal system
}

function openPropertyModal(propertyId) {
    const property = DB.getPropertyById(propertyId);
    if (!property) return;
    
    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;
    
    const defaultImg = 'https://placehold.co/600x400/B7791F/FFFFFF?text=INMOGEST';
    const mainImg = property.images && property.images[0] ? property.images[0] : defaultImg;
    
    modalBody.innerHTML = `
        <div class="modal-property-content">
            <div class="modal-property-image">
                <img src="${mainImg}" alt="${property.title}" onerror="this.onerror=null;this.src='${defaultImg}'">
            </div>
            <div class="modal-property-info">
                <h2>${property.title}</h2>
                <p class="modal-property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.city}, ${property.province}
                </p>
                <p class="modal-property-price">${formatPrice(property.price)}</p>
                <div class="modal-property-features">
                    ${property.bedrooms > 0 ? `<span><i class="fas fa-bed"></i> ${property.bedrooms} Habitaciones</span>` : ''}
                    ${property.bathrooms > 0 ? `<span><i class="fas fa-bath"></i> ${property.bathrooms} Baños</span>` : ''}
                    ${property.parking > 0 ? `<span><i class="fas fa-car"></i> ${property.parking} Parqueos</span>` : ''}
                    ${property.constructionSize > 0 ? `<span><i class="fas fa-ruler"></i> ${property.constructionSize} m²</span>` : ''}
                </div>
                <p class="modal-property-description">${property.description}</p>
                <a href="detalle.html?id=${property.id}" class="btn btn-primary">Ver Detalles</a>
            </div>
        </div>
    `;
    
    openModal('propertyModal');
}

// ===== PROPERTY ACTIONS =====
function toggleFavorite(propertyId) {
    // TODO: Implement favorites functionality
    showToast('Funcionalidad de favoritos próximamente', 'info');
}

function shareProperty(propertyId) {
    const property = DB.getPropertyById(propertyId);
    if (!property) return;
    
    if (navigator.share) {
        navigator.share({
            title: property.title,
            text: property.description,
            url: `${window.location.origin}/detalle.html?id=${propertyId}`
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        const url = `${window.location.origin}/detalle.html?id=${propertyId}`;
        navigator.clipboard.writeText(url).then(() => {
            showToast('Enlace copiado al portapapeles', 'success');
        }).catch(() => {
            showToast('No se pudo copiar el enlace', 'error');
        });
    }
}

// ===== RESULTS COUNT =====
function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = count.toLocaleString();
    }
}

// ===== NO RESULTS =====
function showNoResults() {
    const noResults = document.getElementById('noResults');
    const propertiesGrid = document.getElementById('propertiesGrid');
    const pagination = document.getElementById('pagination');
    
    if (noResults) noResults.style.display = 'block';
    if (propertiesGrid) propertiesGrid.innerHTML = '';
    if (pagination) pagination.style.display = 'none';
}

// ===== LOADING STATE =====
function showLoadingState() {
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (!propertiesGrid) return;
    
    const loadingHTML = Array(itemsPerPage).fill(0).map(() => `
        <div class="property-skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
    `).join('');
    
    propertiesGrid.innerHTML = `<div class="loading-properties">${loadingHTML}</div>`;
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.openPropertyModal = openPropertyModal;
window.toggleFavorite = toggleFavorite;
window.shareProperty = shareProperty;