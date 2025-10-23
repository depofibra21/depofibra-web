<?php
// api/reviews.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Simular base de datos temporalmente (para pruebas)
$reviews = [
    [
        'id' => 1,
        'user_name' => 'Cliente de Prueba',
        'rating' => 5,
        'comment' => 'Esta es una reseña de prueba para verificar que el sistema funciona.',
        'created_at' => '2024-01-15 10:00:00'
    ],
    [
        'id' => 2, 
        'user_name' => 'Otro Cliente',
        'rating' => 4,
        'comment' => 'Otra reseña de prueba para mostrar en la lista.',
        'created_at' => '2024-01-14 15:30:00'
    ]
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Registrar en log para debugging
    error_log("Solicitud GET recibida en reviews.php");
    
    echo json_encode($reviews);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Registrar los datos recibidos
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    error_log("Datos POST recibidos: " . print_r($data, true));
    
    if ($data && isset($data['name']) && isset($data['rating']) && isset($data['comment'])) {
        // Simular guardado exitoso
        $newReview = [
            'id' => count($reviews) + 1,
            'user_name' => $data['name'],
            'rating' => (int)$data['rating'],
            'comment' => $data['comment'],
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        // En un sistema real, aquí guardarías en la base de datos
        // $reviews[] = $newReview;
        
        echo json_encode([
            'success' => true, 
            'message' => 'Reseña publicada correctamente (modo prueba)',
            'review' => $newReview
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Datos incompletos: ' . print_r($data, true)
        ]);
    }
    exit;
}

// Si llega aquí, método no soportado
echo json_encode(['success' => false, 'message' => 'Método no soportado']);
?>
