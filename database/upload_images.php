<?php
// ===== SUBIDA DE IMÁGENES =====
// Archivo: database/upload_images.php
// Descripción: Maneja la subida de imágenes de propiedades

header('Content-Type: application/json');

// Configuración
$uploadDir = '../uploads/properties/';
$allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];
$maxFileSize = 5 * 1024 * 1024; // 5MB
$maxFiles = 10;

// Crear directorio si no existe
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Función para generar nombre único de archivo
function generateUniqueFileName($originalName) {
    $extension = pathinfo($originalName, PATHINFO_EXTENSION);
    $timestamp = time();
    $random = rand(1000, 9999);
    return $timestamp . '_' . $random . '.' . strtolower($extension);
}

// Función para redimensionar imagen
function resizeImage($sourcePath, $targetPath, $maxWidth = 800, $maxHeight = 600) {
    $imageInfo = getimagesize($sourcePath);
    
    if ($imageInfo === false) {
        return false;
    }
    
    $sourceWidth = $imageInfo[0];
    $sourceHeight = $imageInfo[1];
    $sourceType = $imageInfo[2];
    
    // Calcular nuevas dimensiones manteniendo proporción
    $ratio = min($maxWidth / $sourceWidth, $maxHeight / $sourceHeight);
    $newWidth = round($sourceWidth * $ratio);
    $newHeight = round($sourceHeight * $ratio);
    
    // Crear imagen desde archivo
    switch ($sourceType) {
        case IMAGETYPE_JPEG:
            $sourceImage = imagecreatefromjpeg($sourcePath);
            break;
        case IMAGETYPE_PNG:
            $sourceImage = imagecreatefrompng($sourcePath);
            break;
        case IMAGETYPE_WEBP:
            $sourceImage = imagecreatefromwebp($sourcePath);
            break;
        default:
            return false;
    }
    
    // Crear nueva imagen
    $targetImage = imagecreatetruecolor($newWidth, $newHeight);
    
    // Preservar transparencia para PNG
    if ($sourceType == IMAGETYPE_PNG) {
        imagealphablending($targetImage, false);
        imagesavealpha($targetImage, true);
        $transparent = imagecolorallocatealpha($targetImage, 255, 255, 255, 127);
        imagefilledrectangle($targetImage, 0, 0, $newWidth, $newHeight, $transparent);
    }
    
    // Redimensionar
    imagecopyresampled(
        $targetImage, $sourceImage,
        0, 0, 0, 0,
        $newWidth, $newHeight,
        $sourceWidth, $sourceHeight
    );
    
    // Guardar imagen redimensionada
    switch ($sourceType) {
        case IMAGETYPE_JPEG:
            $result = imagejpeg($targetImage, $targetPath, 85);
            break;
        case IMAGETYPE_PNG:
            $result = imagepng($targetImage, $targetPath, 8);
            break;
        case IMAGETYPE_WEBP:
            $result = imagewebp($targetImage, $targetPath, 85);
            break;
        default:
            $result = false;
    }
    
    // Limpiar memoria
    imagedestroy($sourceImage);
    imagedestroy($targetImage);
    
    return $result;
}

// Procesar subida de imágenes
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['images'])) {
    $uploadedFiles = [];
    $errors = [];
    
    $files = $_FILES['images'];
    $fileCount = count($files['name']);
    
    // Validar número de archivos
    if ($fileCount > $maxFiles) {
        echo json_encode([
            'success' => false,
            'error' => "Máximo {$maxFiles} archivos permitidos"
        ]);
        exit;
    }
    
    // Procesar cada archivo
    for ($i = 0; $i < $fileCount; $i++) {
        $fileName = $files['name'][$i];
        $fileTmp = $files['tmp_name'][$i];
        $fileSize = $files['size'][$i];
        $fileError = $files['error'][$i];
        
        // Verificar errores de subida
        if ($fileError !== UPLOAD_ERR_OK) {
            $errors[] = "Error subiendo {$fileName}";
            continue;
        }
        
        // Verificar tamaño
        if ($fileSize > $maxFileSize) {
            $errors[] = "{$fileName} excede el tamaño máximo de 5MB";
            continue;
        }
        
        // Verificar tipo de archivo
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        if (!in_array($fileExtension, $allowedTypes)) {
            $errors[] = "{$fileName} no es un tipo de archivo válido";
            continue;
        }
        
        // Verificar que es realmente una imagen
        $imageInfo = getimagesize($fileTmp);
        if ($imageInfo === false) {
            $errors[] = "{$fileName} no es una imagen válida";
            continue;
        }
        
        // Generar nombres únicos
        $uniqueName = generateUniqueFileName($fileName);
        $thumbnailName = 'thumb_' . $uniqueName;
        
        $targetPath = $uploadDir . $uniqueName;
        $thumbnailPath = $uploadDir . $thumbnailName;
        
        // Subir imagen original redimensionada
        if (resizeImage($fileTmp, $targetPath, 1200, 900)) {
            // Crear thumbnail
            resizeImage($targetPath, $thumbnailPath, 300, 225);
            
            $uploadedFiles[] = [
                'original' => 'uploads/properties/' . $uniqueName,
                'thumbnail' => 'uploads/properties/' . $thumbnailName,
                'filename' => $fileName
            ];
        } else {
            $errors[] = "Error procesando {$fileName}";
        }
    }
    
    // Respuesta
    echo json_encode([
        'success' => count($uploadedFiles) > 0,
        'files' => $uploadedFiles,
        'errors' => $errors,
        'total_uploaded' => count($uploadedFiles)
    ]);
    
} else {
    echo json_encode([
        'success' => false,
        'error' => 'No se recibieron archivos'
    ]);
}
?>