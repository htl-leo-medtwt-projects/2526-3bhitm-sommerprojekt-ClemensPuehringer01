<?php
// MYSQL DATABASE
$servername = "db_server";
$port = 3306;
$username = "zauberbuch";
$password = "Zauber123";
$dbname = "zauberbuch";

// Verbindung erstellen
$conn = new mysqli(
    hostname: $servername,
    username: $username,
    password: $password,
    database: $dbname,
    port: $port
);

// Zeichensatz
$conn->set_charset("utf8mb4");

// Verbindung prüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>