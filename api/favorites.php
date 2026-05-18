<?php
require_once '../includes/db.php';
require_once '../includes/auth.php';
requireLogin();

header('Content-Type: application/json');
$userId = currentUserId();
$method = $_SERVER['REQUEST_METHOD'];

// GET — list favorites
if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT f.*, b.name AS building_name FROM favorites f JOIN buildings b ON f.building_id = b.id WHERE f.user_id = ?");
    $stmt->execute([$userId]);
    echo json_encode($stmt->fetchAll());
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// POST — add favorite
if ($method === 'POST') {
    $buildingId = (int)($data['building_id'] ?? 0);
    if (!$buildingId) { echo json_encode(['error'=>'building_id required']); exit; }

    // Verify building exists
    $check = $pdo->prepare("SELECT id FROM buildings WHERE id = ?");
    $check->execute([$buildingId]);
    if (!$check->fetch()) { echo json_encode(['error'=>'Building not found']); exit; }

    // Check not already favorited
    $exist = $pdo->prepare("SELECT id FROM favorites WHERE user_id = ? AND building_id = ?");
    $exist->execute([$userId, $buildingId]);
    if ($exist->fetch()) { echo json_encode(['message'=>'Already favorited']); exit; }

    $ins = $pdo->prepare("INSERT INTO favorites (user_id, building_id) VALUES (?, ?)");
    $ins->execute([$userId, $buildingId]);
    echo json_encode(['success'=>true, 'id'=>$pdo->lastInsertId()]);
    exit;
}

// DELETE — remove favorite
if ($method === 'DELETE') {
    $buildingId = (int)($data['building_id'] ?? 0);
    $del = $pdo->prepare("DELETE FROM favorites WHERE user_id = ? AND building_id = ?");
    $del->execute([$userId, $buildingId]);
    echo json_encode(['success'=>true]);
    exit;
}

echo json_encode(['error'=>'Method not allowed']);
