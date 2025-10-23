<?php
// api/reviews.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener todas las reseñas aprobadas
    $stmt = $pdo->query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($reviews);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Agregar nueva reseña
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $rating = filter_var($data['rating'], FILTER_VALIDATE_INT);
    $comment = filter_var($data['comment'], FILTER_SANITIZE_STRING);
    
    if ($name && $rating && $comment) {
        $stmt = $pdo->prepare("INSERT INTO reviews (user_name, user_email, rating, comment) VALUES (?, ?, ?, ?)");
        
        if ($stmt->execute([$name, $email, $rating, $comment])) {
            echo json_encode(['success' => true, 'message' => 'Reseña publicada correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al publicar la reseña']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    }
}
?>