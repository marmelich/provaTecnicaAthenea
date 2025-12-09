<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . '/../config.php';

try {
    $stmt = $pdo->query("SELECT * FROM pacients");
    $pacients = $stmt->fetchAll();
    echo json_encode($pacients);
} 
catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
