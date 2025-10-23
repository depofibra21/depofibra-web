<?php
// test.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode([
    'status' => 'success',
    'message' => 'El servidor PHP está funcionando correctamente',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
