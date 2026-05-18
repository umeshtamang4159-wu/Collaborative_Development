<?php
function isLoggedIn(): bool {
    return !empty($_SESSION['user_id']);
}

function requireLogin(): void {
    if (!isLoggedIn()) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['error' => 'Not authenticated']);
        exit;
    }
}

function currentUserId(): ?int {
    return $_SESSION['user_id'] ?? null;
}

function currentUserEmail(): ?string {
    return $_SESSION['user_email'] ?? null;
}
