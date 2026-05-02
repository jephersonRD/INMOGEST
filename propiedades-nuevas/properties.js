// ============================================================
//  INMOGEST SRL — properties.js
//  Lee propertiesDatabase y renderiza las tarjetas en el HTML
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Estado global ─────────────────────────────────────────
  let currentPage    = 1;
  const ITEMS_PER_PAGE = 9;
  let filteredProps  = getAllProperties();   // función de database.js

  // ── Referencias DOM ───────────────────────────────────────
  const grid            = document.getElementById('propertiesGrid');
  const resultsCount    = document.getElementById('resultsCount');
  const noResults       = document.getElementById('noResults');
  const pagination      = document.getElementById('pagination');
  const paginationNums  = document.getElementById('paginationNumbers');
  const prevBtn         = document.getElementById('prevPage');
  const nextBtn         = document.getElementById('nextPage');
  const sortSelect      = document.getElementById('sortBy');
  const filterForm      = document.getElementById('propertyFilters');
  const clearBtn        = document.getElementById('clearFilters');
  const resetBtn        = document.getElementById('resetFilters');
  const viewBtns        = document.querySelectorAll('.view-btn');
  const modal           = document.getElementById('propertyModal');
  const modalBody       = document.getElementById('modalBody');
  const closeModal      = document.querySelector('.close');

  // ── Render inicial ────────────────────────────────────────
  render();

  // ── Eventos de filtros ────────────────────────────────────
  filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    currentPage = 1;
    applyFilters();
  });

  clearBtn.addEventListener('click', function () {
    filterForm.reset();
    currentPage = 1;
    filteredProps = getAllProperties();
    render();
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      filterForm.reset();
      currentPage = 1;
      filteredProps = getAllProperties();
      render();
    });
  }

  // Filtrado en tiempo real al escribir en el input de búsqueda
  document.getElementById('searchInput').addEventListener('input', function () {
    currentPage = 1;
    applyFilters();
  });

  // Ordenar
  sortSelect.addEventListener('change', function () {
    currentPage = 1;
    render();
  });

  // Vista grid / list
  viewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      viewBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const view = this.dataset.view;
      grid.classList.toggle('properties-list', view === 'list');
      grid.classList.toggle('properties-grid', view === 'grid');
    });
  });

  // Paginación
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) { currentPage--; render(); }
  });
  nextBtn.addEventListener('click', function () {
    const totalPages = Math.ceil(filteredProps.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) { currentPage++; render(); }
  });

  // Cerrar modal
  closeModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  // ── Funciones principales ─────────────────────────────────

  function applyFilters() {
    const filters = {
      search   : document.getElementById('searchInput').value,
      type     : document.getElementById('propertyType').value,
      minPrice : document.getElementById('minPrice').value,
      maxPrice : document.getElementById('maxPrice').value,
      location : document.getElementById('location').value,
      minSize  : document.getElementById('minSize').value,
    };
    filteredProps = filterProperties(filters);  // función de database.js
    render();
  }

  function render() {
    const sorted  = sortProperties(filteredProps, sortSelect.value);
    const total   = sorted.length;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    // Actualizar contador
    resultsCount.textContent = total;

    // Sin resultados
    if (total === 0) {
      grid.innerHTML = '';
      noResults.style.display = 'block';
      pagination.style.display = 'none';
      return;
    }
    noResults.style.display = 'none';

    // Página actual
    const start   = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = sorted.slice(start, start + ITEMS_PER_PAGE);

    // Pintar tarjetas
    grid.innerHTML = paginated.map(p => buildCard(p)).join('');

    // Eventos en tarjetas
    grid.querySelectorAll('.property-card').forEach(card => {
      card.addEventListener('click', function (e) {
        // No abrir modal si se hizo clic en el botón de contacto
        if (e.target.closest('.btn-contact')) return;
        const id = parseInt(this.dataset.id);
        openModal(id);
      });
    });

    // Paginación
    renderPagination(totalPages);

    // Scroll suave al tope de resultados
    document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Construcción de tarjeta ───────────────────────────────
  function buildCard(p) {
    const price     = formatPrice(p.price);
    const typeLabel = getTypeLabel(p.type);
    const badge     = p.featured ? '<span class="badge badge-featured">Destacado</span>' : '';

    // Habitaciones y baños (no aplica a terrenos)
    const bedsInfo = p.bedrooms > 0
      ? `<span><i class="fas fa-bed"></i> ${p.bedrooms} hab.</span>`
      : '';
    const bathsInfo = p.bathrooms > 0
      ? `<span><i class="fas fa-bath"></i> ${p.bathrooms} baños</span>`
      : '';

    // Top 3 features para la tarjeta
    const featuresList = (p.features || []).slice(0, 3)
      .map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`)
      .join('');

    return `
      <div class="property-card" data-id="${p.id}">
        <div class="property-image-wrapper">
          <img
            src="${p.images[0]}"
            alt="${p.title}"
            class="property-img"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'"
          >
          <div class="property-badges">
            ${badge}
            <span class="badge badge-type">${typeLabel}</span>
          </div>
          <div class="property-image-count">
            <i class="fas fa-images"></i> ${p.images.length}
          </div>
        </div>

        <div class="property-info">
          <div class="property-header">
            <h3 class="property-title">${p.title}</h3>
            <span class="property-price">${price}</span>
          </div>

          <p class="property-location">
            <i class="fas fa-map-marker-alt"></i>
            ${p.locationLabel}
          </p>

          <div class="property-specs">
            <span><i class="fas fa-ruler-combined"></i> ${p.size.toLocaleString()} m²</span>
            ${bedsInfo}
            ${bathsInfo}
            ${p.parkingSpots > 0 ? `<span><i class="fas fa-car"></i> ${p.parkingSpots} parq.</span>` : ''}
          </div>

          <p class="property-description-short">
            ${p.description.substring(0, 110)}…
          </p>

          <ul class="property-features-mini">
            ${featuresList}
          </ul>

          <div class="property-footer">
            <button class="btn btn-primary btn-sm" onclick="openPropertyModal(${p.id})">
              <i class="fas fa-eye"></i> Ver detalles
            </button>
            <a
              href="https://wa.me/18095550123?text=Hola,%20me%20interesa%20la%20propiedad:%20${encodeURIComponent(p.title)}"
              class="btn btn-secondary btn-sm btn-contact"
              target="_blank"
            >
              <i class="fab fa-whatsapp"></i> Consultar
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // ── Modal de detalle ──────────────────────────────────────
  window.openPropertyModal = function (id) {
    const p = getPropertyById(id);   // función de database.js
    if (!p) return;

    const price     = formatPrice(p.price);
    const typeLabel = getTypeLabel(p.type);

    const imagesHtml = p.images.map((src, i) => `
      <img
        src="${src}"
        alt="${p.title} - imagen ${i + 1}"
        class="modal-thumb ${i === 0 ? 'active' : ''}"
        onclick="switchModalImage(this, '${src}')"
        loading="lazy"
      >
    `).join('');

    const featuresHtml = (p.features || [])
      .map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`)
      .join('');

    const bedsRow    = p.bedrooms   > 0 ? `<div class="spec-item"><i class="fas fa-bed"></i><span>${p.bedrooms} Habitaciones</span></div>` : '';
    const bathsRow   = p.bathrooms  > 0 ? `<div class="spec-item"><i class="fas fa-bath"></i><span>${p.bathrooms} Baños</span></div>` : '';
    const parkRow    = p.parkingSpots > 0 ? `<div class="spec-item"><i class="fas fa-car"></i><span>${p.parkingSpots} Parqueos</span></div>` : '';
    const yearRow    = p.yearBuilt  ? `<div class="spec-item"><i class="fas fa-calendar"></i><span>Año ${p.yearBuilt}</span></div>` : '';

    modalBody.innerHTML = `
      <div class="modal-property">

        <div class="modal-gallery">
          <img id="modalMainImage" src="${p.images[0]}" alt="${p.title}" class="modal-main-image">
          <div class="modal-thumbs">${imagesHtml}</div>
        </div>

        <div class="modal-details">
          <div class="modal-title-row">
            <h2>${p.title}</h2>
            <span class="badge badge-type">${typeLabel}</span>
          </div>

          <p class="modal-location">
            <i class="fas fa-map-marker-alt"></i> ${p.locationLabel}
          </p>

          <p class="modal-price">${price}</p>

          <div class="modal-specs">
            <div class="spec-item"><i class="fas fa-ruler-combined"></i><span>${p.size.toLocaleString()} m²</span></div>
            ${bedsRow}${bathsRow}${parkRow}${yearRow}
          </div>

          <div class="modal-description">
            <h4>Descripción</h4>
            <p>${p.description}</p>
          </div>

          <div class="modal-features">
            <h4>Lo que ofrece</h4>
            <ul>${featuresHtml}</ul>
          </div>

          <div class="modal-actions">
            <a
              href="https://wa.me/18095550123?text=Hola,%20me%20interesa%20la%20propiedad:%20${encodeURIComponent(p.title)}%20-%20${price}"
              class="btn btn-primary"
              target="_blank"
            >
              <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
            </a>
            <a href="mailto:info@inmogest.com.do?subject=Consulta:%20${encodeURIComponent(p.title)}" class="btn btn-secondary">
              <i class="fas fa-envelope"></i> Enviar correo
            </a>
          </div>
        </div>

      </div>
    `;

    modal.style.display = 'flex';
  };

  // Cambiar imagen principal en el modal
  window.switchModalImage = function (thumb, src) {
    document.getElementById('modalMainImage').src = src;
    document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  };

  // ── Paginación ────────────────────────────────────────────
  function renderPagination(totalPages) {
    if (totalPages <= 1) {
      pagination.style.display = 'none';
      return;
    }
    pagination.style.display = 'flex';

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    let html = '';
    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button
          class="pagination-num ${i === currentPage ? 'active' : ''}"
          onclick="goToPage(${i})"
        >${i}</button>
      `;
    }
    paginationNums.innerHTML = html;
  }

  window.goToPage = function (page) {
    currentPage = page;
    render();
  };

  // Alias para el onclick de la tarjeta
  window.openModal = window.openPropertyModal;

});
