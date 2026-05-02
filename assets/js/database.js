// ===== DATABASE MANAGEMENT =====

class DatabaseManager {
    constructor() {
        this.properties = [];
        this.purchases = [];
        this.contacts = [];
        this.sellers = [];
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        this.loadFromLocalStorage();
        this.createSampleData();
        this.loadNewProperties();
        this.initialized = true;
    }
    
    loadNewProperties() {
        if (typeof getAllProperties === 'function') {
            const newProps = getAllProperties();
            if (newProps && newProps.length > 0) {
                const convertedProps = newProps.map((p, index) => this.convertPropertyFormat(p, index));
                this.properties = [...this.properties, ...convertedProps];
                console.log('Loaded ' + convertedProps.length + ' properties from new database');
            }
        }
    }
    
    convertPropertyFormat(prop, index) {
        const originalId = typeof prop.id === 'number' ? prop.id : (index + 1);
        return {
            id: 'prop_' + originalId,
            title: prop.title,
            type: prop.type,
            description: prop.description || prop.features?.join('. ') || '',
            price: prop.price,
            location: prop.location,
            city: prop.locationLabel ? prop.locationLabel.split(',')[0].trim() : '',
            province: prop.location,
            address: prop.locationLabel || '',
            constructionSize: prop.size,
            landSize: prop.size,
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            parking: prop.parkingSpots,
            yearBuilt: prop.yearBuilt,
            features: prop.features || [],
            images: prop.images || [],
            agent: {
                name: 'INMOGEST',
                phone: '+1 (809) 555-0123',
                email: 'info@inmoges.com.do',
                avatar: ''
            },
            dateCreated: prop.dateAdded || new Date().toISOString(),
            status: prop.status === 'venta' ? 'available' : 'available'
        };
    }
    
    // ===== SAMPLE DATA =====
    createSampleData() {
        if (this.properties.length === 0) {
            this.properties = [
                {
                    id: 'prop_1',
                    title: 'Casa Moderna en Punta Cana',
                    type: 'casa',
                    description: 'Hermosa casa moderna de 3 habitaciones y 2 baños, ubicada en una zona exclusiva de Punta Cana. Con piscina privada, jardín tropical y acabados de lujo.',
                    price: 285000,
                    location: 'punta-cana',
                    city: 'Punta Cana',
                    province: 'la-altagracia',
                    address: 'Av. Barceló, Punta Cana Village',
                    constructionSize: 180,
                    landSize: 400,
                    bedrooms: 3,
                    bathrooms: 2,
                    parking: 2,
                    yearBuilt: 2022,
                    features: ['piscina', 'jardin', 'aire-acondicionado', 'cocina-equipada', 'seguridad'],
                    images: [
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
                    ],
                    agent: {
                        name: 'María González',
                        phone: '+1 (809) 555-0123',
                        email: 'maria.gonzalez@inmoges.com.do',
                        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332f38c?w=150&h=150&fit=crop&crop=face'
                    },
                    dateCreated: '2024-01-15',
                    status: 'available'
                },
                {
                    id: 'prop_2',
                    title: 'Apartamento Vista al Mar en Malecón',
                    type: 'apartamento',
                    description: 'Exclusivo apartamento en el Malecón de Santo Domingo con vista panorámica al mar Caribe. 2 habitaciones, 2 baños, balcón amplio y acabados de primera.',
                    price: 195000,
                    location: 'santo-domingo',
                    city: 'Santo Domingo',
                    province: 'distrito-nacional',
                    address: 'Av. George Washington, Malecón',
                    constructionSize: 120,
                    landSize: 0,
                    bedrooms: 2,
                    bathrooms: 2,
                    parking: 1,
                    yearBuilt: 2021,
                    features: ['vista-mar', 'balcon', 'aire-acondicionado', 'ascensor', 'seguridad', 'gimnasio'],
                    images: [
                        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
                    ],
                    agent: {
                        name: 'Carlos Mendoza',
                        phone: '+1 (809) 555-0124',
                        email: 'carlos.mendoza@inmoges.com.do',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                    },
                    dateCreated: '2024-01-20',
                    status: 'available'
                },
                {
                    id: 'prop_3',
                    title: 'Villa de Lujo en Casa de Campo',
                    type: 'casa',
                    description: 'Impresionante villa de lujo en el exclusivo resort Casa de Campo. 5 habitaciones, 4 baños, piscina infinity, cancha de tenis y acceso al campo de golf.',
                    price: 750000,
                    location: 'la-romana',
                    city: 'La Romana',
                    province: 'la-romana',
                    address: 'Casa de Campo Resort, Villa Marina',
                    constructionSize: 450,
                    landSize: 1200,
                    bedrooms: 5,
                    bathrooms: 4,
                    parking: 3,
                    yearBuilt: 2023,
                    features: ['piscina', 'jardin', 'terraza', 'aire-acondicionado', 'cocina-equipada', 'amueblada', 'seguridad', 'vista-mar'],
                    images: [
                        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop'
                    ],
                    agent: {
                        name: 'Ana Jiménez',
                        phone: '+1 (809) 555-0125',
                        email: 'ana.jimenez@inmoges.com.do',
                        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
                    },
                    dateCreated: '2024-01-25',
                    status: 'available'
                },
                {
                    id: 'prop_4',
                    title: 'Terreno Comercial en Santiago',
                    type: 'terreno',
                    description: 'Excelente terreno comercial en zona de alto tráfico en Santiago. Ideal para desarrollo comercial o residencial. Todos los servicios disponibles.',
                    price: 120000,
                    location: 'santiago',
                    city: 'Santiago',
                    province: 'santiago',
                    address: 'Autopista Duarte, Km 2.5',
                    constructionSize: 0,
                    landSize: 800,
                    bedrooms: 0,
                    bathrooms: 0,
                    parking: 0,
                    yearBuilt: null,
                    features: [],
                    images: [
                        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
                    ],
                    agent: {
                        name: 'Roberto Silva',
                        phone: '+1 (809) 555-0126',
                        email: 'roberto.silva@inmoges.com.do',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                    },
                    dateCreated: '2024-01-30',
                    status: 'available'
                },
                {
                    id: 'prop_5',
                    title: 'Penthouse en Torre Premium',
                    type: 'apartamento',
                    description: 'Exclusivo penthouse en la torre más prestigiosa de la ciudad. 4 habitaciones, 3 baños, terraza privada de 100m² con jacuzzi y vista 360°.',
                    price: 520000,
                    location: 'santo-domingo',
                    city: 'Santo Domingo',
                    province: 'distrito-nacional',
                    address: 'Av. Winston Churchill, Torre Acropolis',
                    constructionSize: 280,
                    landSize: 0,
                    bedrooms: 4,
                    bathrooms: 3,
                    parking: 2,
                    yearBuilt: 2023,
                    features: ['terraza', 'aire-acondicionado', 'ascensor', 'seguridad', 'gimnasio', 'amueblada', 'cocina-equipada'],
                    images: [
                        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
                    ],
                    agent: {
                        name: 'Isabella Torres',
                        phone: '+1 (809) 555-0127',
                        email: 'isabella.torres@inmoges.com.do',
                        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
                    },
                    dateCreated: '2024-02-05',
                    status: 'available'
                }
            ];
            
            this.saveToLocalStorage();
        }
    }
    
