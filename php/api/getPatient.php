<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . '/../config.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'id parameter missing']);
    exit;
}
$id = $_GET['id'];

try {
    $stmt = $pdo->prepare("SELECT * FROM pacients WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    $patient = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($patient) {
        echo json_encode($patient);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Patient not found']);
    }
} 
catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
