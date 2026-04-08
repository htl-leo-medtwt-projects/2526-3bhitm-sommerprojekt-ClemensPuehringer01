<?php
session_start();
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"]);
$password = $data["password"];

$stmt = $conn->prepare("
    SELECT userId, username, passwort
    FROM users
    WHERE username = ?
    LIMIT 1
");

$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

header("Content-Type: application/json");

if ($user && password_verify($password, $user["passwort"])) {
    session_regenerate_id(true);

    $_SESSION["userId"] = $user["userId"];
    $_SESSION["username"] = $user["username"];
    $_SESSION["loggedIn"] = true;

    echo json_encode([
        "success" => true,
        "userId" => $user["userId"],
        "username" => $user["username"]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Falscher Login"
    ]);
}
?>