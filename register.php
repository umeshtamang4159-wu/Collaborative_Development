<?php
require_once 'includes/db.php';
require_once 'includes/auth.php';

if (isLoggedIn()) {
    header('Location: index.html');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name     = trim($_POST['name'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($name && $email && $password) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $error = 'An account with this email already exists.';
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)");
            $stmt->execute([$name, $email, $hash]);
            $userId = $pdo->lastInsertId();
            $_SESSION['user_id']    = $userId;
            $_SESSION['user_email'] = $email;
            $_SESSION['user_name']  = $name;
            header('Location: index.html');
            exit;
        }
    } else {
        $error = 'Please fill in all fields.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Register – UoW Navigator</title>
  <link rel="stylesheet" href="css/style.css"/>
</head>
<body class="auth-page">
  <div class="auth-card">
    <h2>UoW <span class="accent">Navigator</span></h2>
    <p class="auth-sub">Create your account</p>
    <?php if ($error): ?>
      <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="POST">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" name="name" required value="<?= htmlspecialchars($_POST['name'] ?? '') ?>"/>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" name="email" required value="<?= htmlspecialchars($_POST['email'] ?? '') ?>"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" name="password" required minlength="6"/>
      </div>
      <button type="submit" class="btn btn-maroon btn-full">Create Account</button>
    </form>
    <p class="auth-footer">Already have an account? <a href="login.php">Log in</a></p>
  </div>
</body>
</html>