    // ===== STORAGE METHODS =====
    loadFromLocalStorage() {
        try {
            this.properties = JSON.parse(localStorage.getItem('inmoges_properties') || '[]');
            this.purchases = JSON.parse(localStorage.getItem('inmoges_purchases') || '[]');
            this.contacts = JSON.parse(localStorage.getItem('inmoges_contacts') || '[]');
            this.sellers = JSON.parse(localStorage.getItem('inmoges_sellers') || '[]');
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.properties = [];
            this.purchases = [];
            this.contacts = [];
            this.sellers = [];
        }
    }
    
    saveToLocalStorage() {
        try {
            localStorage.setItem('inmoges_properties', JSON.stringify(this.properties));
            localStorage.setItem('inmoges_purchases', JSON.stringify(this.purchases));
            localStorage.setItem('inmoges_contacts', JSON.stringify(this.contacts));
            localStorage.setItem('inmoges_sellers', JSON.stringify(this.sellers));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    
    // ===== PROPERTY METHODS =====
    getAllProperties() {
        return this.properties;
    }
    
    getPropertyById(id) {
        return this.properties.find(property => property.id === id);
    }
    
    addProperty(propertyData) {
        const property = {
            id: this.generateId('prop'),
            ...propertyData,
            dateCreated: new Date().toISOString().split('T')[0],
            status: 'pending' // pending, available, sold
        };
        
        this.properties.unshift(property);
        this.saveToLocalStorage();
        return property;
    }
    
    updateProperty(id, updateData) {
        const index = this.properties.findIndex(property => property.id === id);
        if (index !== -1) {
            this.properties[index] = { ...this.properties[index], ...updateData };
            this.saveToLocalStorage();
            return this.properties[index];
        }
        return null;
    }
    
    deleteProperty(id) {
        const index = this.properties.findIndex(property => property.id === id);
        if (index !== -1) {
            this.properties.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }
    
    searchProperties(filters) {
        let filtered = [...this.properties];
        
        // Text search
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(property => 
                property.title.toLowerCase().includes(searchTerm) ||
                property.description.toLowerCase().includes(searchTerm) ||
                property.address.toLowerCase().includes(searchTerm) ||
                property.city.toLowerCase().includes(searchTerm)
            );
        }
        
        // Type filter
        if (filters.type) {
            filtered = filtered.filter(property => property.type === filters.type);
        }
        
        // Location filter
        if (filters.location) {
            filtered = filtered.filter(property => property.location === filters.location);
        }
        
        // Price range filter
        if (filters.minPrice) {
            filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
        }
        
        if (filters.maxPrice) {
            filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
        }
        
        // Size filter
        if (filters.minSize) {
            filtered = filtered.filter(property => property.constructionSize >= parseInt(filters.minSize));
        }
        
        // Status filter
        if (filters.status) {
            filtered = filtered.filter(property => property.status === filters.status);
        } else {
            // By default, only show available properties
            filtered = filtered.filter(property => property.status === 'available');
        }
        
        return filtered;
    }
    
    getRelatedProperties(propertyId, limit = 3) {
        const property = this.getPropertyById(propertyId);
        if (!property) return [];
        
        let related = this.properties.filter(p => 
            p.id !== propertyId && 
            p.status === 'available' &&
            (p.type === property.type || p.location === property.location)
        );
        
        // Sort by relevance (same type and location first)
        related.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;
            
            if (a.type === property.type) scoreA += 2;
            if (a.location === property.location) scoreA += 2;
            if (Math.abs(a.price - property.price) < property.price * 0.3) scoreA += 1;
            
            if (b.type === property.type) scoreB += 2;
            if (b.location === property.location) scoreB += 2;
            if (Math.abs(b.price - property.price) < property.price * 0.3) scoreB += 1;
            
            return scoreB - scoreA;
        });
        
        return related.slice(0, limit);
    }
    
