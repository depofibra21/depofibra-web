<?php
// config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'depofibra_reviews');
define('DB_USER', 'tu_usuario_mysql');
define('DB_PASS', 'tu_password_mysql');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("ERROR: No se pudo conectar. " . $e->getMessage());
}
?>
