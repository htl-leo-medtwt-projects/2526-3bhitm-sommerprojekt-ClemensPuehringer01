<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "
INSERT INTO zauber (
    zauberName,
    schulenId,
    stufe,
    beschreibung,
    userId
) VALUES (?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "siisi",
    $data['zauberName'],
    $data['schulenId'],
    $data['stufe'],
    $data['beschreibung'],
    $data['userId']
);

$stmt->execute();

$zauberId = $conn->insert_id;

// Klassen speichern
if (!empty($data['klassenIds'])) {
    $sqlClass = "
    INSERT INTO zauber_klasse (zauberId, klassenId)
    VALUES (?, ?)
    ";

    $stmtClass = $conn->prepare($sqlClass);

    foreach ($data['klassenIds'] as $klasseId) {
        $stmtClass->bind_param("ii", $zauberId, $klasseId);
        $stmtClass->execute();
    }
}

echo json_encode([
    "success" => true,
    "zauberId" => $zauberId
]);
?>