    // ===== PURCHASE METHODS =====
    addPurchase(purchaseData) {
        const purchase = {
            id: this.generateId('pur'),
            ...purchaseData,
            dateCreated: new Date().toISOString(),
            status: 'pending' // pending, approved, completed, cancelled
        };
        
        this.purchases.unshift(purchase);
        this.saveToLocalStorage();
        return purchase;
    }
    
    getPurchaseById(id) {
        return this.purchases.find(purchase => purchase.id === id);
    }
    
    getAllPurchases() {
        return this.purchases;
    }
    
    // ===== CONTACT METHODS =====
    addContact(contactData) {
        const contact = {
            id: this.generateId('con'),
            ...contactData,
            dateCreated: new Date().toISOString(),
            status: 'new' // new, contacted, resolved
        };
        
        this.contacts.unshift(contact);
        this.saveToLocalStorage();
        return contact;
    }
    
    getAllContacts() {
        return this.contacts;
    }
    
    // ===== SELLER METHODS =====
    addSeller(sellerData) {
        const seller = {
            id: this.generateId('sel'),
            ...sellerData,
            dateCreated: new Date().toISOString(),
            status: 'new' // new, contacted, active
        };
        
        this.sellers.unshift(seller);
        this.saveToLocalStorage();
        return seller;
    }
    
    getAllSellers() {
        return this.sellers;
    }
    
    // ===== UTILITY METHODS =====
    generateId(prefix = 'id') {
        return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    getStats() {
        return {
            totalProperties: this.properties.length,
            availableProperties: this.properties.filter(p => p.status === 'available').length,
            soldProperties: this.properties.filter(p => p.status === 'sold').length,
            totalPurchases: this.purchases.length,
            pendingPurchases: this.purchases.filter(p => p.status === 'pending').length,
            totalContacts: this.contacts.length,
            newContacts: this.contacts.filter(c => c.status === 'new').length,
            totalSellers: this.sellers.length,
            newSellers: this.sellers.filter(s => s.status === 'new').length
        };
    }
    
    exportData() {
        return {
            properties: this.properties,
            purchases: this.purchases,
            contacts: this.contacts,
            sellers: this.sellers,
            exported: new Date().toISOString()
        };
    }
    
    importData(data) {
        if (data.properties) this.properties = data.properties;
        if (data.purchases) this.purchases = data.purchases;
        if (data.contacts) this.contacts = data.contacts;
        if (data.sellers) this.sellers = data.sellers;
        
        this.saveToLocalStorage();
    }
    
    clearAllData() {
        this.properties = [];
        this.purchases = [];
        this.contacts = [];
        this.sellers = [];
        
        localStorage.removeItem('inmoges_properties');
        localStorage.removeItem('inmoges_purchases');
        localStorage.removeItem('inmoges_contacts');
        localStorage.removeItem('inmoges_sellers');
    }
}

// ===== INITIALIZE DATABASE =====
const DB = new DatabaseManager();

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatabaseManager;
}