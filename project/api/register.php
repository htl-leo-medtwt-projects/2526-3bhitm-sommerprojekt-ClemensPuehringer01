<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"]);
$password = $data["password"];

// Passwort hashen
$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
    INSERT INTO users (username, passwort)
    VALUES (?, ?)
");

$stmt->bind_param("ss", $username, $hash);

$success = $stmt->execute();

header("Content-Type: application/json");

echo json_encode([
    "success" => $success
]);
?>