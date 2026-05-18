<?php
require_once '../includes/db.php';
header('Content-Type: application/json');

$campus   = $_GET['campus']   ?? '';
$category = $_GET['category'] ?? '';
$search   = $_GET['search']   ?? '';

$where  = [];
$params = [];

if ($campus && $campus !== 'all') {
    $where[]  = 'campus = ?';
    $params[] = $campus;
}
if ($category && $category !== 'all') {
    $where[]  = 'category = ?';
    $params[] = $category;
}
if ($search) {
    $where[]  = '(name LIKE ? OR code LIKE ? OR description LIKE ?)';
    $like     = '%' . $search . '%';
    $params[] = $like;
    $params[] = $like;
    $params[] = $like;
}

$sql = "SELECT * FROM buildings";
if ($where) {
    $sql .= " WHERE " . implode(' AND ', $where);
}
$sql .= " ORDER BY name ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

// Decode JSON-stored arrays
foreach ($rows as &$r) {
    $r['facilities']    = json_decode($r['facilities'] ?? '[]', true);
    $r['accessibility'] = json_decode($r['accessibility'] ?? '[]', true);
}

echo json_encode($rows);
