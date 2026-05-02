// ===== SELL PROPERTY PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    setupSellForm();
    setupFormSteps();
    setupImageUpload();
    setupFieldValidation();
});

// Configurar formulario principal
function setupSellForm() {
    const form = document.getElementById('sellPropertyForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitProperty();
        }
    });
}

// Sistema de pasos del formulario
let currentStep = 1;
const totalSteps = 2;

function setupFormSteps() {
    updateProgressBar();
    updateNavigationButtons();
    
    // Inicializar estado del botón
    initializeButtonState();
    
    // Solo permitir clicks en tabs habilitados
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                const targetTab = this.getAttribute('data-tab');
                switchToTab(targetTab);
            }
        });
    });
}

function initializeButtonState() {
    const nextBtn = document.getElementById('nextBtn');
    const detailsTab = document.getElementById('detailsTab');
    
    // HABILITAR el botón inmediatamente - SIN validaciones complicadas
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
        nextBtn.classList.remove('disabled');
        nextBtn.style.backgroundColor = '#007bff';
        nextBtn.style.color = 'white';
        
        // Función simple de click
        nextBtn.onclick = function(e) {
            e.preventDefault();
            
            // Solo verificar que tenga ALGO en título
            const title = document.getElementById('propertyTitle');
            if (!title || !title.value.trim()) {
                alert('Por favor escriba un título para la propiedad');
                title?.focus();
                return;
            }
            
            // Ir a detalles SIEMPRE
            switchToTab('details');
        };
    }
    
    // Habilitar tab de detalles
    if (detailsTab) {
        detailsTab.classList.remove('disabled');
    }
    
    // Mensaje positivo
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = '✅ Escriba el título y haga clic en "Continuar a Detalles"';
        progressText.style.color = '#28a745';
    }
}

function validateAndUpdateButton() {
    // Solo campos BÁSICOS que veo que ya llenaste
    const basicFields = [
        'propertyTitle',       // Título de la Propiedad  
        'propertyType',        // Tipo de Propiedad
        'propertyDescription', // Descripción
        'propertyAddress',     // Dirección Completa
        'price'               // Precio
    ];
    
    let allValid = true;
    
    console.log('=== VERIFICANDO CAMPOS BÁSICOS ===');
    
    // Verificar solo los campos básicos
    for (const fieldId of basicFields) {
        const field = document.getElementById(fieldId);
        const value = field ? field.value.trim() : '';
        console.log(`${fieldId}: "${value}" - ${value ? 'LLENO' : 'VACÍO'}`);
        
        if (!field || !value) {
            allValid = false;
            console.log(`❌ Campo ${fieldId} está vacío o no existe`);
            break;
        } else {
            console.log(`✅ Campo ${fieldId} está completo`);
        }
    }
    
    console.log(`RESULTADO FINAL: ${allValid ? 'TODOS COMPLETOS' : 'FALTAN CAMPOS'}`);
    console.log('=================================');
    
    const nextBtn = document.getElementById('nextBtn');
    const detailsTab = document.getElementById('detailsTab');
    const progressText = document.getElementById('progressText');
    
    if (allValid) {
        // DESBLOQUEAR el botón y tab
        console.log('🎉 DESBLOQUEANDO BOTÓN');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
            nextBtn.classList.remove('disabled');
            nextBtn.style.backgroundColor = '#007bff';
            nextBtn.style.color = 'white';
            
            // Asegurar que el onclick funcione
            nextBtn.onclick = function(e) {
                e.preventDefault();
                console.log('Click en botón - yendo a detalles');
                switchToTab('details');
            };
        }
        
        if (detailsTab) {
            detailsTab.classList.remove('disabled');
        }
        
        if (progressText) {
            progressText.textContent = '🎉 ¡Información completa! Haga clic en Continuar a Detalles';
            progressText.style.color = '#28a745';
            progressText.style.fontWeight = 'bold';
        }
    } else {
        // BLOQUEAR el botón
        console.log('🔒 BLOQUEANDO BOTÓN');
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.classList.add('disabled');
        }
        
        if (detailsTab) {
            detailsTab.classList.add('disabled');
        }
        
        if (progressText) {
            progressText.textContent = 'Complete: Título, Tipo, Descripción, Dirección y Precio para continuar';
            progressText.style.color = '#dc3545';
        }
    }
}

function switchToTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Remover clase active
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Activar tab correspondiente
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"].tab-content`).classList.add('active');
    
    // Actualizar paso actual
    currentStep = tabName === 'basic' ? 1 : 2;
    updateProgressBar();
    updateNavigationButtons();
}

// Validación en tiempo real
function setupFieldValidation() {
    const basicFields = ['propertyTitle', 'propertyType', 'propertyDescription', 'price', 'constructionSize'];
    
    basicFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', checkBasicFieldsCompletion);
            field.addEventListener('input', checkBasicFieldsCompletion);
            field.addEventListener('change', checkBasicFieldsCompletion);
            field.addEventListener('keyup', checkBasicFieldsCompletion);
        }
    });
    
    // Verificar inmediatamente al cargar
    setTimeout(() => {
        checkBasicFieldsCompletion();
    }, 500);
}

function checkBasicFieldsCompletion() {
    const basicFields = ['propertyTitle', 'propertyType', 'propertyDescription', 'price', 'constructionSize'];
    let allFilled = true;
    
    for (const fieldId of basicFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            allFilled = false;
            break;
        }
    }
    
    const detailsTab = document.getElementById('detailsTab');
    const nextBtn = document.getElementById('nextBtn');
    const progressText = document.getElementById('progressText');
    
    if (allFilled) {
        // SIEMPRE habilitar cuando esté completo
        if (detailsTab) detailsTab.classList.remove('disabled');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.style.cursor = 'pointer';
            nextBtn.classList.remove('disabled');
        }
        if (progressText) {
            progressText.textContent = '¡Información básica completa! Continúe a Detalles';
            progressText.style.color = '#28a745';
        }
    } else {
        // Deshabilitar si no está completo
        if (detailsTab) detailsTab.classList.add('disabled');
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
            nextBtn.style.cursor = 'not-allowed';
        }
        if (progressText) {
            progressText.textContent = 'Complete la información básica para continuar';
            progressText.style.color = '#666';
        }
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const progressPercent = (currentStep / totalSteps) * 100;
    progressFill.style.width = progressPercent + '%';
    
    if (currentStep === 1) {
        checkBasicFieldsCompletion();
    } else if (currentStep === 2) {
        progressText.textContent = 'Complete los detalles y publique su propiedad';
        progressText.style.color = 'var(--text-secondary)';
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const alwaysNextBtn = document.getElementById('alwaysNextBtn');
    
    // Mostrar/ocultar botones según el paso
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
        alwaysNextBtn.style.display = 'inline-flex'; // Siempre visible en paso 1
        nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Continuar a Detalles';
    } else if (currentStep === 2) {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
        alwaysNextBtn.style.display = 'none'; // Ocultar en paso 2
    }
}

// Funciones de navegación
window.nextTab = function() {
    console.log('nextTab llamado, currentStep:', currentStep); // Debug
    if (currentStep === 1) {
        const basicFieldsValid = validateBasicFields();
        console.log('Campos básicos válidos:', basicFieldsValid); // Debug
        if (basicFieldsValid) {
            switchToTab('details');
        }
    }
};

window.previousTab = function() {
    if (currentStep === 2) {
        switchToTab('basic');
    }
};

function validateBasicFields() {
    const basicFields = ['propertyTitle', 'propertyType', 'propertyDescription', 'price', 'constructionSize'];
    
    for (const fieldId of basicFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            alert(`Por favor complete el campo: ${field ? field.previousElementSibling.textContent : fieldId}`);
            field?.focus();
            return false;
        }
    }
    return true;
}

