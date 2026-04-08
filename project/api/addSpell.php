<?php
session_start();
require_once "db.php";

header("Content-Type: application/json");

// Nur eingeloggte User dürfen hochladen
if (!isset($_SESSION["userId"])) {
    http_response_code(401);

    echo json_encode([
        "success" => false,
        "message" => "Nicht eingeloggt"
    ]);
    exit;
}

// JSON Daten holen
$data = json_decode(file_get_contents("php://input"), true);

// Kleine Validierung
if (
    empty($data["zauberName"]) ||
    empty($data["schulenId"]) ||
    !isset($data["stufe"]) ||
    empty($data["beschreibung"])
) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Pflichtfelder fehlen"
    ]);
    exit;
}

// User nur aus Session
$userId = $_SESSION["userId"];

// Optionale Werte
$avgDmg = $data["avgDmg"] ?? null;
$materKompDet = $data["materKompDet"] ?? null;

$verbalKomp = isset($data["verbalKomp"]) ? (int)$data["verbalKomp"] : 0;
$gestKomp = isset($data["gestKomp"]) ? (int)$data["gestKomp"] : 0;
$materKomp = isset($data["materKomp"]) ? (int)$data["materKomp"] : 0;

$sql = "
INSERT INTO zauber (
    zauberName,
    schulenId,
    stufe,
    avgDmg,
    zeitaufwand,
    zeiteinheit,
    reichweite,
    verbalKomp,
    gestKomp,
    materKomp,
    materKompDet,
    wirkungsdauer,
    wirkungsdauerEinheit,
    beschreibung,
    userId
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "siiiisiiiisissi",
    $data["zauberName"],
    $data["schulenId"],
    $data["stufe"],
    $avgDmg,
    $data["zeitaufwand"],
    $data["zeiteinheit"],
    $data["reichweite"],
    $verbalKomp,
    $gestKomp,
    $materKomp,
    $materKompDet,
    $data["wirkungsdauer"],
    $data["wirkungsdauerEinheit"],
    $data["beschreibung"],
    $userId
);

if (!$stmt->execute()) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Fehler beim Speichern"
    ]);
    exit;
}

$zauberId = $conn->insert_id;

// Klassen speichern
if (!empty($data["klassenIds"]) && is_array($data["klassenIds"])) {
    $stmtClass = $conn->prepare(
        "INSERT INTO zauber_klasse (zauberId, klassenId) VALUES (?, ?)"
    );

    foreach ($data["klassenIds"] as $klasseId) {
        $klasseId = (int)$klasseId;
        $stmtClass->bind_param("ii", $zauberId, $klasseId);
        $stmtClass->execute();
    }
}

echo json_encode([
    "success" => true,
    "zauberId" => $zauberId
]);
?>