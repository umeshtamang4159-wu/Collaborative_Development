<?php
require_once '../includes/db.php';
require_once '../includes/auth.php';

header('Content-Type: application/json');

if (!isLoggedIn()) {
    echo json_encode(['authenticated' => false]);
    exit;
}

echo json_encode([
    'authenticated' => true,
    'id'            => currentUserId(),
    'email'         => currentUserEmail(),
    'name'          => $_SESSION['user_name'] ?? '',
]);
