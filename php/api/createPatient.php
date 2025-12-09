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

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit;
}

$requiredFields = ['nom', 'cognoms', 'dataNaixement', 'dni', 'poblacio', 'cip'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "No data in $field"]);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO pacients (nom, cognoms, dataNaixement, dni, poblacio, cip)
        VALUES (:nom, :cognoms, :dataNaixement, :dni, :poblacio, :cip)
    ");

    $stmt->execute([
        ':nom' => $input['nom'],
        ':cognoms' => $input['cognoms'],
        ':dataNaixement' => $input['dataNaixement'],
        ':dni' => $input['dni'],
        ':poblacio' => $input['poblacio'],
        ':cip' => $input['cip']
    ]);

      $id = $pdo->lastInsertId();

      $stmt = $pdo->prepare("SELECT * FROM pacients WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $newPatient = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'message' => 'Patient created successfully',
        'patient' => $newPatient
    ]);
} 
catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error inserting patient: ' . $e->getMessage()
    ]);
}