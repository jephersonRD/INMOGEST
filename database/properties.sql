-- ===== BASE DE DATOS DE PROPIEDADES INMOBILIARIAS =====
-- Archivo: database/properties.sql
-- Descripción: Esquema de base de datos para gestionar propiedades inmobiliarias

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS inmoges_properties;
USE inmoges_properties;

-- ===== TABLA DE PROPIEDADES =====
CREATE TABLE properties (
    -- Identificadores
    id VARCHAR(20) PRIMARY KEY,
    property_number INT AUTO_INCREMENT UNIQUE,
    
    -- Información Básica
    title VARCHAR(255) NOT NULL,
    property_type ENUM('Casa', 'Apartamento', 'Terreno', 'Comercial', 'Industrial', 'Oficina', 'Local') NOT NULL,
    description TEXT NOT NULL,
    
    -- Ubicación
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    sector VARCHAR(100),
    zip_code VARCHAR(20),
    coordinates_lat DECIMAL(10, 8),
    coordinates_lng DECIMAL(11, 8),
    
    -- Información Financiera
    price DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(5) DEFAULT 'USD',
    negotiable BOOLEAN DEFAULT FALSE,
    
    -- Características Físicas
    construction_size DECIMAL(10, 2),
    land_size DECIMAL(10, 2),
    bedrooms INT DEFAULT 0,
    bathrooms DECIMAL(3, 1) DEFAULT 0,
    parking_spaces INT DEFAULT 0,
    year_built INT,
    floors INT DEFAULT 1,
    
    -- Características Especiales
    features JSON, -- ['piscina', 'jardín', 'balcón', etc.]
    
    -- Información del Propietario
    owner_name VARCHAR(100) NOT NULL,
    owner_phone VARCHAR(20) NOT NULL,
    owner_email VARCHAR(100) NOT NULL,
    preferred_contact ENUM('phone', 'email', 'whatsapp') DEFAULT 'phone',
    
    -- Información de Venta
    sale_reason TEXT,
    urgency ENUM('flexible', 'normal', 'urgente') DEFAULT 'normal',
    additional_comments TEXT,
    
    -- Estado y Gestión
    status ENUM('disponible', 'vendida', 'reservada', 'retirada') DEFAULT 'disponible',
    featured BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE,
    
    -- Fechas
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    sold_date TIMESTAMP NULL,
    
    -- Métricas
    views_count INT DEFAULT 0,
    favorites_count INT DEFAULT 0,
    inquiries_count INT DEFAULT 0,
    
    -- Índices para optimización
    INDEX idx_status (status),
    INDEX idx_property_type (property_type),
    INDEX idx_city (city),
    INDEX idx_price (price),
    INDEX idx_publish_date (publish_date),
    INDEX idx_featured (featured)
);

-- ===== TABLA DE IMÁGENES =====
CREATE TABLE property_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id VARCHAR(20),
    image_url VARCHAR(500) NOT NULL,
    image_order INT DEFAULT 0,
    is_main BOOLEAN DEFAULT FALSE,
    alt_text VARCHAR(255),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property_images (property_id),
    INDEX idx_main_image (property_id, is_main)
);

-- ===== TABLA DE FAVORITOS =====
CREATE TABLE property_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id VARCHAR(20),
    user_ip VARCHAR(45),
    user_session VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (property_id, user_ip),
    INDEX idx_property_favorites (property_id)
);

-- ===== TABLA DE CONSULTAS =====
CREATE TABLE property_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id VARCHAR(20),
    inquirer_name VARCHAR(100) NOT NULL,
    inquirer_phone VARCHAR(20),
    inquirer_email VARCHAR(100) NOT NULL,
    message TEXT,
    inquiry_type ENUM('info', 'visit', 'offer') DEFAULT 'info',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('nueva', 'respondida', 'cerrada') DEFAULT 'nueva',
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property_inquiries (property_id),
    INDEX idx_inquiry_date (created_date),
    INDEX idx_inquiry_status (status)
);

-- ===== VISTA DE PROPIEDADES ACTIVAS =====
CREATE VIEW active_properties AS
SELECT 
    p.*,
    COUNT(DISTINCT pi.id) as image_count,
    COUNT(DISTINCT pf.id) as favorites_count_real,
    COUNT(DISTINCT pr.id) as inquiries_count_real,
    GROUP_CONCAT(DISTINCT pi.image_url ORDER BY pi.image_order) as all_images,
    MAX(CASE WHEN pi.is_main = 1 THEN pi.image_url END) as main_image
FROM properties p
LEFT JOIN property_images pi ON p.id = pi.property_id
LEFT JOIN property_favorites pf ON p.id = pf.property_id
LEFT JOIN property_inquiries pr ON p.id = pr.property_id
WHERE p.status = 'disponible'
GROUP BY p.id
ORDER BY p.featured DESC, p.publish_date DESC;

-- ===== FUNCIONES ÚTILES =====

