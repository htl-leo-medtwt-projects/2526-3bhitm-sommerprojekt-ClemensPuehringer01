<?php
session_start();

echo json_encode([
    "loggedIn" => isset($_SESSION["loggedIn"]),
    "userId" => $_SESSION["userId"] ?? null,
    "username" => $_SESSION["username"] ?? null
]);
?>