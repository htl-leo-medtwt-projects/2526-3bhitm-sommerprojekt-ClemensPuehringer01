<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
require_once "db.php";

header("Content-Type: application/json");

// Login check
if (!isset($_SESSION["userId"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Nicht eingeloggt"
    ]);
    exit;
}

// JSON lesen
$data = json_decode(file_get_contents("php://input"), true);

// Pflichtfelder prüfen
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

// User aus Session
$userId = $_SESSION["userId"];

// optionale Werte
$avgDmg      = $data["avgDmg"] ?? null;
$materKompDet = $data["materKompDet"] ?? null;
$regelbuchId = isset($data["regelbuchId"]) ? (int)$data["regelbuchId"] : null;

$verbalKomp = !empty($data["verbalKomp"]) ? 1 : 0;
$gestKomp   = !empty($data["gestKomp"]) ? 1 : 0;
$materKomp  = !empty($data["materKomp"]) ? 1 : 0;

// TRANSACTION START
$conn->begin_transaction();

try {

    // Zauber speichern
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
        userId,
        regelbuchId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "siiiisiiiisissii",
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
        $userId,
        $regelbuchId
    );

    $stmt->execute();

    // neue Zauber-ID holen
    $zauberId = $conn->insert_id;

    // Klassen speichern
    if (!empty($data["klassenIds"]) && is_array($data["klassenIds"])) {

        $stmtClass = $conn->prepare(
            "INSERT INTO zauber_klasse (zauberId, klassenId) VALUES (?, ?)"
        );

        foreach ($data["klassenIds"] as $klasseId) {
            $klasseId = (int)$klasseId;

            if ($klasseId > 0) {
                $stmtClass->bind_param("ii", $zauberId, $klasseId);
                $stmtClass->execute();
            }
        }
    }

    // alles speichern
    $conn->commit();

    echo json_encode([
        "success" => true,
        "zauberId" => $zauberId
    ]);

} catch (Exception $e) {

    // rollback bei Fehler
    $conn->rollback();

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Fehler beim Speichern",
        "error" => $e->getMessage()
    ]);
}
?>