// Funcionalidad de subida de imágenes
function setupImageUpload() {
    const imageInput = document.getElementById('propertyImages');
    const previewGrid = document.getElementById('imagePreviewGrid');
    let selectedFiles = [];

    if (!imageInput) return;

    imageInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (selectedFiles.length >= 10) {
                alert('Máximo 10 imágenes permitidas');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert(`La imagen ${file.name} es muy grande. Máximo 5MB.`);
                return;
            }

            selectedFiles.push(file);
            displayImagePreview(file, selectedFiles.length - 1);
        });
        
        // Limpiar input para permitir seleccionar las mismas imágenes de nuevo
        imageInput.value = '';
    });

    function displayImagePreview(file, index) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="preview-image">
                <button type="button" class="remove-image" onclick="removeImage(${index})">×</button>
            `;
            
            previewGrid.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    }

    // Función global para remover imágenes
    window.removeImage = function(index) {
        selectedFiles.splice(index, 1);
        updatePreviewGrid();
    };

    function updatePreviewGrid() {
        previewGrid.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            displayImagePreview(file, index);
        });
    }

    // Hacer disponible el array de archivos globalmente
    window.getSelectedFiles = function() {
        return selectedFiles;
    };
}

// Validar formulario
function validateForm() {
    const requiredFields = ['propertyTitle', 'propertyType', 'propertyDescription', 'price', 'constructionSize', 'ownerName', 'ownerPhone', 'ownerEmail'];
    const checkboxes = ['acceptTerms', 'acceptPrivacy', 'acceptCommission'];
    
    // Validar campos requeridos
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            alert(`Por favor complete el campo: ${field ? field.previousElementSibling.textContent : fieldId}`);
            field?.focus();
            return false;
        }
    }
    
    // Validar checkboxes
    for (const checkboxId of checkboxes) {
        const checkbox = document.getElementById(checkboxId);
        if (!checkbox || !checkbox.checked) {
            alert('Debe aceptar todos los términos y condiciones');
            return false;
        }
    }
    
    // Validar email
    const email = document.getElementById('ownerEmail');
    if (email && !isValidEmail(email.value)) {
        alert('Por favor ingrese un email válido');
        email.focus();
        return false;
    }
    
    return true;
}

// Enviar propiedad
function submitProperty() {
    const form = document.getElementById('sellPropertyForm');
    
    // Crear objeto de propiedad
    const propertyData = {
        id: generatePropertyId(),
        title: document.getElementById('propertyTitle')?.value || '',
        type: document.getElementById('propertyType')?.value || '',
        description: document.getElementById('propertyDescription')?.value || '',
        address: document.getElementById('propertyAddress')?.value || '',
        city: document.getElementById('city')?.value || '',
        province: document.getElementById('province')?.value || '',
        sector: document.getElementById('sector')?.value || '',
        zipCode: document.getElementById('zipCode')?.value || '',
        price: parseFloat(document.getElementById('price')?.value) || 0,
        negotiable: document.getElementById('negotiable')?.value === 'yes',
        constructionSize: parseFloat(document.getElementById('constructionSize')?.value) || 0,
        landSize: parseFloat(document.getElementById('landSize')?.value) || 0,
        bedrooms: parseInt(document.getElementById('bedrooms')?.value) || 0,
        bathrooms: parseFloat(document.getElementById('bathrooms')?.value) || 0,
        parking: parseInt(document.getElementById('parking')?.value) || 0,
        yearBuilt: parseInt(document.getElementById('yearBuilt')?.value) || new Date().getFullYear(),
        ownerName: document.getElementById('ownerName')?.value || '',
        ownerPhone: document.getElementById('ownerPhone')?.value || '',
        ownerEmail: document.getElementById('ownerEmail')?.value || '',
        preferredContact: document.getElementById('preferredContact')?.value || '',
        saleReason: document.getElementById('saleReason')?.value || '',
        urgency: document.getElementById('urgency')?.value || 'flexible',
        additionalComments: document.getElementById('additionalComments')?.value || '',
        status: 'disponible',
        publishDate: new Date().toISOString(),
        featured: false,
        images: getPropertyImages()
    };
    
    // Agregar características seleccionadas
    const features = [];
    const featureCheckboxes = document.querySelectorAll('input[name="features"]:checked');
    featureCheckboxes.forEach(checkbox => {
        features.push(checkbox.value);
    });
    propertyData.features = features;
    
    // Guardar en la base de datos INMEDIATAMENTE
    savePropertyToDatabase(propertyData);
    
    // Mostrar modal de éxito
    showSuccessModal(propertyData.id);
}

// Generar ID único para la propiedad
function generatePropertyId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `PROP${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
}

// Obtener imágenes de la propiedad
function getPropertyImages() {
    const selectedFiles = window.getSelectedFiles ? window.getSelectedFiles() : [];
    const images = [];
    
    // Para demo, usar imágenes placeholder
    if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
            // En producción, aquí subirías las imágenes a un servidor
            images.push(`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center&sig=${Math.random()}`);
        });
    } else {
        // Imágenes por defecto si no se subieron
        images.push(
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop&crop=center'
        );
    }
    
    return images;
}

