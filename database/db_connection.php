<?php
// ===== CONEXIÓN A BASE DE DATOS =====
// Archivo: database/db_connection.php
// Descripción: Manejo de conexión y operaciones de base de datos para propiedades

class PropertyDatabase {
    private $host = 'localhost';
    private $dbname = 'inmoges_properties';
    private $username = 'root'; // Cambiar por tu usuario de MySQL
    private $password = '';     // Cambiar por tu contraseña de MySQL
    private $connection;
    
    public function __construct() {
        $this->connect();
    }
    
    // Conectar a la base de datos
    private function connect() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
    
    // Insertar nueva propiedad
    public function insertProperty($propertyData) {
        try {
            $sql = "INSERT INTO properties (
                id, title, property_type, description, address, city, province, 
                sector, zip_code, price, negotiable, construction_size, land_size, 
                bedrooms, bathrooms, parking_spaces, year_built, features,
                owner_name, owner_phone, owner_email, preferred_contact,
                sale_reason, urgency, additional_comments
            ) VALUES (
                :id, :title, :property_type, :description, :address, :city, :province,
                :sector, :zip_code, :price, :negotiable, :construction_size, :land_size,
                :bedrooms, :bathrooms, :parking_spaces, :year_built, :features,
                :owner_name, :owner_phone, :owner_email, :preferred_contact,
                :sale_reason, :urgency, :additional_comments
            )";
            
            $stmt = $this->connection->prepare($sql);
            
            $result = $stmt->execute([
                ':id' => $propertyData['id'],
                ':title' => $propertyData['title'],
                ':property_type' => $propertyData['property_type'],
                ':description' => $propertyData['description'],
                ':address' => $propertyData['address'],
                ':city' => $propertyData['city'],
                ':province' => $propertyData['province'],
                ':sector' => $propertyData['sector'] ?? null,
                ':zip_code' => $propertyData['zip_code'] ?? null,
                ':price' => $propertyData['price'],
                ':negotiable' => $propertyData['negotiable'] ? 1 : 0,
                ':construction_size' => $propertyData['construction_size'] ?? null,
                ':land_size' => $propertyData['land_size'] ?? null,
                ':bedrooms' => $propertyData['bedrooms'] ?? 0,
                ':bathrooms' => $propertyData['bathrooms'] ?? 0,
                ':parking_spaces' => $propertyData['parking_spaces'] ?? 0,
                ':year_built' => $propertyData['year_built'] ?? null,
                ':features' => json_encode($propertyData['features'] ?? []),
                ':owner_name' => $propertyData['owner_name'],
                ':owner_phone' => $propertyData['owner_phone'],
                ':owner_email' => $propertyData['owner_email'],
                ':preferred_contact' => $propertyData['preferred_contact'] ?? 'phone',
                ':sale_reason' => $propertyData['sale_reason'] ?? null,
                ':urgency' => $propertyData['urgency'] ?? 'flexible',
                ':additional_comments' => $propertyData['additional_comments'] ?? null
            ]);
            
            return $result;
            
        } catch (PDOException $e) {
            error_log("Error insertando propiedad: " . $e->getMessage());
            return false;
        }
    }
    
    // Insertar imágenes de la propiedad
    public function insertPropertyImages($propertyId, $images) {
        try {
            $sql = "INSERT INTO property_images (property_id, image_url, image_order, is_main, alt_text) 
                    VALUES (:property_id, :image_url, :image_order, :is_main, :alt_text)";
            
            $stmt = $this->connection->prepare($sql);
            
            foreach ($images as $index => $imageUrl) {
                $stmt->execute([
                    ':property_id' => $propertyId,
                    ':image_url' => $imageUrl,
                    ':image_order' => $index,
                    ':is_main' => $index === 0 ? 1 : 0, // Primera imagen como principal
                    ':alt_text' => "Imagen " . ($index + 1) . " de la propiedad"
                ]);
            }
            
            return true;
            
        } catch (PDOException $e) {
            error_log("Error insertando imágenes: " . $e->getMessage());
            return false;
        }
    }
    
    // Obtener todas las propiedades activas
    public function getAllActiveProperties() {
        try {
            $sql = "SELECT * FROM active_properties ORDER BY featured DESC, publish_date DESC";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
            
            return $stmt->fetchAll();
            
        } catch (PDOException $e) {
            error_log("Error obteniendo propiedades: " . $e->getMessage());
            return [];
        }
    }
    
    // Eliminar propiedad por ID
    public function deleteProperty($propertyId) {
        try {
            $sql = "CALL DeleteProperty(:property_id)";
            $stmt = $this->connection->prepare($sql);
            $result = $stmt->execute([':property_id' => $propertyId]);
            
            return $result;
            
        } catch (PDOException $e) {
            error_log("Error eliminando propiedad: " . $e->getMessage());
            return false;
        }
    }
    
    // Obtener estadísticas
    public function getStatistics() {
        try {
            $sql = "SELECT 
                        COUNT(*) as total_propiedades,
                        COUNT(CASE WHEN status = 'disponible' THEN 1 END) as disponibles,
                        COUNT(CASE WHEN status = 'vendida' THEN 1 END) as vendidas,
                        AVG(price) as precio_promedio,
                        MAX(price) as precio_maximo,
                        MIN(price) as precio_minimo
                    FROM properties";
            
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
            
            return $stmt->fetch();
            
        } catch (PDOException $e) {
            error_log("Error obteniendo estadísticas: " . $e->getMessage());
            return null;
        }
    }
    
    // Generar ID único para propiedad
    public function generatePropertyId() {
        $timestamp = time();
        $random = rand(100, 999);
        return "PROP" . substr($timestamp, -6) . $random;
    }
    
    // Cerrar conexión
    public function close() {
        $this->connection = null;
    }
}

// ===== API ENDPOINTS =====

// Manejar solicitudes AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $db = new PropertyDatabase();
    
    switch ($action) {
        case 'insert_property':
            $propertyData = json_decode($_POST['property_data'], true);
            $propertyData['id'] = $db->generatePropertyId();
            
            $result = $db->insertProperty($propertyData);
            
            if ($result && !empty($_POST['images'])) {
                $images = json_decode($_POST['images'], true);
                $db->insertPropertyImages($propertyData['id'], $images);
            }
            
            echo json_encode([
                'success' => $result,
                'property_id' => $propertyData['id'],
                'message' => $result ? 'Propiedad guardada exitosamente' : 'Error al guardar propiedad'
            ]);
            break;
            
        case 'get_properties':
            $properties = $db->getAllActiveProperties();
            echo json_encode($properties);
            break;
            
        case 'delete_property':
            $propertyId = $_POST['property_id'] ?? '';
            $result = $db->deleteProperty($propertyId);
            
            echo json_encode([
                'success' => $result,
                'message' => $result ? 'Propiedad eliminada exitosamente' : 'Error al eliminar propiedad'
            ]);
            break;
            
        case 'get_statistics':
            $stats = $db->getStatistics();
            echo json_encode($stats);
            break;
            
        default:
            echo json_encode(['error' => 'Acción no válida']);
            break;
    }
    
    $db->close();
}
?>