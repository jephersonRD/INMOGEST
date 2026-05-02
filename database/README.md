# 🏠 Sistema de Propiedades INMOGEST SRL - Base de Datos

## 📋 Resumen de Cambios Implementados

### ✅ **1. Publicación Inmediata de Propiedades**
- Las propiedades ahora se publican **instantáneamente** en la web
- No hay espera de 24 horas
- Aparecen inmediatamente en la página de propiedades

### ✅ **2. Sección de Imágenes Simplificada**
- Se eliminó la sección duplicada de "Fotos de la Propiedad"
- Ahora hay solo una sección de imágenes funcional
- Sistema de subida de imágenes mejorado con preview

### ✅ **3. Base de Datos SQL Completa**
- Esquema completo en `properties.sql`
- Tablas para propiedades, imágenes, favoritos y consultas
- Procedimientos almacenados para gestión profesional

### ✅ **4. Archivos Creados**

```
database/
├── properties.sql          # Esquema completo de base de datos
├── db_connection.php       # Conexión y operaciones PHP
├── upload_images.php       # Subida de imágenes
└── README.md              # Este archivo
```

---

## 🚀 Instalación del Sistema

### **Paso 1: Configurar Base de Datos**

1. **Abrir phpMyAdmin o MySQL Workbench**
2. **Ejecutar el archivo `properties.sql`:**
   ```sql
   SOURCE /ruta/a/database/properties.sql;
   ```
3. **Se creará automáticamente:**
   - Base de datos: `inmoges_properties`
   - Tablas: `properties`, `property_images`, `property_favorites`, `property_inquiries`
   - Vistas: `active_properties`
   - Procedimientos: `InsertProperty`, `DeleteProperty`

### **Paso 2: Configurar PHP**

1. **Editar `db_connection.php`** líneas 8-11:
   ```php
   private $host = 'localhost';       // Tu servidor MySQL
   private $dbname = 'inmoges_properties';
   private $username = 'tu_usuario';   // Tu usuario MySQL
   private $password = 'tu_password';  // Tu contraseña MySQL
   ```

2. **Crear carpeta de uploads:**
   ```bash
   mkdir uploads/properties
   chmod 755 uploads/properties
   ```

### **Paso 3: Conectar JavaScript con PHP**

Actualizar `assets/js/sell.js` para usar la base de datos real:

```javascript
// Reemplazar función savePropertyToDatabase
function savePropertyToDatabase(propertyData) {
    // Convertir imágenes a URLs reales
    const formData = new FormData();
    formData.append('action', 'insert_property');
    formData.append('property_data', JSON.stringify(propertyData));
    
    // Subir imágenes primero
    const selectedFiles = window.getSelectedFiles ? window.getSelectedFiles() : [];
    if (selectedFiles.length > 0) {
        const imageFormData = new FormData();
        selectedFiles.forEach(file => {
            imageFormData.append('images[]', file);
        });
        
        // Subir imágenes
        fetch('database/upload_images.php', {
            method: 'POST',
            body: imageFormData
        })
        .then(response => response.json())
        .then(imageResult => {
            if (imageResult.success) {
                // Agregar URLs de imágenes a los datos
                const imageUrls = imageResult.files.map(file => file.original);
                formData.append('images', JSON.stringify(imageUrls));
            }
            
            // Guardar propiedad en base de datos
            return fetch('database/db_connection.php', {
                method: 'POST',
                body: formData
            });
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log('Propiedad guardada en base de datos:', result.property_id);
                showSuccessModal(result.property_id);
                
                // Recargar propiedades en la página
                if (typeof window.loadProperties === 'function') {
                    window.loadProperties();
                }
            } else {
                alert('Error guardando propiedad: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de conexión con el servidor');
        });
    }
}
```

---

## 🗂️ Estructura de la Base de Datos

### **Tabla: `properties`**
```sql
- id (VARCHAR) - ID único de la propiedad
- title (VARCHAR) - Título de la propiedad
- property_type (ENUM) - Casa, Apartamento, Terreno, etc.
- description (TEXT) - Descripción detallada
- address, city, province - Ubicación
- price (DECIMAL) - Precio
- construction_size, land_size - Áreas
- bedrooms, bathrooms, parking_spaces - Características
- owner_name, owner_phone, owner_email - Contacto
- status (ENUM) - disponible, vendida, reservada
- publish_date, updated_date - Fechas
```

### **Tabla: `property_images`**
```sql
- id (INT) - ID único de la imagen
- property_id (VARCHAR) - Referencia a propiedad
- image_url (VARCHAR) - URL de la imagen
- is_main (BOOLEAN) - Si es imagen principal
- image_order (INT) - Orden de la imagen
```

---

## 📊 Administración de Propiedades

### **Ver todas las propiedades:**
```sql
SELECT * FROM active_properties;
```

### **Eliminar propiedad:**
```sql
CALL DeleteProperty('PROP123456789');
```

### **Estadísticas:**
```sql
SELECT 
    COUNT(*) as total_propiedades,
    COUNT(CASE WHEN status = 'disponible' THEN 1 END) as disponibles,
    AVG(price) as precio_promedio
FROM properties;
```

### **Desde JavaScript (consola del navegador):**
```javascript
// Listar todas las propiedades
listAllProperties()

// Eliminar una propiedad
deleteProperty('PROP123456789')
```

---

## 🔧 Funciones PHP Disponibles

### **PropertyDatabase Class:**

```php
$db = new PropertyDatabase();

// Insertar propiedad
$db->insertProperty($propertyData);

// Insertar imágenes
$db->insertPropertyImages($propertyId, $imageUrls);

// Obtener propiedades activas
$properties = $db->getAllActiveProperties();

// Eliminar propiedad
$db->deleteProperty($propertyId);

// Estadísticas
$stats = $db->getStatistics();
```

---

## ⚡ Verificar que Todo Funciona

1. **Llenar formulario** en vender.html
2. **Hacer clic** en "Publicar Propiedad"
3. **Verificar en phpMyAdmin** que se creó el registro
4. **Ir a propiedades.html** y ver que aparece la nueva propiedad
5. **Comprobar imágenes** en la carpeta uploads/properties/

---

## 🚨 Problemas Comunes y Soluciones

### **Error: "Access denied for user"**
```php
// Verificar credenciales en db_connection.php
private $username = 'tu_usuario_correcto';
private $password = 'tu_password_correcto';
```

### **Error: "Table doesn't exist"**
```sql
-- Ejecutar nuevamente el archivo properties.sql
SOURCE database/properties.sql;
```

### **Imágenes no se suben**
```bash
# Verificar permisos de carpeta
chmod 755 uploads/properties/
```

### **Propiedades no aparecen en la web**
```javascript
// En la consola del navegador
localStorage.clear(); // Limpiar cache
window.location.reload(); // Recargar página
```

---

## 🎯 Beneficios del Nuevo Sistema

- ✅ **Publicación instantánea** de propiedades
- ✅ **Base de datos profesional** con SQL
- ✅ **Gestión de imágenes** optimizada
- ✅ **Administración fácil** desde phpMyAdmin
- ✅ **Escalabilidad** para crecimiento futuro
- ✅ **Backup automático** de base de datos
- ✅ **Consultas eficientes** con índices
- ✅ **Integridad de datos** con foreign keys

---

## 📞 Soporte

Si tienes problemas implementando el sistema:

1. Verificar que MySQL esté ejecutándose
2. Comprobar credenciales de base de datos
3. Revisar permisos de archivos
4. Verificar logs de error de PHP

**¡El sistema está listo para uso profesional!** 🚀