// Guardar propiedad en la base de datos
function savePropertyToDatabase(propertyData) {
    try {
        // Obtener propiedades existentes
        let properties = JSON.parse(localStorage.getItem('properties')) || [];
        
        // Agregar nueva propiedad
        properties.unshift(propertyData); // unshift para que aparezca al inicio
        
        // Guardar en localStorage
        localStorage.setItem('properties', JSON.stringify(properties));
        
        // También actualizar la variable global en database.js
        if (window.properties) {
            window.properties.unshift(propertyData);
        }
        
        // Forzar recarga de propiedades en otras páginas
        if (typeof window.loadProperties === 'function') {
            window.loadProperties();
        }
        
        // Disparar evento personalizado para notificar cambios
        window.dispatchEvent(new CustomEvent('propertiesUpdated', {
            detail: { newProperty: propertyData }
        }));
        
        console.log('Propiedad guardada exitosamente:', propertyData.id);
        console.log('Total propiedades en base de datos:', properties.length);
        
        return true;
    } catch (error) {
        console.error('Error guardando propiedad:', error);
        return false;
    }
}

// Mostrar modal de éxito
function showSuccessModal(propertyId) {
    // Actualizar el ID en el modal
    const propertyIdSpan = document.getElementById('propertyId');
    if (propertyIdSpan) {
        propertyIdSpan.textContent = propertyId;
    }
    
    // Actualizar mensaje para mostrar que se publicó inmediatamente
    const modalContent = document.querySelector('#successModal .modal-content p');
    if (modalContent) {
        modalContent.innerHTML = `¡Su propiedad ha sido <strong>publicada inmediatamente</strong> en nuestro portal! Ya está disponible para que los compradores la vean.`;
    }
    
    // Mostrar modal
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

// Cerrar modal de éxito
window.closeSuccessModal = function() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            // Limpiar formulario opcionalmente
            // document.getElementById('sellPropertyForm').reset();
        }, 300);
    }
};

// Función para administradores - eliminar propiedad
window.deleteProperty = function(propertyId) {
    if (!confirm('¿Está seguro de que desea eliminar esta propiedad? Esta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        // Obtener propiedades actuales
        let properties = JSON.parse(localStorage.getItem('properties')) || [];
        
        // Filtrar para remover la propiedad
        const originalLength = properties.length;
        properties = properties.filter(property => property.id !== propertyId);
        
        if (properties.length < originalLength) {
            // Guardar cambios
            localStorage.setItem('properties', JSON.stringify(properties));
            
            // Actualizar variable global
            if (window.properties) {
                window.properties = properties;
            }
            
            alert(`Propiedad ${propertyId} eliminada exitosamente.`);
            
            // Recargar página si estamos en propiedades
            if (window.location.pathname.includes('propiedades.html')) {
                window.location.reload();
            }
        } else {
            alert('No se encontró la propiedad especificada.');
        }
        
    } catch (error) {
        console.error('Error eliminando propiedad:', error);
        alert('Error eliminando la propiedad. Intente nuevamente.');
    }
};

// Función para listar todas las propiedades con sus IDs (para administradores)
window.listAllProperties = function() {
    try {
        const properties = JSON.parse(localStorage.getItem('properties')) || [];
        console.log('=== PROPIEDADES EN BASE DE DATOS ===');
        console.log(`Total: ${properties.length} propiedades`);
        
        properties.forEach((property, index) => {
            console.log(`${index + 1}. ID: ${property.id}`);
            console.log(`   Título: ${property.title}`);
            console.log(`   Precio: $${property.price?.toLocaleString()}`);
            console.log(`   Fecha: ${new Date(property.publishDate).toLocaleDateString()}`);
            console.log(`   ---`);
        });
        
        return properties;
    } catch (error) {
        console.error('Error listando propiedades:', error);
        return [];
    }
};

// Función auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para ir a detalles SIEMPRE
window.goToDetails = function() {
    console.log('Botón Siguiente presionado - yendo a detalles');
    switchToTab('details');
};

// Navegación entre tabs con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && e.ctrlKey) {
        e.preventDefault();
        const currentTab = document.querySelector('.tab-btn.active');
        const allTabs = document.querySelectorAll('.tab-btn');
        const currentIndex = Array.from(allTabs).indexOf(currentTab);
        const nextIndex = (currentIndex + 1) % allTabs.length;
        
        allTabs[nextIndex].click();
    }
});