-- Función para generar ID único de propiedad
DELIMITER $$
CREATE FUNCTION generate_property_id() RETURNS VARCHAR(20)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE new_id VARCHAR(20);
    DECLARE counter INT DEFAULT 1;
    
    REPEAT
        SET new_id = CONCAT('PROP', UNIX_TIMESTAMP(), LPAD(counter, 3, '0'));
        SET counter = counter + 1;
    UNTIL (SELECT COUNT(*) FROM properties WHERE id = new_id) = 0
    END REPEAT;
    
    RETURN new_id;
END$$
DELIMITER ;

-- ===== PROCEDIMIENTOS ALMACENADOS =====

-- Procedimiento para insertar nueva propiedad
DELIMITER $$
CREATE PROCEDURE InsertProperty(
    IN p_title VARCHAR(255),
    IN p_type VARCHAR(50),
    IN p_description TEXT,
    IN p_address VARCHAR(255),
    IN p_city VARCHAR(100),
    IN p_province VARCHAR(100),
    IN p_price DECIMAL(15,2),
    IN p_owner_name VARCHAR(100),
    IN p_owner_phone VARCHAR(20),
    IN p_owner_email VARCHAR(100),
    OUT p_property_id VARCHAR(20)
)
BEGIN
    DECLARE new_id VARCHAR(20);
    
    SET new_id = generate_property_id();
    
    INSERT INTO properties (
        id, title, property_type, description, address, city, province, 
        price, owner_name, owner_phone, owner_email
    ) VALUES (
        new_id, p_title, p_type, p_description, p_address, p_city, p_province,
        p_price, p_owner_name, p_owner_phone, p_owner_email
    );
    
    SET p_property_id = new_id;
END$$
DELIMITER ;

-- Procedimiento para eliminar propiedad completa
DELIMITER $$
CREATE PROCEDURE DeleteProperty(IN property_id VARCHAR(20))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Eliminar imágenes
    DELETE FROM property_images WHERE property_id = property_id;
    
    -- Eliminar favoritos
    DELETE FROM property_favorites WHERE property_id = property_id;
    
    -- Eliminar consultas
    DELETE FROM property_inquiries WHERE property_id = property_id;
    
    -- Eliminar propiedad
    DELETE FROM properties WHERE id = property_id;
    
    COMMIT;
END$$
DELIMITER ;

-- ===== DATOS DE EJEMPLO =====
-- Insertar algunas propiedades de ejemplo

CALL InsertProperty(
    'Casa moderna en Bella Vista',
    'Casa',
    'Hermosa casa de 3 habitaciones con piscina y jardín. Ubicada en zona residencial exclusiva.',
    'Calle Principal #123',
    'Santo Domingo',
    'Distrito Nacional',
    285000.00,
    'María García',
    '809-555-0123',
    'maria.garcia@email.com',
    @prop1_id
);

-- Agregar imágenes a la primera propiedad
INSERT INTO property_images (property_id, image_url, image_order, is_main, alt_text) VALUES
(@prop1_id, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600', 0, TRUE, 'Fachada principal'),
(@prop1_id, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600', 1, FALSE, 'Sala de estar'),
(@prop1_id, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600', 2, FALSE, 'Cocina');

-- ===== CONSULTAS ÚTILES PARA ADMINISTRACIÓN =====

-- Ver todas las propiedades activas
-- SELECT * FROM active_properties;

-- Buscar propiedades por ciudad
-- SELECT * FROM properties WHERE city = 'Santo Domingo' AND status = 'disponible';

-- Propiedades más vistas
-- SELECT id, title, views_count FROM properties ORDER BY views_count DESC LIMIT 10;

-- Estadísticas generales
-- SELECT 
--     COUNT(*) as total_propiedades,
--     COUNT(CASE WHEN status = 'disponible' THEN 1 END) as disponibles,
--     COUNT(CASE WHEN status = 'vendida' THEN 1 END) as vendidas,
--     AVG(price) as precio_promedio,
--     MAX(price) as precio_maximo,
--     MIN(price) as precio_minimo
-- FROM properties;

-- ===== COMENTARIOS DE USO =====
/*
INSTRUCCIONES PARA USAR ESTA BASE DE DATOS:

1. INSTALACIÓN:
   - Ejecutar este archivo SQL en MySQL/MariaDB
   - Se creará la base de datos 'inmoges_properties' con todas las tablas

2. CONEXIÓN DESDE PHP:
   - Host: localhost
   - Usuario: tu_usuario_mysql
   - Contraseña: tu_contraseña_mysql
   - Base de datos: inmoges_properties

3. INSERTAR NUEVA PROPIEDAD:
   CALL InsertProperty('Título', 'Casa', 'Descripción...', 'Dirección', 'Ciudad', 'Provincia', 250000, 'Propietario', 'Teléfono', 'Email', @id);

4. ELIMINAR PROPIEDAD:
   CALL DeleteProperty('PROP123456789');

5. VER PROPIEDADES ACTIVAS:
   SELECT * FROM active_properties;

6. ESTADÍSTICAS:
   SELECT COUNT(*) FROM properties WHERE status = 'disponible';
*/