<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Forbidden method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Incomplete data']);
    exit;
}

$id = $input['id'];
$nom = $input['nom'] ?? '';
$cognoms = $input['cognoms'] ?? '';
$dataNaixement = $input['dataNaixement'] ?? '';
$dni = $input['dni'] ?? '';
$poblacio = $input['poblacio'] ?? '';
$cip = $input['cip'] ?? '';

try {
    $stmt = $pdo->prepare("
        UPDATE pacients SET
            nom = :nom,
            cognoms = :cognoms,
            dataNaixement = :dataNaixement,
            dni = :dni,
            poblacio = :poblacio,
            cip = :cip
        WHERE id = :id
    ");

    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':cognoms', $cognoms);
    $stmt->bindParam(':dataNaixement', $dataNaixement);
    $stmt->bindParam(':dni', $dni);
    $stmt->bindParam(':poblacio', $poblacio);
    $stmt->bindParam(':cip', $cip);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Patient edited successfully',
        'patient' => $input
    ]);

} 
catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}